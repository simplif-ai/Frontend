import React, { Component } from 'react';
import LoginForm from './LoginForm';
import '../../css/login.css';
import '../../css/register.css';
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
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        method: 'POST',
        body: req
    }).then((response) => response.json())
        .then((json) => {
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.error);
          }
          else {
            console.log('json',json);
          }
        });
  };
  render() {
    return (
      <div className="page bgorange">
        <img src={plane} width="20%" className="plane"/>
        <div className="title logo">
          simplif.ai
        </div>
        <h1>Create an account</h1>
        <div className="registerbox">
            <LoginForm login={this.handleSubmit} error={this.state.error} />
        </div>
      </div>
    );
  }
}

export default Login;
