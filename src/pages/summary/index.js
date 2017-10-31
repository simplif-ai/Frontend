import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import apiFetch from '../../utils/api.js';
import '../../css/summary.css';
import edit_icon_orange from '../../assets/pencil-icon-orange.svg';
import Loader from '../components/Loader';

class Summary extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      summary: {},
      sentences: [],
      response: {},
      brevity: 50,
      isWaiting: false,
      toggleEdit: false,
      sentenceCount: null,
      text: '',
      receivedSummary: false,
      error: null
    };
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
    console.log('sentences', sentences.join(' '));
    console.log('summary', summary.join(' '));

    this.setState({
      summary: summary.join(' '),
      text: summary.join(' ')
    });
  }
  summarize = (e) => {
    this.setState({
      isWaiting: true
    });
    e.preventDefault();
    e.persist();
    return apiFetch('summarizertext', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        text: e.target.textarea.value
      }),
      method: 'POST'
    }).then(response =>
      response.json()
    ).then((json) => {
        if (json.success === false) {
          console.log('error', json.error);
          this.setState({
            toggleEdit: false,
            error: "json.error"
          });
        }
        else {
          // call funtion to send data to page
          console.log('success',json);
          this.setState({
            response: json.text,
            receivedSummary: true,
            isWaiting: false
          });
          console.log('response', json);
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
  changeBrevity = (e) => {
    this.setState({
      brevity: e.target.value,
      sentenceCount: Math.floor(this.state.brevity * (1/100) * this.state.sentences.length)
    });
    if (this.state.receivedSummary === true) {
      this.updateSummary();
    } else {
      <div className = "errorClass">
          {this.state.error ? `Error= ${this.state.error}` : null}
      </div>
    }
  }
  saveSummary = (e) => {
    e.preventDefault();
    const { cookies } = this.props;
    const email = cookies.get('email');
    return apiFetch('savesummary', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        text: this.state.text,
        email
      }),
      method: 'POST'
    }).then(response =>
      response.json()
    ).then((json) => {
        if (json.success === false) {
            console.log('error', json.error);
        }
        else {
          // call funtion to send data to page
          console.log('success',json);
          this.setState({
            toggleEdit: false
          });
          console.log('response', json);
          // this.updateSummary();
        }
      });
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
      {this.state.isWaiting ? <Loader/> : null}
      <form onSubmit={this.summarize}>
        <h1>Title</h1>
        <button className="icon orange"><img src={edit_icon_orange} alt="edit"/></button>
        {this.state.toggleEdit ?
          {sentences}
          :
          <textarea name="textarea" placeholder="Start taking notes..." onKeyUp={this.handleKeyUp} value={this.state.text} onChange={this.onEdit} id="summary"/>
        }
        <button className="fixed" type="submit">Summarize</button>
        <button onClick={this.saveSummary} className="fixed save">Save</button>
      </form>
        <div className="brevity fixed fixed-slider">
          <label>Brevity {this.state.brevity}%</label>
          <input type="range" min="1" max="100" className="slider" id="myRange" value={this.state.brevity} onChange={this.changeBrevity} />
        </div>
      </div>
    );
  }
}

export default withCookies(Summary);
