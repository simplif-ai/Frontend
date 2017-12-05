import React from 'react';
import apiFetch from '../../../utils/api.js';
import { withCookies } from 'react-cookie';
import ModalWrapper from './ModalWrapper';

class AddCollabModal extends React.Component {
    constructor(props) {
        const { cookies } = props;
        super(props);
        this.state = {
            noteID:props.noteID,
            userEmail:cookies.get('email'),
            colabEmail:'',
            popUp: ''
        };
    }
    addCollaborator = (e) => {
        e.preventDefault();
        e.persist();
        const req = {
          userEmail: this.state.userEmail,
          colabEmail: e.target.email.value,
          noteID: this.state.noteID
        }
        console.log('req', req);
        return apiFetch('addcollaborators',{
            headers: {
                'Content-Type': 'text/plain'
            },
            method: 'POST',
            body: JSON.stringify({
                userEmail: this.state.userEmail,
                colabEmail: e.target.email.value,
                noteID: this.state.noteID
            })
            }).then((response) => response.json())
            .then((json) => {
                console.log('json',json);
                if(json.success === false) {
                    console.log('error', json.error);
                    this.setState({ error: json.error });
                }
                else {
                    this.setState({ popUp: "You added a collaborator to your note!" });
                    window.setTimeout(function() {
                        this.setState({ popUp: '' });
                    }.bind(this), 2000);
                }
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
            okText="Done"
            >
            {this.state.popUp ? <p>{this.state.popUp}</p> : null}
            <form onSubmit={this.addCollaborator}>
                Enter email: <input type="text" name="email" required/>
                <input type="submit" value="Submit"/>
            </form>
            </ModalWrapper>
        );
    };
}

export default withCookies(AddCollabModal);
