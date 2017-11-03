import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router-dom';

import '../../css/login.css';
import '../../css/register.css';
import apiFetch from '../../utils/api.js';

class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      error: null
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    const req = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    console.log('req', req);
    return apiFetch('login',{
        headers: {
          'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value
        })
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
            cookies.set('jwt', json.token);
            cookies.set('token', '');
            this.setState({redirectToReferrer: true, error: null});
            cookies.set('email', e.target.email.value, { path: '/' });
          }
        });
  };
  render() {
    if (this.state.redirectToReferrer === true) {
      console.log('im now authenticated');
      return (<Redirect to="/profile"/>);
    }
    return (
      <div className="page bgorange">
        <div className="logo">
          simplif.ai
        </div>
        <h1>Login</h1>
        <div className="registerbox">
            <LoginForm login={this.handleSubmit} error={this.state.error} googleLogin={this.googleLogin}/>
        </div>
      </div>
    );
  }
}

export default withCookies(Login);
