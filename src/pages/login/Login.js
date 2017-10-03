import React, { Component } from 'react';
import LoginForm from './LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.setState({ redirectToReferrer: false });
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
        this is the login page!
        <LoginForm login={this.handleSubmit} />
      </div>
    );
  }
}

export default Login;
