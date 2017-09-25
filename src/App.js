import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Routes/>
  </BrowserRouter>
);

export default App;
