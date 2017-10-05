import React, { Component } from 'react';
import apiFetch from '../../utils/api.js';
import '../../css/summary.css';
//import '../../App.css';
class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      summary: {},
      brevity: 50,
    };
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
          const sentenceCount = this.state.brevity * (1/100) * json.text.length;
          const sentences = [];
          json.text.forEach(sentence => {
            if (sentence[1] <= sentenceCount) {
              summary.push(sentence[0]);
            }
            console.log('sentece', sentence[0]);
            sentences.push(sentence[0]);
          });
          e.target.textarea.value = sentences;
        }
      });
  }
  handleKeyUp = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = 25 + e.target.scrollHeight + 'px';
  }
  changeBrevity = (e) => {
    this.setState({ brevity: e.target.value });
  }
  render() {
    return (
      <div className="summary">
      <form onSubmit={this.summarize}>
        <h1>Title</h1>
        <textarea name="textarea" placeholder="Start taking notes..." onKeyUp={this.handleKeyUp}>

        </textarea>
        <button type="submit" >Summarize</button>
      </form>
        <div className="brevity">
          <label>Brevity {this.state.brevity}%</label>
          <input type="range" min="1" max="100" className="slider" id="myRange" onChange={this.changeBrevity} />
        </div>
      </div>
    );
  }
}

export default Summary;
