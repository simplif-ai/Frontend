import React from 'react';
import { withCookies } from 'react-cookie';
import apiFetch from '../../../utils/api.js';
import ModalWrapper from './ModalWrapper';

class ViewCollabModal extends React.Component {
    constructor(props) {
        const { cookies } = props;
        super(props);
        this.state = {
            userEmail:cookies.get('email'),
            noteID:props.noteID,
            popUp: false,
            collabs: []
        };
    }
    componentDidMount() {
        this.getCollaborator();
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
    getCollaborator() {
        console.log("im in here");
        console.log('userEmail:',this.state.userEmail);
        console.log('noteID:',this.state.noteID);
        apiFetch('getcollaborators', {
        headers: {
            'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify( {
            userEmail: this.state.userEmail,
            noteID: this.state.noteID
        })
        }).then((response) => response.json())
        .then((json) => {
            console.log('json',json);
            if (json.success === false) {
            this.setState({error: json.error});
                } else {
                    this.setState({
                        collabs: json   
                });
            }
        });
       if (!this.state.collabs) {
           this.setState({popUp: 'No collaborators!'});
       } 
   }
    render() {
        const collabo = [];
        if (this.state.collabs.length > 0){
            this.state.collabs.forEach(collab => {
                collabo.push(<p>{collab.name} : {collab.colabEmail}</p>);
                collabo.push(<br/>);
            })
            console.log(this.state.collabs);
        }
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

export default withCookies(ViewCollabModal);