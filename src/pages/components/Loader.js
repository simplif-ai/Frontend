import React, { Component } from 'react';
import plane from '../../assets/plane-orange.svg';

class Loader extends Component {
    render() {
      return (
        <div>
            <img src={plane} width="20%" className="plane" alt="plane"/>
            <span className="Loader">
            <div className="Loader-indicator" >
              <h1>
                <span>loading</span>
                <span className="Loader-ellipsis" >
                  <span className="Loader-ellipsisDot">.</span>
                  <span className="Loader-ellipsisDot">.</span>
                  <span className="Loader-ellipsisDot">.</span>
                </span>
              </h1>
            </div>
          </span>
        </div>
      );
    }
  }

export default Loader;
