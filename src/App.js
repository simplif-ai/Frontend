import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Nav from './pages/components/Nav';
import Footer from './pages/components/Footer';
import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="app-root">
      <div className="wrapper">
        <Nav />
        <Routes/>
      </div>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
