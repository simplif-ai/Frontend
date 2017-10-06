import React, { Component } from 'react';
import LoginForm from './LoginForm';
import '../../css/login.css';
import apiFetch from '../../utils/api.js';
import plane from '../../assets/background/white-plane.svg';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      error: null
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const req = {
      email: e.target.email,
      password: e.target.password,
    }
    console.log('req', req);
    return apiFetch('login',{
        method: 'POST',
        body: req
    }).then((response) => response.json())
        .then((json) => {
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.message);
          }
          else {
            console.log('json',json);
          }
        });
  };
  render() {
    return (
      <div className="page bgorange">
        <div className="title logo">
          simplif.ai
        </div>
        <div className="loginbox">
            <LoginForm login={this.handleSubmit} error={this.state.error} />
        </div>
      </div>
    );
  }
}

export default Login;
