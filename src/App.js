import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Nav from './pages/components/Nav';
import Footer from './pages/components/Footer';
import './App.css';

const App = () => (
  <BrowserRouter>
    <div>
      <Nav />
      <Routes/>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
