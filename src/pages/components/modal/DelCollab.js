import React from 'react';
import apiFetch from '../../../utils/api.js';
import ModalWrapper from './ModalWrapper';

class DelCollabModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noteID: '',
            colabEmail: '',
            popUp: false
        };
    }
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
    deleteCollaborator = (e) => {
     e.preventDefault(); 
     e.persist();
     this.setState({colabEmail: e.target.email.value});
     if (this.state.colabEmail==='') {
            this.setState({ popUp: "You must enter an email!" });
            window.setTimeout(function() {
              this.setState({ popUp: '' });
            }.bind(this), 2000);         
        return;
     }
     apiFetch('deleteCollaborators', {
       headers: {
         'Content-Type': 'text/plain'
       },
       method: 'POST',
       body: JSON.stringify( {
         colabEmail: this.state.colabEmail,
         noteId: this.state.noteID
       })
     }).then((response) => response.json())
      .then((json) => {
        if (json.success === false) {
          this.setState({error: json.error});
        } else {
            this.setState({
                popUp: "Collaborator successfully deleted"
            });
            window.setTimeout(function() {
            if (this.state.popUp) {
                this.setState({ popUp: '' });
            }
            }.bind(this), 2000);
        }
      });
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
            okText="Done"
            >
            <form onSubmit={this.deleteCollaborator}>
                Enter email: <input type="text" name="email" required/>
                <input type="submit" value="Submit"/>
            </form>
             {this.state.popUp ? <p>{this.state.popUp}</p> : null}

            </ModalWrapper>
        );
    };
}

export default DelCollabModal;