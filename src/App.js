import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Routes from './Routes';
import Nav from './pages/components/Nav';
import Footer from './pages/components/Footer';
import './App.css';

const App = () => (
  <CookiesProvider>
    <BrowserRouter>
      <div>
        <Nav />
        <Routes/>
        <Footer />
      </div>
    </BrowserRouter>
  </CookiesProvider>
);

export default App;
