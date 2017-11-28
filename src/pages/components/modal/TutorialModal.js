import React from 'react';
import ModalWrapper from './ModalWrapper';

import '../../../css/tutorial.css';

class TutorialModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
      }  
      const feedback = provider => {
          props.hideModal();
          props.feedback(provider);
      }
    }

    render() {
      return (
        <ModalWrapper
          title="Tutorial"
          width={800}
          showOk={true}
        >
        <p>test</p>
        </ModalWrapper>
      );
    };
  }

export default TutorialModal;