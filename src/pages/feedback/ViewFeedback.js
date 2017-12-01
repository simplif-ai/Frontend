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
      gotFeedback:false,
      goBack:false
    };
  }
  componentDidMount() {
        this.viewFeedback();
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
  weOutie = () => {
    this.setState({goBack: true});
  }
  viewFeedback = (e) => {
    
      console.log("viewing");
      return apiFetch('viewfeedback',{
          headers: {
          'Content-Type': 'text/plain'
          },
          method: 'POST'
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
          if(!this.state.feederbackers){
              this.setState({popUp: 'No feedback!'});
          }
          });
         
  }
  render() {
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated || this.state.redirect === true) {
      return (<Redirect to="/"/>);
    }
    if(this.state.goBack === true) {
      return (<Redirect to="/profile"/>);
    }
    const fback = [];
    if (this.state.feederbackers.length > 0){
            this.state.feederbackers.forEach(feedback => {
                fback.push(<p>{feedback.name}: {feedback.feedback}</p>);
                fback.push(<hr/>);
            })
    }
    return (
      <div className="page bgorange">
        <div className="feedback">
            <h1 className="left">Previously Sent Feedback...</h1>

            {fback}

        </div>
        <button onClick={this.weOutie}>back</button>
      </div>
    );
  }
}

export default withCookies(ViewFeedback);
