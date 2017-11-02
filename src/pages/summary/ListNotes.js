import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import apiFetch from '../../utils/api.js';
import '../../css/summary.css';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }
  componentDidMount() {
    const { cookies } = this.props;
    const email = cookies.get('email');
    apiFetch('listnotes', {
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
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
      </div>
    );
  }
}

export default withCookies(Summary);
