import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import apiFetch from '../../utils/api.js';
import '../../css/nav.css';

class Nav extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies)
  };
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      open: false,
      imagePreviewUrl: null
    };
  }

  handleClick() {
    if (!this.state.open) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
       open: !prevState.open,
    }));
  }
  
  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  }

  componentDidMount() {
    const { cookies } = this.props;
    const email = cookies.get('email');

    return apiFetch('getPicture', {
      headers: {
       'Content-Type': 'text/plain'
      },
      method: 'POST',
      body: JSON.stringify({
        email: email
      })
    }).then((response) => response.blob())
        .then((json) => {
          const url = window.URL.createObjectURL(json);
              if(json.success === false) {
                  console.log('error', json.error);
                  this.setState({ error: json.error });
              }
              else {
                this.setState({
                  imagePreviewUrl: url
                });
              }
            });
  }
  shouldComponentUpdate() {
    return true;
  }
  componentWillReceiveProps(nextProps) {
      const { cookies } = this.props;
      const email = cookies.get('email');
      apiFetch('getPicture', {
        headers: {
         'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          email: email
        })
      }).then((response) => response.blob())
          .then((json) => {
            const url = window.URL.createObjectURL(json);
                if(json.success === false) {
                    console.log('error', json.error);
                    this.setState({ error: json.error });
                }
                else {
                  this.setState({
                    imagePreviewUrl: url
                  });
                }
              });
      this.setState({
        open: false
      });
  }
  getUrl = () => {
    let imageURL;
    const { cookies } = this.props;
    const email = cookies.get('email');
    apiFetch('getPicture', {
      headers: {
       'Content-Type': 'text/plain'
      },
      method: 'POST',
      body: JSON.stringify({
        email: email
      })
    }).then((response) => response.blob())
        .then((json) => {
          const url = window.URL.createObjectURL(json);
              if(json.success === false) {
                console.log('error', json.error);
                this.setState({ error: json.error });
              }
              else {
                imageURL = url;
              }
            });
    return imageURL;
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
    cookies.remove('email');
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    const login = cookies.get('login');
    if (isAuthenticated === "false" && login === true) {
      return (<Redirect to="/login"/>);
    }
    return (
      <div className="nav left" ref={node => { this.node = node; }}>
        <div onClick={this.handleClick} className="container">
          {isAuthenticated === "true"
            ?
            (
              <div>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
                </div>
            ) :
            null
          }
        </div>
        {this.state.open && isAuthenticated === "true"
          ?
          (<div className="drop" >
            <Link to='/profile' onClick={this.handleClick}>Profile</Link>
            <Link to='/notes' onClick={this.handleClick}>My Notes</Link>
            <Link to='/send-feedback' onClick={this.handleClick}>Send Feedback</Link>
            <Link to='/' onClick={this.logout}>Logout</Link>
          </div>) : null
        }
        <div className="user">
          {isAuthenticated === "true" && this.state.imagePreviewUrl ?
            <img src={this.state.imagePreviewUrl} alt="cute prof pic"/>
            :
            null
          }
        </div>
      </div>
    );
  }
}
export default withCookies(Nav);
