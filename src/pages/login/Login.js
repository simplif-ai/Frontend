import React, { Component } from 'react';
import LoginForm from './LoginForm';
import GoogleLogin from './GoogleLogin';

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
      <div className="title">
        simplif.ai<span></span>
      </div>
      <div className="logincontainer">
          <div className="loginbox">
             <LoginForm login={this.handleSubmit} />
          </div>
      </div>
      <label style={{"style":"underline","margin-bottom":"6px"}}>
          or 
        </label>
      <div className="logincontainer">
            <GoogleLogin/>
      </div>
  </div>
    );
  }
}

export default Login;
