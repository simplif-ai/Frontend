import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Redirect, Link } from 'react-router-dom';
import apiFetch from '../../utils/api.js';
import FolderForm from './FolderForm';
import CollabForm from './CollabForm';
import '../../css/summary.css';
import plusIcon from '../../assets/plus-icon.svg';

class Summary extends Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    this.state = {
      notes: [],
      token: cookies.get('token'),
      error: null,
      success: null,
      popUp: false,
      noteID: 0,
      newNote: false
    };
  }
  componentDidMount() {
    const { cookies } = this.props;
    const email = cookies.get('email');
    return apiFetch('listnotes', {
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
            notes: json,
            noteID: json[0][1]
          });
        }
      });
  }

  createFolder = (e) => {
    e.preventDefault();
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
    e.persist();
    const req = {
      name: e.target.name.value,
      googleToken: token
    }
    console.log('req', req);
    return apiFetch('createFolder',{
        headers: {
          'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          name: e.target.name.value,
          googleToken: token
        })
    }).then((response) => response.json())
        .then((json) => {
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({
                popUp: json.error
              });
              window.setTimeout(function() {
                if (this.state.popUp) {
                  this.setState({ popUp: '' });
                }
              }.bind(this), 2000);          }
          else {
            console.log('json',json);
            this.setState({
              popUp: "Your Folder was Added"
            });
            window.setTimeout(function() {
              if (this.state.popUp) {
                this.setState({ popUp: '' });
              }
            }.bind(this), 2000);
          }
        });
  };
  addCollaborator = (e) => {
    e.preventDefault();
    e.persist();
    // const { cookies } = this.props;
    // const token = cookies.get('token');
    // const req = {
    //   collaboratorEmail: e.target.collabEmail.value,
    //   fileID: this.state.noteID,
    //   googleToken: token
    // }
    // console.log('req', req);
    // return apiFetch('addCollaborator',{
    //     headers: {
    //       'Content-Type': 'text/plain'
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({
    //       collaboratorEmail: e.target.collabEmail.value,
    //       fileID: e.target.fileId.value
    //     })
    // }).then((response) => response.json())
    //     .then((json) => {
    //       console.log('response', json);
    //       if(json.success === false) {
    //           console.log('error', json.error);
    //           this.setState({ error: json.error });
    //       }
    //       else {
    //         console.log('json',json);
    //         this.setState('success',json.success);
    //       }
    //     });
  };
  popUp = () => {
    if (!this.state.popUp) {
      this.setState({
        popUp: "Click to create a new note"
      });
      window.setTimeout(function() {
        if (this.state.popUp) {
          this.setState({ popUp: '' });
        }
      }.bind(this), 2000);
    }
  }
  createNote = () => {
    const { cookies } = this.props;
    const email = cookies.get('email');
    return apiFetch('createnote', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        text: '',
        email
      }),
      method: 'POST'
    }).then(response =>
      response.text()
    ).then((json) => {
        json = JSON.parse(json);
        console.log('json after arse', json);
        if (!json.success === false) {
            this.setState({ popUp: "Your summary could not be created!" });
            window.setTimeout(function() {
              this.setState({ popUp: '' });
            }.bind(this), 2000);
        }
        else {
          this.setState({
            newNote: true,
            noteID: json.nodeID
          });
        }
      });
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated) {
      return (<Redirect to="/login"/>);
    }
    if (this.state.newNote === true) {
      return <Redirect to={`/notes/${this.state.nodeID}`} />
    }
    let google = true;
    const token = cookies.get('token');
    if (token !== '') {
      google = true;
    }
    return (
      <div className="summary page">
        <div className="title-icon">
          <h1>My Notes</h1>
          <button className="icon orange" onClick={this.createNote} onMouseOver={this.popUp}><img src={plusIcon} alt="edit"/></button>
        </div>
        {this.state.popUp ? <p>{this.state.popUp}</p> : null}
        {this.state.notes.length > 0 ?
          this.state.notes.map(note => {
            if (note.name === '') {
              note.name = 'Undefined Title';
            }
            return (<Link to={`/notes/${note.noteID}}`} key={`${note.name} ${note.noteID}`}><h2>{note.name}</h2><p>Note Id: {note.noteID}</p></Link>);
          })
          : null
        }
        {google ?
          <div className="inputField">
            <h2> Create a new Simplif.ai folder </h2>
            <FolderForm createFolder={this.createFolder}/>
            <h2>Add collaborator to folder</h2>
            <CollabForm addCollaborator={this.addCollaborator}/>
          </div>
          : null
        }
      </div>

    );
  }
}

export default withCookies(Summary);
