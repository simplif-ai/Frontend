import React from 'react';
import {connect} from 'react-redux';
import plane from '../../assets/background/white-plane.svg';

module.exports = React.createClass({
  render: function() {
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
});