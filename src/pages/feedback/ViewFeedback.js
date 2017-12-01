import React, { Component } from 'react';
import apiFetch from '../../utils/api.js';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import '../../css/login.css';
import '../../css/register.css';

class ViewFeedback extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies)
  };
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      error: null,
      feederbackers:[],
      popUp:false,
      gotFeedback:false
    };
  }
  popUp = () => {
        if (!this.state.popUp) {
        this.setState({
            popUp: ""
        });
        window.setTimeout(function() {
            if (this.state.popUp) {
            this.setState({ popUp: '' });
            }
        }.bind(this), 2000);
        }
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
            email: email
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
              this.setState({ error: "You've got feedback'!" });
              window.setTimeout(function() {
                  this.setState({ error: '' });
              }.bind(this), 2000);
                this.setState({
                        feederbackers: json   
                });
            }
          });
          if(!this.state.feederbackers){
              this.setState({popUp: 'No feedback!'});
          }
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated || this.state.redirect === true) {
      return (<Redirect to="/"/>);
    }
    const fback = [];
    if (this.state.collabs.length > 0){
            this.state.fback.forEach(feederbackers => {
                fback.push(<p>{collab.feedback}</p>);
                collabo.push(<br/>);
            })
            console.log(this.state.collabs);
    }
    return (
      <div className="page bgorange">
        <div className="feedback">
          <form onSubmit={this.sendFeedback}>
            <h1 className="left">Previously Sent Feedback...</h1>
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

export default withCookies(ViewFeedback);
