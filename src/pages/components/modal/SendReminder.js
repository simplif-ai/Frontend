import React from 'react';
import ModalWrapper from './ModalWrapper';

class ReminderModal extends React.Component {
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
            title="Send me a Reminder!"
            width={800}
            showOk={true}
            showModal={this.props.showModal}
            toggleState={this.props.toggleState}
            name={this.props.name}
            okText="Submit"
            >
            </ModalWrapper>
        );
    };
}

export default ReminderModal;