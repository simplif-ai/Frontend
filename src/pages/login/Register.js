import React, { Component } from 'react';
import '../../css/register.css';
import headphones from '../../assets/background/white-headphones.svg';
import apiFetch from '../../utils/api.js';
import { Redirect } from 'react-router-dom';
import '../../css/login.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      error: null,
      checked: false
    }
  }
  toggleChecked = () => {
    this.setState({
      checked: !this.state.checked
    });
  }
  register = (e) => {
    e.preventDefault();
    let checked = 0;
    if (this.state.checked === true) {
      checked = 1;
    }
    return apiFetch('createAccount',{
      headers: {
        'Content-Type': 'text/plain'
      },
      method: 'POST',
      body: JSON.stringify({
        name: e.target.fname.value,
        email: e.target.email.value,
        password: e.target.password.value,
        phoneNumber: e.target.phone.value,
        prefersEmailUpdates: checked
      })
    }).then((response) => response.json())
        .then((json) => {
          if(json.success === false) {
              this.setState({ error: json.error });
          }
          else {
            this.setState({ redirect: true });
          }
        });
  }
  render() {
    if (this.state.redirect === true) {
      return (<Redirect to="/login"/>);
    }
    return (
      <div className="page bgorange">
        <div className="title logo">
          simplif.ai
        </div>
        <img className="headphones" src={headphones} alt="headphones"/>
        <h1>Create an account</h1>
        <div className = "registerbox">
          <form onSubmit={this.register}>
            <div className = "errorClass">
              {this.state.error ? `Error=${this.state.error}` : null}
            </div>
            <label htmlFor="fname">First Name</label>
            <input type="text" name="fname" required />
            <label htmlFor="email" >Email</label>
            <input type="text" name="email" required />
            <label htmlFor="phone" >Phone Number</label>
            <input type="text" name="phone" required />
            <div className="check-con">
              <input type="checkbox" name="prefersEmailUpdates" onChange={this.toggleChecked} value={this.state.checked} />
              <label htmlFor="prefersEmailUpdates">Prefer Email Updates</label>
            </div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required /><br/>
            <input className="btn" type="submit" value="Submit" />
            <a href='/login'>Already have an account? Sign In</a>
          </form>
        </div>
      </div>
    );
  }
}
export default Register;
