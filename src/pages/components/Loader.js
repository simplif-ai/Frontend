import React, { Component } from 'react';
import plane from '../../assets/plane-orange.svg';

class Loader extends Component {
    render() {
      return (
        <div>
          <img src={plane} width="20%" className="plane" alt="plane"/>
          <div className="loading">
            <h1>loading</h1>
          </div>
        </div>
      );
    }
  }

export default Loader;
