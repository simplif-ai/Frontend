import React, { Component } from 'react';
import '../../css/login.css'
import coffee from '../../assets/background/paper-coffee.svg';
import apiFetch from '../../utils/api.js';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  updatePassword = (e) => {
    e.preventDefault();
    const { cookies } = this.props;
    const email = cookies.get('email');
    const req = {
        email: email,
        password: e.target.password.value,
        newPassword: e.target.npassword.value
    }
    console.log('req', req);
    return apiFetch('changePassword', {
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: e.target.password.value,
          newPassword: e.target.npassword.value
        })
    }).then((response) => response.json())
        .then((json) => {
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            console.log('json',json);
            console.log('password was updated');
          }
        });
  }
  render() {
    return(
      <div className="page bgorange">
        <img src={coffee} alt="coffee-icon" style={{"width":"40%", "opacity":".1", "position":"absolute", "left":"10", "bottom":"20"}}/>
        <h1> Reset Password </h1>
        <div className="registerbox">
          <form onSubmit={this.updatePassword}>
          <div className = "errorClass">
            {this.state.error ? `Error= ${this.state.error}` : null}
          </div>
            <label htmlFor="password">New Password </label>
            <input type="password" name="password" required />
            <label htmlFor="npassword">New Password </label>
            <input type="password" name="npassword" required />
            <input className="btn" type="submit" value="Submit" style={{"width":"25%"}} />
            <a href='/login'>Already have an account? Sign In</a>
          </form>
        </div>
      </div>
    );
  }
}

export default withCookies(PasswordReset);
