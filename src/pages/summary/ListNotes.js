import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Redirect, Link } from 'react-router-dom';
import apiFetch from '../../utils/api.js';
import FolderForm from './FolderForm';
import CollabForm from './CollabForm';
import SummarizeUrl from './SummarizeUrl';
import '../../css/summary.css';
import plusIcon from '../../assets/plus-icon.svg';
import xIcon from '../../assets/x-icon.svg';

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
      newNote: false,
      text: ''
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
          this.setState({
            notes: json
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
          if (json.success === false) {
              console.log('error', json.error);
              this.setState({
                popUp: json.error
              });
              window.setTimeout(function() {
                if (this.state.popUp) {
                  this.setState({ popUp: '' });
                }
              }.bind(this), 2000);
          }
          else {
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
      fileID: this.state.noteID,
      googleToken: token
    }
    console.log('req', req);
    return apiFetch('addCollaborator',{
        headers: {
          'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          collaboratorEmail: e.target.collabEmail.value,
          fileID: e.target.fileId.value,
          googleToken: token
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
    console.log('create Note');
    const { cookies } = this.props;
    const email = cookies.get('email');
    return apiFetch('createnote', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        text: this.state.text,
        email
      }),
      method: 'POST'
    }).then(response =>
      response.text()
    ).then((json) => {
        json = JSON.parse(json);
        console.log('json in create Note', json);
        if (!json.success === false) {
            this.setState({ popUp: "Your summary could not be created!" });
            window.setTimeout(function() {
              this.setState({ popUp: '' });
            }.bind(this), 2000);
        }
        else {
          this.setState({
            noteID: json.noteID,
            newNote: true
          });
        }
      });
  }
  summarizeFromUrl = (e) => {
    e.preventDefault();
    console.log('e.target.email.value', e.target.url.value);
    apiFetch('parseURL', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        URL: e.target.url.value
      }),
      method: 'POST'
    }).then(response =>
      response.text()
    ).then((json) => {
        json = JSON.parse(json);
        console.log('json', json);
        if (json.success === true) {
            const sentences = [];
            json.text.forEach(sentence => {
              sentences.push(sentence[0]);
            });
            console.log('sentences.join', sentences.join(' '));
            this.setState({
              text: sentences.join(' ')
            });
            this.createNote();
        }
        else {
          this.setState({ popUp: "Your summary could not be created from this article!" });
          window.setTimeout(function() {
            this.setState({ popUp: '' });
          }.bind(this), 2000);
        }
      });
      // this.createNote();
  }
  addDate = (e) => {
    e.preventDefault();
    const { cookies } = this.props;
    const email = cookies.get('email');

    var date = new Date(e.target.date.value);

    var d = new Date(e.target.date.value);
    var dateString =
        ("00" + (d.getMonth() + 1)).slice(-2) + "/" +
        ("00" + d.getDate()).slice(-2) + "/" +
        d.getFullYear() + " " +
        ("00" + d.getHours()).slice(-2) + ":" +
        ("00" + d.getMinutes()).slice(-2) + ":" +
        ("00" + d.getSeconds()).slice(-2);

    const req = {
      email,
      dateString,
      message: e.target.message.value
    };
    console.log('date from datestring', dateString, 'req', req);
    apiFetch('emailReminder', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        email,
        dateString,
        message: e.target.message.value
      }),
      method: 'POST'
    }).then(response =>
      response.text()
    ).then((json) => {
        json = JSON.parse(json);
        console.log('json', json);
        if (json.success === true) {
          this.setState({ popUp: "You were reminded by email!" });
          window.setTimeout(function() {
            this.setState({ popUp: '' });
          }.bind(this), 2000);
        }
        else {
          this.setState({ popUp: "You were unable schedule an email!" });
          window.setTimeout(function() {
            this.setState({ popUp: '' });
          }.bind(this), 2000);
        }
      });
  }
  deleteNote= () => {
    //TODO: delete life and maybe one day my student loans
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated) {
      return (<Redirect to="/login"/>);
    }
    if (this.state.newNote === true && this.state.nodeID !== 0) {
      return <Redirect to={`/notes/${this.state.noteID}`} />
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
          <button className="icon orange" onClick={this.deleteNote}><img src={xIcon} alt="delete"/></button>
        </div>
        {this.state.popUp ? <p>{this.state.popUp}</p> : null}
        {this.state.notes.length > 0 ?
          this.state.notes.map(note => {
            if (note.name === '') {
              note.name = 'Undefined Title';
            }
            return (<Link to={`/notes/${note.noteID}`} key={`${note.name} ${note.noteID}`}><h2>{note.name}</h2><p>Note Id: {note.noteID}</p></Link>);
          })
          : null
        }
        {google ?
          <div className="inputField">
            <h2> Create a new Simplif.ai folder </h2>
            <FolderForm createFolder={this.createFolder}/>
            <h2>Add collaborator to folder</h2>
            <CollabForm addCollaborator={this.addCollaborator}/>
            <h2>Summarize from Article Url</h2>
            <SummarizeUrl summarizeFromUrl={this.summarizeFromUrl} />
            <h2>Schdedule Email Reminder</h2>
            <form onSubmit={this.addDate}>
              <label htmlFor="message">Reminder Message</label>
              <input type="text" name="message" required />
              <label htmlFor="date">Schdedule Date</label>
              <input type="datetime-local" name="date" required />
              <input className="btn" type="submit" name="submit" value="submit" />
            </form>
          </div>
          : null
        }
      </div>
    );
  }
}

export default withCookies(Summary);
