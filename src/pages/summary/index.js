import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import apiFetch from '../../utils/api.js';
import '../../css/summary.css';
import edit_icon_orange from '../../assets/pencil-icon-orange.svg';

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
      toggleEdit: false,
      sentenceCount: null
    };
  }
  updateSummary = () => {
    const textarea = document.getElementById('summary');
    console.log('text area', textarea);
    // this.state.sentenceCount
  }
  summarize = (e) => {
    e.preventDefault();
    e.persist();
    return apiFetch('sumarizertext', {
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
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
        }
        else {
          // call funtion to send data to page
          console.log('success',json);
          this.setState({
            summary: json.text
          });
          const summary = [];
          const sentenceCount = Math.floor(this.state.brevity * (1/100) * json.text.length);
          this.setState({ sentenceCount: sentenceCount });
          const sentences = [];
          json.text.forEach(sentence => {
            if (sentence[1] <= sentenceCount) {
              summary.push(sentence[0]);
            }
            sentences.push(sentence[0]);
          });
          e.target.textarea.value = summary.join(' ');
          console.log('sentences', sentences);
          console.log('summary', summary.join(' '));
          this.setState({ summary: summary.join(' ')});
        }
      });
  }
  handleKeyUp = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = 25 + e.target.scrollHeight + 'px';
  }
  changeBrevity = (e) => {
    this.setState({
      brevity: e.target.value,
      toggleEdit: true,
      sentenceCount: Math.floor(this.state.brevity * (1/100) * this.state.sentences.length)
    });
    this.updateSummary();
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated) {
      return (<Redirect to="/login"/>);
    }
    return (
      <div className="summary">
      <form onSubmit={this.summarize}>
        <h1>Title</h1>
        <button className="icon orange"><img src={edit_icon_orange} alt="edit"/></button>

        <textarea name="textarea" placeholder="Start taking notes..." onKeyUp={this.handleKeyUp} id="summary"/>
        <button className="summarize fixed" type="submit">Summarize</button>
      </form>
        <div className="brevity fixed fixed-slider">
          <label>Brevity {this.state.brevity}%</label>
          <input type="range" min="1" max="100" className="slider" id="myRange" onChange={this.changeBrevity} />
        </div>
      </div>
    );
  }
}

export default withCookies(Summary);
