import React from 'react';
import { Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import apiFetch from '../../../utils/api.js';
import ModalWrapper from './ModalWrapper';

class AddCollabModal extends React.Component {
    constructor(props) {
        super(props);
        const { cookies } = this.props;
        this.state = {
            noteID:'',
            userEmail:'',
            colabEmail:''
        };
    }
    addCollaborator = (e) => {
        e.preventDefault();
        e.persist();
        const { cookies } = this.props;
        const token = cookies.get('token');
        if (token === '') {
        this.setState({
            popUp: "You need to authenticate with Google Drive!"
        });
        window.setTimeout(function() {
            if (this.state.popUp) {
            this.setState({ popUp: '' });
            }
        }.bind(this), 2000);
        return;
        }
        const req = {
        collaboratorEmail: e.target.collabEmail.value,
        noteId: this.state.noteID,
        googleToken: token
        }
        console.log('req', req);
        return apiFetch('addCollaborator',{
        headers: {
          'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          userEmail: e.target.collabEmail.value,
          noteID: e.target.fileId.value
        })
        }).then((response) => response.json())
        .then((json) => {
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            this.setState({ popUp: "You added a collaborator to your note!" });
            window.setTimeout(function() {
              this.setState({ popUp: '' });
            }.bind(this), 2000);          }
        });
    };
    popUp = () => {
        if (!this.state.popUp) {
        this.setState({
            popUp: "Enter an email!"
        });
        window.setTimeout(function() {
            if (this.state.popUp) {
            this.setState({ popUp: '' });
            }
        }.bind(this), 2000);
        }
    }

    render() {
        return (
            <ModalWrapper
            title="Add a Collaborator!"
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

export default AddCollabModal;