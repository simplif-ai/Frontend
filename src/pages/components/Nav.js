import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import '../../css/nav.css';

class Nav extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies)
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  onOpen = (e) => {
    this.setState({
      open: !this.state.open
    });
  }
  logout = () => {
    const { cookies } = this.props;
    cookies.set('isAuthenticated', false);
    cookies.remove('jwt');
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    const login = cookies.get('login');
    if (isAuthenticated === "false" && login === true) {
      return (<Redirect to="/login"/>);
    }
    return (
      <div className="nav">
        <div onClick={this.onOpen} className="container">
          {this.state.open
            ?
            (<div>
              <div className="bar1 change"/>
              <div className="bar3 change"/>
              </div>
            ) : (
              <div>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            )
          }
        </div>
        {this.state.open
          ?
          (<div className="drop">
            <a href='/profile'>Profile</a>
            <a href='/' onClick={this.logout}>Logout</a>
            <a href='/notes'>My Notes</a>
          </div>) : null
        }
      </div>
    );
  }
}
export default withCookies(Nav);
