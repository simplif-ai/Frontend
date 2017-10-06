import React, { Component } from 'react';
import apiFetch from '../../utils/api.js';
import '../../css/login.css';

class Register extends Component {
  register = (e) => {
    e.preventDefault();
    return apiFetch('createAccount',{
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: e.target.fname.value,
        email: e.target.email.value,
        password: e.target.password.value,
        prefersEmailUpdates: false
      })
    }).then((response) => response.json())
        .then((json) => {
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.message);
          }
          else {
            console.log('register success json',json);
          }
        });

  }
  render() {
    return (
      <div className="page bgorange">
        <div className="title logo">
          simplif.ai
        </div>
        <h1>Create an account</h1>
        <form onSubmit={this.register}>
          <label htmlFor="fname">First Name</label>
          <input type="text" name="fname" required />
          <label htmlFor="email" >Email</label>
          <input type="text" name="email" required />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
          <input type="submit" value="Submit" />
          <a href='/login'>Already have an account? Sign In</a>
        </form>
      </div>
    );
  }
}
export default Register;
