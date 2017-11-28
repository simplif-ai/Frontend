import React from 'react';
import ModalWrapper from './ModalWrapper';

import '../../../css/feedback.css';

class FeedbackModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isValid: false
        };
        const feedback = provider => {
            props.hideModal();
            props.feedback(provider);
        }
    }
    handleInput = (e) =>  {
      this.setState({ text: e.target.value });
    }
    handleSubmit = (e) => {
        if(this.text.length > 0) {
            this.isValid = true;
        }
    }
    render() {
        return (
            <ModalWrapper
            title="Give us your feedback!"
            width={800}
            okDisabled={!this.state.isValid}
            >
            <input
                value={this.props.text}
                onChange={this.onIdChange.bind(this)}
            />
            </ModalWrapper>
        );
    };
}

export default FeedbackModal;