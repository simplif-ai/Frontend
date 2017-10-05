import React, { Component } from 'react';
import apiFetch from '../../utils/api.js';
import '../../css/summary.css';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = { redirectToReferrer: false };
  }
  summarize = (e) => {
    e.preventDefault();
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
        }
      });
  }
  render() {
    return (
      <form onSubmit={this.summarize}>
        <textarea name="textarea"/>
        <button type="submit" >Submit</button>
      </form>
    );
  }
}

export default Summary;
