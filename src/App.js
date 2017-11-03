import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Nav from './pages/components/Nav';
import Footer from './pages/components/Footer';
import './App.css';

const App = ({ cookies }) => {
  return (
      <BrowserRouter>
        <div className={`${cookies.get('scheme')}`}>
          <Nav />
          <Routes/>
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default withCookies(App);
