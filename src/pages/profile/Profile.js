import React, { Component } from 'react';
import '../../css/profile.css';
import { Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import apiFetch from '../../utils/api.js';

class Profile extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      preferEmailUpdates: false,
      error: null,
      editMode: false,
      redirect: false,
      editPassword: false,
      file: '',
      imagePreviewUrl: '',
      token: ''
    };
  }
  componentDidMount() {
    const { cookies } = this.props;
    const email = cookies.get('email');
    console.log('token', this.props.match.params.token);
    this.setState({
      token: this.props.match.params.token,
    });
    return apiFetch('profile',{
        headers: {
         'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          email: email
        })
    }).then((response) => response.json())
        .then((json) => {
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            this.setState({
              error: null,
              name: json.name,
              email: json.email,
              preferEmailUpdates: json.preferEmailUpdates
            });
          }
        });
  }
  editProfile = (e) => {
    this.setState({ editMode: false });
    e.persist();
    return apiFetch('editProfile',{
        headers: {
         'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          email: this.state.email,
          newEmail: e.target.email.value,
          newName: e.target.name.value
        })
    }).then((response) => response.json())
        .then((json) => {
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            console.log('json',json);
            const { cookies } = this.props;
            this.setState({
              error: null,
              name: e.target.name.value,
              email: e.target.email.value
            });
            cookies.set('email', e.target.email.value);
          }
        });
  }
  toggleEditMode = (e) => {
    this.setState({ editMode: true });
  }
  deleteAccount = (e) => {
    const { cookies } = this.props;
    const email = cookies.get('email');
    return apiFetch('deleteAccount',{
        headers: {
         'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          email: email
        })
    }).then((response) => response.json())
        .then((json) => {
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            console.log('json',json);
            const { cookies } = this.props;
            cookies.set('isAuthenticated', false);
            cookies.remove('jwt');
            cookies.remove('email');
            this.setState({ redirect: true });
          }
        });
  }
  toggleUpdatePassword = (e) => {
    this.setState({ editPassword: true });
  }
  updatePassword = (e) => {
    e.preventDefault();
    this.setState({ editPassword: false})
    const { cookies } = this.props;
    const email = cookies.get('email');
    return apiFetch('changePassword', {
        headers: {
         'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: e.target.password.value,
          newPassword: e.target.npassword.value
        })
    }).then((response) => response.json())
        .then((json) => {
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            console.log('password was updated');
          }
        });
  }
  googleLogin = () => {
    return apiFetch('loginToGoogle',{
        headers: {
         'Content-Type': 'text/plain'
        },
        method: 'POST',
    }).then((response) => response.json())
        .then((json) => {
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
              const { cookies } = this.props;
              cookies.set('isAuthenticated', false, { path: '/' });
          }
          else {
            console.log('json',json);
            const { cookies } = this.props;
            cookies.set('isAuthenticated', true);
            cookies.set('login', true);
            cookies.set('jwt-google', json.token);
          }
        });
  }
  savePicture = (e) => {
    e.preventDefault();
    const formData  = new FormData();
    const { cookies } = this.props;
    const email = cookies.get('email');
    formData.append('file', this.state.file);
    formData.append('email', email);
    apiFetch('addpicture', {
      body: formData,
      method: 'POST'
    }).then(response =>
      response.text()
    ).then((json) => {
        json = JSON.parse(json);
        if (json.success === false) {
            console.log('error', json.error);
        }
        else {
          console.log('success',json, 'The profile pic was saved!');
        }
      });
  }

  handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated || this.state.redirect === true) {
      return (<Redirect to="/"/>);
    }
    let {imagePreviewUrl} = this.state;
    return (
      <div className="page bgorange inline-block">
        <div className="profileCard">
          <img src={imagePreviewUrl} alt="cute prof pic"/>
          <h2 className="topSpacing questrial">{this.state.name}</h2>
          <p className="title">{this.state.email}</p>
        </div>
        <form className="image-upload" onSubmit={this.savePicture}>
          <input className="fileInput"
            type="file"
            onChange={this.handleImageChange} />
          <button className="submitButton"
            type="submit"
            onClick={this.handleSubmit}>Upload Image</button>
        </form>
        <button onClick={this.toggleEditMode}>Edit Profile</button>
        <button /*onClick={change color scheme}*/>Toggle Scheme</button>
        {this.state.editMode ? (
          <form className="form-width" onSubmit={this.editProfile}>
            <h1>Edit Profile</h1>
            <div className = "errorClass">
              {this.state.error ? `Error= ${this.state.error}` : null}
            </div>
            <label htmlFor="name">Name </label>
            <input type="text" name="name" />
            <label htmlFor="email">Email </label>
            <input type="email" name="email" />
            <br/>
            <input className="btn" type="submit" name="submit" value="Save" />
          </form>
        ) : null
        }
        <button onClick={this.deleteAccount}>Delete Account</button>
        <button onClick={this.googleLogin}>Login With Google</button>
        <button onClick={this.toggleUpdatePassword}>Update Password</button>
        {this.state.editPassword ?
          (<form  className="form-width" onSubmit={this.updatePassword}>
            <h1>Edit Password</h1>
            <div className = "errorClass">
              {this.state.error ? `Error= ${this.state.error}` : null}
            </div>
            <label htmlFor="password">Current Password </label>
            <input type="password" name="password" />
            <label htmlFor="npassword">New Password </label>
            <input type="password" name="npassword" />
            <br/>
            <input className="btn" type="submit" name="submit" value="Save" />
          </form>
          ) : null
        }
      </div>
    );
  }
}

export default withCookies(Profile);
