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
      editPassword: false
    };
  }
  componentDidMount() {
    const { cookies } = this.props;
    const email = cookies.get('email');
    console.log('email', email);
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
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            console.log('componentDidMount on load',json);
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
    const req = {
        email: this.state.email,
        newEmail: e.target.email.value,
        newName: e.target.name.value
    }
    console.log('req', req);
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
          console.log('response', json);
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
    const req = {
        email: email,
        password: e.target.password.value,
        newPassword: e.target.npassword.value
    }
    console.log('req', req);
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
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            console.log('json',json);
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
              console.log('cookie', cookies.get('isAuthenticated'));
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
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated || this.state.redirect === true) {
      return (<Redirect to="/"/>);
    }
    return (
      <div className="page bgorange inline-block">
        <div className="profileCard">
          <img src="https://cdn4.iconfinder.com/data/icons/superheroes/512/batman-512.png" alt="cute prof pic"/>
          <h2 className="topSpacing questrial">{this.state.name}</h2>
          <p className="title">{this.state.email}</p>
        </div>
        <label style={{"marginBottom": "15px"}}><h2>Summaries<span/> </h2></label>
        <div className="col-3 col-m-3">
          <table>
            <tbody>
              <tr className="card">
                  <th className="header">
                    <b>Example Summary 1</b>
                  </th>
                  <th className="profile-container">
                    Example Summary 1 lorem ipsum woooo look at all the text that has been summarized here
                  </th>
              </tr>
              <tr className="card">
                  <th className="header">
                    <b>Example Summary 2</b>
                  </th>
                  <th className="profile-container">
                    Example Summary 2 lorem ipsum woooo look at all the text that has been summarized here
                  </th>
              </tr>
              <tr className="card">
                  <th className="header">
                    <b>Example Summary 3</b>
                  </th>
                  <th className="profile-container">
                    Example Summary 3 lorem ipsum woooo look at all the text that has been summarized here
                  </th>
              </tr>
            </tbody>
          </table>
        </div>
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
        <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
      </div>
    );
  }
}

export default withCookies(Profile);
