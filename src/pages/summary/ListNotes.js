import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Redirect, Link } from 'react-router-dom';
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
            console.log('note', note);
            if (note.name === '') {
              note.name = 'Undefined Title';
            }
            return (<Link to={`/notes/${note.noteID}}`} key={`${note.name} ${note.noteID}`}><h2>{note.name}</h2><p>{note.noteID}</p></Link>);
          })
          : null
        }
      </div>
    );
  }
}

export default withCookies(Summary);
