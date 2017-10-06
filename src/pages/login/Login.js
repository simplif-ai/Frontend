import React, { Component } from 'react';
import LoginForm from './LoginForm';
import GoogleLogin from './GoogleLogin';
import '../../css/login.css';
import apiFetch from '../../utils/api.js';

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
    // let d = new FormData();
    // d.append('email', e.target.email);
    // d.append('password', e.target.password);
    // return apiFetch('login',{
    //     method: 'POST',
    //     body: d
    // }).then((response) => response.json())
    //     .then((json) => {
    //       if(json.success === false) {
    //           console.log('error', json.message);
    //       }
    //       else {
    //         console.log('json',json);
    //       }
    //     });
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
