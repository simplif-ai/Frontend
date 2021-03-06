import { withCookies } from 'react-cookie';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Nav from './pages/components/Nav';
import './App.css';


class App extends Component {
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get("isAuthenticated");
    return(
      <BrowserRouter>
        <div className={`${cookies.get('scheme')} ${cookies.get('night')}`}>
          <Nav isAuthenticated={isAuthenticated}/>
          <Routes/>
        </div>
      </BrowserRouter>
    );
  }
}

export default withCookies(App);
