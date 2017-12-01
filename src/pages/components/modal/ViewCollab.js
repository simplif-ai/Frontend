import React from 'react';
import ModalWrapper from './ModalWrapper';

class ViewCollabModal extends React.Component {
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
            title="Current Collaborators"
            width={800}
            showOk={true}
            showModal={this.props.showModal}
            toggleState={this.props.toggleState}
            name={this.props.name}
            okText="OK"
            >
            <p> collaborator1 </p>
            <p> collaborator2 </p>
            <p> collaborator3 </p>
            <p> collaborator4 </p>
            </ModalWrapper>
        );
    };
}

export default ViewCollabModal;