import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import apiFetch from '../../utils/api.js';
import '../../css/login.css';

class PasswordReset extends Component {
  constructor (props) {
    super(props);
    this.state = {
      reset: false,
      popUp: ''
    };
  }
  requestPasswordReset = (e) => {
    e.preventDefault();
    const req = {
        email: e.target.email.value
    };
    console.log('req', req);
    return apiFetch('resetPassword', {
        headers: {
          'Content-Type': 'text/plain'
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
            if(!this.state.popUp){
              this.setState({ popUp: 'An email was sent to the above address!' });
            }
            window.setTimeout(function() {
              this.setState({reset: true});             
            }.bind(this),2000);
          }
        });
  }
  render() {
    if(this.state.reset === true) {
       return (<Redirect to="/login"/>);
    }
    return (
      <div className="page bgorange">
        <h1>Request Password Reset</h1>
        <div className="registerbox">
          <form onSubmit={this.requestPasswordReset}>
            {this.state.popUp ? <p>{this.state.popUp}</p> : null}
            <label placeholder="email" type="" htmlFor="email">
              Enter your email address to reset your password
            </label>
            <input type="email" name="email" required />
            <input className="btn" type="submit" value="submit" style={{"color":"#1A334F"}}/>
            <a href='/login' style={{"display":"block", "marginBottom":"6px"}}>Already have an account? Sign In</a>
            <a href='/register' style={{"display":"block"}}>Or register for an account.</a>
          </form>
        </div>
      </div>
    );
  }
}

export default PasswordReset;
