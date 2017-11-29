import React from 'react';
import ModalWrapper from './ModalWrapper';

import '../../../css/tutorial.css';

class TutorialModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      const tutorial = provider => {
        props.hideModal();
      }  
    }
    render() {
        return (
          <ModalWrapper
            title="Tutorial"
            width={800}
            showOk={true}
            showModal={this.props.showModal}
            name={this.props.name}
            toggleState={this.props.toggleState}
          >
          <div id="slideshow">
            <div class="slide-wrapper">
              <div class="slide"><h1 class="slide-number">1</h1></div>
              <div class="slide"><h1 class="slide-number">2</h1></div>
              <div class="slide"><h1 class="slide-number">3</h1></div>
              <div class="slide"><h1 class="slide-number">4</h1></div>
              <div class="slide"><h1 class="slide-number">5</h1></div>
            </div>
          </div>
          </ModalWrapper>
        );
      }
    }

export default TutorialModal;