import React from 'react';
import ModalWrapper from './ModalWrapper';

class DelCollabModal extends React.Component {
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
            title="Delete a Collaborator!"
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

export default DelCollabModal;