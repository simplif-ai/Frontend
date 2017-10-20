import React, { Component } from 'react';
import apiFetch from '../../utils/api.js';
import '../../css/login.css';

class PasswordReset extends Component {
  requestPasswordReset = (e) => {
    e.preventDefault();
    const req = {
        email: e.target.email.value
    };
    console.log('req', req);
    return apiFetch('resetPassword', {
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          email: req.email
        })
    }).then((response) => response.json())
        .then((json) => {
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.error);
          }
          else {
            console.log('json on success',json);
            console.log('request was sent');
          }
        });

  }
  render() {
    return (
      <div className="page bgorange">
        <h1>Request Password Reset</h1>
        <div className="registerbox">
          <form onSubmit={this.requestPasswordReset}>
            <label placeholder="email" type="" htmlFor="email">
              Enter your email address to reset your password
            </label>
            <input type="email" name="email" required />
            <input className="btn" type="submit" value="submit" style={{"color":"#1A334F"}}/>
            <a href='/login' style={{"display":"block", "margin-bottom":"6px"}}>Already have an account? Sign In</a>
            <a href='/register' style={{"display":"block"}}>Or register for an account.</a>
          </form>
        </div>
      </div>
    );
  }
}

export default PasswordReset;
