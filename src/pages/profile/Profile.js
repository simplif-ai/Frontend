import React, { Component } from 'react';
import '../../css/profile.css';
import { Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
//TODO: replace w/ <tr> props of summary stuff
      //also profile stuff

class Profile extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated) {
      return (<Redirect to="/login"/>);
    }
    return (
      <div className="page bgorange inline-block">
        <div className="profileCard">
          <img src="https://cdn4.iconfinder.com/data/icons/superheroes/512/batman-512.png" alt="cute prof pic"/>
          <div className="title"> Name </div>
        </div>
        <label style={{"margin-bottom": "15px"}}><b>Summaries<span/> </b></label>
        <div className="col-3 col-m-3">
          <table>
            <td>
              <div className="card">
                <div className="header">
                  <b>Example Summary1</b>
                </div>
                <div className="profile-container">
                  Example Summary 1 lorem ipsum woooo look at all the text that has been summarized here
                  </div>
              </div>
            </td>
            <td>
              <div className="card">
                <div className="header">
                  <b>Example Summary2</b>
                </div>
                <div className="profile-container">
                  Example Summary 2 lorem ipsum woooo look at all the text that has been summarized here
                  </div>
              </div>
            </td>
            <td>
              <div className="card">
                <div className="header">
                  <b>Example Summary3</b>
                </div>
                <div className="profile-container">
                  Example Summary 3 lorem ipsum woooo look at all the text that has been summarized here
                  </div>
              </div>
            </td>

          </table>
        </div>
      </div>
    );
  }
}

export default withCookies(Profile);
