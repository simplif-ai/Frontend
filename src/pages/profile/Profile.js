import React, { Component } from 'react';
import '../../css/profile.css';
import { Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {withRouter} from 'react-router-dom';
import apiFetch from '../../utils/api.js';

class Profile extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies)
  };
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    let tokenFromCookie = '';
    if (cookies.get('token') !== '') {
      tokenFromCookie = cookies.get('token');
    } else {
      let url = this.props.location.search;
      let parsedToken = '';
      url = url.split('=');
      if (url) {
        parsedToken = url[1];
      }
      tokenFromCookie = parsedToken;
    }
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
      token: tokenFromCookie
    };
  }
  linkGoogleAccount = () => {
    const { cookies } = this.props;
    if (cookies.get('token') !== '') {
      this.setState({
        error: "You are already successfully linked to a google account!!"
      });
      return;
    }

    var e = document.createElement("a");
    console.log('link google', this.state.token);
    let token = this.state.token;
    // let token = '';

    if (typeof this.state.token === 'undefined') {
      token = '';
    }
    console.log('token 2', token);
    apiFetch('loginToGoogle',{
        headers: {
         'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          googleCode: token
        })
    }).then((response) => response.json())
        .then((json) => {
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.error);
              e.href = json.authorizeURL;
              e.click();
          }
          else {
            console.log('json',json);
            const { cookies } = this.props;
            cookies.set('token', JSON.stringify(json.googleToken));
            console.log('saved token', cookies.get('token'));
            this.setState({
              token: json.googleToken,
              error: "You successfully linked you're google account"
            });
            window.setTimeout(function() {
              this.setState({
                error: ''
              });
            }.bind(this), 4000);
          }
        });
  }
  componentWillMount() {
    if (this.state.token && this.state.token.length > 0) {
      console.log('call link google');
      this.linkGoogleAccount();
    }
  }
  componentDidMount() {
    const { cookies } = this.props;
    const email = cookies.get('email');
    if (this.state.token === '') {
      console.log('componentDidMount');
      let url = this.props.location.search;
      let parsedToken = '';
      url = url.split('=');
      if (url) {
        parsedToken = url[1];
      }
      console.log('token', parsedToken);

      this.setState({
        token: parsedToken,
        error: '',
      });
      console.log('state token', this.state.token);
    }
    if (this.state.token && this.state.token.length > 0) {
      console.log('call link google');
      this.linkGoogleAccount();
    }

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
  toggleScheme = () => {
    const { cookies } = this.props;
    //cookies.set('scheme','bgnight');
    cookies.get('scheme') === 'bgnight' ? cookies.set('scheme','bgorange') : cookies.set('scheme','bgnight');
    console.log('cookie', cookies.get('scheme'));
    window.location.reload();
  }
  render() {
    const { cookies } = this.props;
    console.log('render', cookies.get('token'), 'is empty', cookies.get('token') !== '');
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated || this.state.redirect === true) {
      return (<Redirect to="/"/>);
    }
    let {imagePreviewUrl} = this.state;
    return (
      <div className="page bgorange inline-block">
        {this.state.error ? <p>{this.state.error}</p> : null}
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
        <button onClick={this.toggleScheme}>Toggle Scheme</button>
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
        <button onClick={this.linkGoogleAccount}>Authorize Google Account</button>
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

export default withCookies(withRouter(Profile));
