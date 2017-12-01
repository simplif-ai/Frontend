import React from 'react';
import PropTypes from 'prop-types';

import '../../../css/modalWrapper.css';

const ModalWrapper = props => {
  var showModal = props.showModal;
  console.log('showModal', showModal, props.showModal);

  const handleBackgroundClick = e => {
    if (e.target === e.currentTarget) props.toggleState(props.name,false);
  };
  const okButton = props.showOk
    ? (
      <button
        onClick={() => props.toggleState(props.name, false)}
        disabled={props.okDisabled}
        style={{'margin':'0 auto'}}
       >
        {props.okText}
      </button>
    ) : null;

if(showModal) {
    return (
      <div className="modal" onClick={handleBackgroundClick}>
            <div className="modal-content">
                <div className="modal-content modal-top">
                  <h1>{props.title}</h1>
                </div>

                {props.children}
                
                {okButton}
            </div>
          </div>
    );
  } else { return null }
};

ModalWrapper.propTypes = {
  // props
  title: PropTypes.string,
  showOk: PropTypes.bool,
  okText: PropTypes.string,
  okDisabled: PropTypes.bool,
  width: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  // methods
  hideModal: PropTypes.func,
  onOk: PropTypes.func,
};

ModalWrapper.defaultProps = {
  title: '',
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 400
};

export default ModalWrapper;