import React from 'react';
import ModalWrapper from './ModalWrapper';

import '../../../css/old_feedback.css';

class FeedbackModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }
    handleInput = (e) =>  {
      this.setState({ text: e.target.value });
    }
    render() {
        return (
            <ModalWrapper
            title="Give us your feedback!"
            width={800}
            showOk={true}
            showModal={this.props.showModal}
            toggleState={this.props.toggleState}
            name={this.props.name}
            okText="Submit"
            >
            <textarea className="feedback" name="input" placeholder="How are you liking simplif.ai?" id="textInput"></textarea>
            </ModalWrapper>
        );
    };
}

export default FeedbackModal;