import React, { Component } from 'react';
import apiFetch from '../../utils/api.js';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import '../../css/login.css';
import '../../css/register.css';

class SendFeedback extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies)
  };
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      error: null
    };
  }
  sendFeedback = (e) => {
    e.preventDefault();
    e.persist();
    const { cookies } = this.props;
    const email = cookies.get('email');
    return apiFetch('addfeedback',{
        headers: {
         'Content-Type': 'text/plain'
        },
        method: 'POST',
        body: JSON.stringify({
          email: email,
          feedback: e.target.feedback.value
        })
    }).then((response) => response.json())
        .then((json) => {
          console.log('response', json);
          if(json.success === false) {
              console.log('error', json.error);
              this.setState({ error: json.error });
          }
          else {
            console.log('json',json);
            this.setState({ error: "Your feedback was successfully sent!" });
            window.setTimeout(function() {
              this.setState({ error: '' });
            }.bind(this), 2000);
            e.target.feedback.value = '';
          }
        });
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated || this.state.redirect === true) {
      return (<Redirect to="/"/>);
    }
    return (
      <div className="page bgorange">
        <div className="feedback">
          <form onSubmit={this.sendFeedback}>
            <h1 className="left">Send Feedback to our Developers</h1>
            <label htmlFor="feedback">Let us know what you think about Simplif.ai!</label>
            <textarea className="feedback-input" type="text" name="feedback" required />
            <br/>
            {this.state.error ? <p className="left">{this.state.error}</p> : null}
            <input className="btn f" type="submit" name="submit" value="Submit" />
            <br/>
          </form>
        </div>
      </div>
    );
  }
}

export default withCookies(SendFeedback);
