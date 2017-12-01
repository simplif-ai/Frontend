import React from 'react';
import { Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import apiFetch from '../../../utils/api.js';
import ModalWrapper from './ModalWrapper';

class ViewCollabModal extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }; 
    constructor(props) {
        super(props);
        const { cookies } = this.props;
        this.state = {
            userEmail:'',
            noteID:'',
            popUp: false,
            collabs: []
        };
    }
    popUp = () => {
        if (!this.state.popUp) {
        this.setState({
            popUp: "Enter some emails!"
        });
        window.setTimeout(function() {
            if (this.state.popUp) {
            this.setState({ popUp: '' });
            }
        }.bind(this), 2000);
        }
    }
    getCollaborator = (e) => {
        const { cookies } = this.props;
        this.setState({userEmail: cookies.get('email')});
        apiFetch('getcollaborators', {
        headers: {
            'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify( {
            userEmail: this.state.userEmail,
            noteId: this.state.noteID
        })
        }).then((response) => response.blob())
        .then((json) => {
            if (json.success === false) {
            this.setState({error: json.error});
                } else {
                    this.setState({
                        collabs: json
                });
            }
        });
   }
    render() {
        const collabo = [];
        this.state.collabs.forEach(collab => {
            collabo.push(<p>{collab.name} : {collab.colabEmail}</p>);
        }) 
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
            {this.state.popUp ? <p>{this.state.popUp}</p> : null}
            {collabo}
            </ModalWrapper>
        );
    };
}

export default ViewCollabModal;