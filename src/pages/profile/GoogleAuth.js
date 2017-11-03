import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import apiFetch from '../../utils/api.js';

class Summary extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  componentDidMount() {
    const { cookies } = this.props;
    console.log('token', this.props.match.params.token);
    if (this.props.match.params.token) {
      this.setState({
        redirect: true
      });
    }
    cookies.set('token', this.props.match.params.token);
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (this.state.redirect === true) {
      return (<Redirect to="/profile"/>);
    }
    return (
      <div className="summary">
        Authorizing you google Account!
      </div>
    );
  }
}

export default withCookies(Summary);
