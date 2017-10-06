import React, { Component } from 'react';
import '../../css/nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  onOpen = (e) => {
    console.log('open before', this.state.open);
    this.setState({
      open: !this.state.open
    });
  }
  render() {
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
            <a href='/'>Logout</a>
          </div>) : null
        }
      </div>
    );
  }
}
export default Nav;
