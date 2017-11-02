import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
// import apiFetch from '../../utils/api.js';
import '../../css/summary.css';

class Summary extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //
    // };
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated) {
      return (<Redirect to="/login"/>);
    }
    return (
      <div className="summary">
        <h1>My Notes</h1>
      </div>
    );
  }
}

export default withCookies(Summary);
