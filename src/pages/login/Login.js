import React from 'react';
import LoginForm from './LoginForm';
import GoogleLogin from './GoogleLogin';

const Login = () => (
  <div className="page bgorange">
      <div className="title">
        simplif.ai<span></span>
      </div>
      <div className="logincontainer">
          <div className="loginbox">
            <LoginForm />
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

export default Login;
