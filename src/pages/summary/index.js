import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import apiFetch from '../../utils/api.js';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localstorage.js';
import '../../css/summary.css';
import '../../css/footer.css';
import edit_icon_white from '../../assets/pencil-icon.svg';
import edit_icon_orange from '../../assets/pencil-icon-orange.svg';
import Loader from '../components/Loader';
import EditSummary from './EditSummary';

class Summary extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    const googleToken = cookies.get('token');
    this.state = {
      redirectToReferrer: false,
      summary: {},
      summaryArray: [],
      sentencesArray: [],
      sentences: [],
      response: {},
      brevity: 50,
      isWaiting: false,
      editMode: false,
      sentenceCount: null,
      text: '',
      receivedSummary: false,
      error: null,
      title: '',
      editTitle: false,
      wait: false,
      noteID: '',
      options: false,
      token: googleToken,
      nightMode: false,
      isOffline: false
    };
  }
  componentDidMount() {
    const { cookies } = this.props;
    this.setState({
      noteID: this.props.match.params.noteID,
      token: cookies.get('token')
    });
  }
  updateResponse = (index, priority) => {
    let newResponse = this.state.response;
    newResponse[index][1] = priority;
    this.setState({
      response: newResponse
    });
    this.updateSummary();
  }
  updateSummary = () => {
    const summary = [];
    const sentenceCount = Math.floor(this.state.brevity * (1/100) * this.state.response.length);
    this.setState({
      sentenceCount: sentenceCount
    });
    const sentences = [];
    this.state.response.forEach(sentence => {
      if (sentence[1] <= sentenceCount) {
        summary.push(sentence[0]);
      }
      sentences.push(sentence[0]);
    });
    this.setState({
      summary: summary.join(' '),
      summaryArray: summary,
      text: summary.join(' '),
      sentencesArray: sentences
    });
  }
  summarize = (e) => {
    e.preventDefault();
    this.setState({
      wait: true
    });
    return apiFetch('summarizertext', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        text: this.state.text
      }),
      method: 'POST'
    }).then(response =>
      response.json()
    ).then((json) => {
        if (json.success === false) {
          console.log('error', json.error);
          this.setState({
            editMode: false,
            error: "json.error"
          });
        }
        else {
          // call funtion to send data to page
          this.setState({
            response: json.text,
            receivedSummary: true,
            wait: false
          });
          this.updateSummary();
        }
      });
  }
  handleKeyUp = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = 25 + e.target.scrollHeight + 'px';
  }
  onEdit = (e) => {
    this.setState({ text: e.target.value });
  }
  onEditTitle = (e) => {
    this.setState({ title: e.target.value });
  }
  changeBrevity = (e) => {
    this.setState({
      brevity: e.target.value,
      sentenceCount: Math.floor(this.state.brevity * (1/100) * this.state.sentences.length)
    });
    if (this.state.receivedSummary === true) {
      this.updateSummary();
    }
  }
  saveSummary = (e) => {
    e.preventDefault();
    if (this.state.isOffline === true) {
      console.log('true');
      saveToLocalStorage({ text: this.state.text, title: this.state.title });
      this.setError("This summary will be synced when you go back online!");
      console.log('This summary will be synced when you go back online');
      window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
      return;
    }
    const { cookies } = this.props;
    const email = cookies.get('email');
    return apiFetch('savesummary', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        text: this.state.text,
        email,
        name: this.state.title
      }),
      method: 'POST'
    }).then(response =>
      response.text()
    ).then((json) => {
        if (json.success === false) {
            this.setError("Your summary was not saved!");
            window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
        }
        else {
          // call funtion to send data to page
          this.setState({
            editMode: false
          });
          this.setError("Your summary was successfully saved!");
          window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
          // this.updateSummary();
        }
      });
  }
  updateNote = (e) => {
    e.preventDefault();
    if (this.state.isOffline === true) {
      saveToLocalStorage({
        text: this.state.text,
        title: this.state.title
      });
      console.log('in update note this.state.isOffline', this.state.isOffline);
      this.setError("This summary will be synced when you go back online!");
      window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
      return;
    }
    return apiFetch('updateNote', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        text: this.state.text,
        noteID: this.state.noteID,
        name: this.state.title
      }),
      method: 'POST'
    }).then(response =>
      response.text()
    ).then((json) => {
        json = JSON.parse(json);
        if (json.success === false) {
            this.setError("Your summary was not saved!");
            window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
        }
        else {
          // call funtion to send data to page
          this.setState({
            editMode: false
          });
          this.setError("Your summary was successfully saved!");
          window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
        }
      });
  }
  setError = (error) => {
    this.setState({
      error
    });
  }
  toggleEditMode = (e) => {
    e.preventDefault( );
    if (this.state.receivedSummary === true) {
      this.setState({
        editMode: !this.state.editMode
      });
    } else if (this.state.editMode === true) {
      this.setState({
        editMode: false
      });
    } else {
      this.setError("You can only edit summarized text!");
      window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
    }
  }
  toggleEditTitle = () => {
    this.setState({
      editTitle: true
    });
  }
  toggleOptions = () => {
    this.setState({
      options: !this.state.options
    })
  }
  exportToText = () => {
    var e = document.createElement("a");
    var file = new Blob([this.state.text], {type: 'text/plain'}, "name");
    e.href = URL.createObjectURL(file);
    e.download = `${this.state.title} Simplifai Note.txt`;
    e.click();
  }
  exportToGoogle = (e) => {
    e.preventDefault();
    if (this.state.token === '') {
      this.setError("You do have an account attached.");
      return;
    }
    return apiFetch('exportToDrive', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        text: this.state.text,
        title: this.state.title,
        googleToken: this.state.token
      }),
      method: 'POST'
    }).then(response =>
      response.text()
    ).then((json) => {
        json = JSON.parse(json);
        if (json.success === false) {
            this.setError("Your summary was successfully exported to Google Drive!");
            window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
        }
        else {
          // call funtion to send data to page
          this.setError("Your summary was successfully exported!");
          window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
        }
      });

  }
  toggleNightMode = () => {
    this.setState({
      nightMode: !this.state.nightMode
    });
    const { cookies } = this.props;
    cookies.set('scheme','');
    cookies.get('night') === 'bgnight' ? cookies.set('night','') : cookies.set('night','bgnight');

    window.location.reload();
  }
  toggleOfflineMode = (e) => {
    e.persist();
    let offline = this.state.isOffline;
    this.setState({
      isOffline: !this.state.isOffline
    });
    console.log('before this.state.isOffline', this.state.isOffline);
    if (offline === true) {
      if (getFromLocalStorage('text') !== null || getFromLocalStorage('title')) {
        console.log('before set state');
        this.setState({
          text: getFromLocalStorage('text'),
          title: getFromLocalStorage('title'),
          isOffline: false
        }, () => {
          this.updateNote(e);
        });
      }
      else {
        this.setError("Your summary saved in offline mode was not saved correctly!");
        window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
      }
    }
    else {
      this.setError("You are now in offline mode!");
      window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
    }
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated) {
      return (<Redirect to="/login"/>);
    }
    const sentences = [];
    this.state.sentences.forEach(sentence => {
      sentences.push(<p>{sentence}</p>);
    });
    return (
      <div className="summary">
      {this.state.wait ? <Loader/> : null}
      <form onSubmit={this.summarize}>
        <textarea className="h1" name="textarea" placeholder="Enter a Title..." value={this.state.title} onChange={this.onEditTitle} onKeyUp={this.handleKeyUp} />
        <button className="icon orange" onClick={this.toggleEditMode}><img src={edit_icon_orange} alt="edit"/></button>
        {this.state.error ? <p>{this.state.error}</p> : null}
        {this.state.editMode ?
          <EditSummary brevity={this.state.brevity} response={this.state.response} updateResponse={this.updateResponse} setError={this.setError} />
          :
          <textarea className="note" name="textarea" placeholder="Start taking notes..." onKeyUp={this.handleKeyUp} value={this.state.text} onChange={this.onEdit} id="summary"/>
        }
        <button className="fixed" type="submit">Summarize</button>
        <button onClick={this.updateNote} className="fixed save">Save</button>
      </form>
        <div className="brevity fixed fixed-slider">
          <label>Brevity {this.state.brevity}%</label>
          <input type="range" min="1" max="100" className="slider" id="myRange" value={this.state.brevity} onChange={this.changeBrevity} />
        </div>
        <div className="footer">
          <button className="button" onClick={this.toggleEditMode}><img src={edit_icon_white} alt="edit_icon_white"/></button>
          <button className="button" onClick={this.toggleOptions}>?</button>
        </div>
        {this.state.options
          ?
          (<div className="options drop">
            <p onClick={this.exportToText}>Export to text File</p>
            {this.state.token !== '' ? <p onClick={this.exportToGoogle}>Export to Google Drive</p> : null}
            <p onClick={this.toggleNightMode}>Toggle Night Mode</p>
            <p onClick={this.toggleOfflineMode}>Toggle Offline Mode</p>
          </div>) : null
        }
      </div>
    );
  }
}

export default withCookies(Summary);
