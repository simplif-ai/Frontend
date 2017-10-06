import React, { Component } from 'react';
import LoginForm from './LoginForm';
import '../../css/login.css';
import apiFetch from '../../utils/api.js';
import plane from '../../assets/background/white-plane.svg';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      error: null
    };
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
        <img className="plane" src={plane} style={{"width": "20%", "top": "10", "left": "10", "position": "absolute"}}/>
        <div className="title logo">
          simplif.ai
        </div>
        <div className="loginbox">
            <LoginForm login={this.handleSubmit} error={this.state.error} />
        </div>
        <label> or </label>
      </div>
    );
  }
}

export default Login;
