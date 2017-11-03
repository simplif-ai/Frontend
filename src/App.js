import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import Routes from './Routes';
import Nav from './pages/components/Nav';
// import Footer from './pages/components/Footer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nightMode: ''
    }
  }
  componentWillReceiveProps() {
    const { cookies } = this.props
    if (cookies.get('night')) {
      this.setState({
        nightMode: this.props.cookies.get('night')
      });
    }
  }
  render() {
    return(
      <BrowserRouter>
        <div className={`${this.state.nightMode}`}>
          <Nav />
          <Routes/>
        </div>
      </BrowserRouter>
    );
  }
}
export default withCookies(App);
