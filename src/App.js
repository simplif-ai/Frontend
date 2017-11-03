import { withCookies } from 'react-cookie';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Nav from './pages/components/Nav';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nightMode: ''
    }
  }
  componentWillReceiveProps() {
    const { cookies } = this.props;
    if (cookies.get('night')) {
      this.setState({
        nightMode: this.props.cookies.get('night')
      });
    }
  }
  render() {
    const { cookies } = this.props;
    return(
      <BrowserRouter>
        <div className={`${this.state.nightMode} ${cookies.get('scheme')}`}>
          <Nav />
          <Routes/>
        </div>
      </BrowserRouter>
    );
  }
}

export default withCookies(App);
