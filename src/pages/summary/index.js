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
    const req = {
      summary: e.target.textarea.value
    }
    console.log('text', req.summary);
    let d = new FormData();
    d.append('text', req.summary);
    return apiFetch('summarize',{
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      },
      method: 'POST',
      body: d
    }).then(response => {
      console.log('response', response);
      response.json();
    }).then((json) => {
            // if(json.success === false) {
            //     console.log('error', json.message);
            // }
            // else {
            //
            console.log('json',json);
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
