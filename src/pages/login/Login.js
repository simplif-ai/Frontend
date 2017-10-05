import React, { Component } from 'react';
import LoginForm from './LoginForm';
import GoogleLogin from './GoogleLogin';
import '../../css/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: false };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const req = {
      email: e.target.email,
      password: e.target.password,
    }
    console.log('req', req);
  };
  render() {
    return (
      <div className="page bgorange">
        <div className="title logo">
          simplif.ai
        </div>
        <div className="loginbox">
            <LoginForm login={this.handleSubmit} />
        </div>
        <label> or </label> 
      <GoogleLogin/>
      </div>
    );
  }
}

export default Login;
