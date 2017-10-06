import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import LoginForm from './LoginForm';
import { Redirect } from 'react-router-dom';

import '../../css/login.css';
import '../../css/register.css';
import apiFetch from '../../utils/api.js';
import plane from '../../assets/background/white-plane.svg';

class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  componentWillMount() {
    const { cookies } = this.props;
  }
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      error: null
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    const req = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    const { cookies } = this.props;
    cookies.set('email', req.email);
    cookies.set('isAuthenticated', true);
    console.log('cookie test', cookies.get('email'));
    console.log('req', req);
    this.setState({redirectToReferrer: true});

    // return apiFetch('login',{
    //     headers: {
    //      'Accept': 'application/json',
    //      'Content-Type': 'application/json'
    //     },
    //     method: 'POST',
    //     body: req
    // }).then((response) => response.json())
    //     .then((json) => {
    //       console.log('response', json);
    //       if(json.success === false) {
    //           console.log('error', json.error);
    //           const { cookies } = this.props;
    //           cookies.set('isAuthenticated', false, { path: '/' });
    //           console.log('cookie', cookies.get('isAuthenticated'));
    //       }
    //       else {
    //         console.log('json',json);
    //         const { cookies } = this.props;
    //
    //         cookies.set('email', e.target.email.value, { path: '/' });
    //       }
    //     });
  };
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (this.state.redirectToReferrer === true) {
      console.log('im now authenticated');
      return (<Redirect to="/summary"/>);
    }
    return (
      <div className="page bgorange">
        <img src={plane} width="20%" className="plane"/>
        <div className="logo">
          simplif.ai
        </div>
        <h1>Create an account</h1>
        <div className="registerbox">
            <LoginForm login={this.handleSubmit} error={this.state.error} />
        </div>
      </div>
    );
  }
}

export default withCookies(Login);
