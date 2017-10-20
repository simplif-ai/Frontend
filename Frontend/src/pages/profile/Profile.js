import React, { Component } from 'react';
import '../../css/profile.css';
import { Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import apiFetch from '../../utils/api.js';

//TODO: replace w/ <tr> props of summary stuff
      //also profile stuff

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
         'Accept': 'application/json',
         'Content-Type': 'application/json'
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
              const { cookies } = this.props;
          }
          else {
            console.log('componentDidMount on load',json);
            const { cookies } = this.props;
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
         'Accept': 'application/json',
         'Content-Type': 'application/json'
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
              const { cookies } = this.props;
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
         'Accept': 'application/json',
         'Content-Type': 'application/json'
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
         'Accept': 'application/json',
         'Content-Type': 'application/json'
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
         'Accept': 'application/json',
         'Content-Type': 'application/json'
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
          <div className="title">{this.state.name}</div>
          <p className="title">{this.state.email}</p>
        </div>
        <label style={{"margin-bottom": "15px"}}><b>Summaries<span/> </b></label>
        <div className="col-3 col-m-3">
          <table>
            <td>
              <div className="card">
                <div className="header">
                  <b>Example Summary1</b>
                </div>
                <div className="profile-container">
                  Example Summary 1 lorem ipsum woooo look at all the text that has been summarized here
                  </div>
              </div>
            </td>
            <td>
              <div className="card">
                <div className="header">
                  <b>Example Summary2</b>
                </div>
                <div className="profile-container">
                  Example Summary 2 lorem ipsum woooo look at all the text that has been summarized here
                  </div>
              </div>
            </td>
            <td>
              <div className="card">
                <div className="header">
                  <b>Example Summary3</b>
                </div>
                <div className="profile-container">
                  Example Summary 3 lorem ipsum woooo look at all the text that has been summarized here
                  </div>
              </div>
            </td>

          </table>
        </div>
        <button onClick={this.toggleEditMode}>Edit Profile</button>
        {this.state.editMode ? (
          <form onSubmit={this.editProfile}>
            <div className = "errorClass">
              {this.state.error ? `Error= ${this.state.error}` : null}
            </div>
            <label htmlFor="name">Name </label>
            <input type="text" name="name" required />
            <label htmlFor="email">Email </label>
            <input type="email" name="email" required />
            <br/>
            <input className="btn" type="submit" name="submit" value="submit" />
          </form>
        ) : null
        }
        <button onClick={this.deleteAccount}>Delete Account</button>
        <button onClick={this.googleLogin}>Login With Google</button>
        <button onClick={this.toggleUpdatePassword}>Update Password</button>
        {this.state.editPassword ?
          (<form onSubmit={this.updatePassword}>
            <div className = "errorClass">
              {this.state.error ? `Error= ${this.state.error}` : null}
            </div>
            <label htmlFor="password">Current Password </label>
            <input type="password" name="password" required />
            <label htmlFor="npassword">New Password </label>
            <input type="password" name="npassword" required />
            <br/>
            <input className="btn" type="submit" name="submit" value="submit" />
          </form>
        ) : null
        }

            <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
      </div>
    );
  }
}

export default withCookies(Profile);
