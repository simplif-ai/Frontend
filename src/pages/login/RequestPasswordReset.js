import React from 'react';
import '../../css/register.css';

const PasswordReset = ({ login, error }) => (
  <div className="page bgorange">
    <h1>Request Password Reset</h1>
    <div className="registerbox">
      <form onSubmit={login}>
        <div className = "errorClass">
          {error ? `Error=${error}`:null}
        </div>
        <label placeholder="email" type="" htmlFor="email">
          Enter your email address to reset your password.
        </label>
        <input type="email" name="email" required />
        <input type="submit" value="submit" style={{"color":"#1A334F"}}/>
        <a href='/login' style={{"display":"block", "margin-bottom":"6px"}}>Already have an account? Sign In</a>
        <a href='/register' style={{"display":"block"}}>Or register for an account.</a>
      </form>
    </div>
  </div>
);

export default PasswordReset;
