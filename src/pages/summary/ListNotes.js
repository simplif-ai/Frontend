import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import apiFetch from '../../utils/api.js';
import FolderForm from './FolderForm';
import CollabForm from './CollabForm';
import '../../css/summary.css';

class Summary extends Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    this.state = {
      notes: [],
      token: cookies.get('token'),
      error: null,
      success: null
    };
  }
  componentDidMount() {
    const { cookies } = this.props;
    const email = cookies.get('email');
    apiFetch('listnotes', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        email: email
      }),
      method: 'POST'
    }).then(response =>
      response.json()
    ).then((json) => {
        if (json.success === false) {
            console.log('error', json.error);
        }
        else {
          console.log('success',json);
          this.setState({
            notes: json
          });
        }
      });
  }
  handleFSubmit = (e) => { /*Sorry Audrey :< */
    e.preventDefault();
    e.persist();
    const req = {
      name: e.target.name.value/*,
      googleToken: */
    }
    console.log('req', req);
    return apiFetch('createFolder',{
        headers: {
          'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          name: e.target.name.value,
        })
    }).then((response) => response.json())
        .then((json) => {
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            console.log('json',json);
            this.setState('success',json.success);
          }
        });
  };
  handleCSubmit = (e) => { /*Double sorry, Audrey*/
    e.preventDefault();
    e.persist();
    const req = {
      collaboratorEmail: e.target.collabEmail.value,
      fileID: e.target.fileId.value/*,
      googleToken: */
    }
    console.log('req', req);
    return apiFetch('addCollaborator',{
        headers: {
          'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          collaboratorEmail: e.target.collabEmail.value,
          fileID: e.target.fileId.value
        })
    }).then((response) => response.json())
        .then((json) => {
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            console.log('json',json);
            this.setState('success',json.success);
          }
        });
  };
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated) {
      return (<Redirect to="/login"/>);
    }
    return (
      <div className="summary">
        <h1>My Notes</h1>
        {this.state.notes.length > 0 ?
          this.state.notes.map(note => {
            return (<div><h2>{note.name}</h2><p>{note.noteId}</p></div>);
          })
          : null
        }
        <div className="inputField">
          <h2> Create a new Simplif.ai folder </h2>
          <FolderForm folder={this.handleFSubmit}/>
          <h2>Add collaborator to folder</h2>
          <CollabForm collab={this.handleCSubmit}/>
        </div>
      </div>
      
    );
  }
}

export default withCookies(Summary);
