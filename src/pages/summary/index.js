import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Redirect } from 'react-router-dom';
import apiFetch from '../../utils/api.js';
import '../../css/summary.css';
import edit_icon_orange from '../../assets/pencil-icon-orange.svg';
import Loader from '../components/Loader';
import EditSummary from './EditSummary';

class Summary extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      summary: {},
      summaryArray: [],
      sentencesArray: [],
      sentences: [],
      response: {},
      brevity: 50,
      isWaiting: false,
      editMode: false,
      sentenceCount: null,
      text: '',
      receivedSummary: false,
      error: null,
      title: '',
      editTitle: false,
      wait: false
    };
  }
  updateResponse = (index, priority) => {
    let newResponse = this.state.response;
    console.log('newResponse', newResponse, 'index', index, 'priority', priority);
    newResponse[index][1] = priority;
    console.log('newResponse after', newResponse);
    this.setState({
      response: newResponse
    });
    this.updateSummary();
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
    console.log('text', summary.join(' '));
    this.setState({
      summary: summary.join(' '),
      summaryArray: summary,
      text: summary.join(' '),
      sentencesArray: sentences
    });
  }
  summarize = (e) => {
    e.preventDefault();
    this.setState({
      wait: true
    });
    console.log('e', this.state.text);
    return apiFetch('summarizertext', {
      headers: {
       'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        text: this.state.text
      }),
      method: 'POST'
    }).then(response =>
      response.json()
    ).then((json) => {
        if (json.success === false) {
          console.log('error', json.error);
          this.setState({
            editMode: false,
            error: "json.error"
          });
        }
        else {
          // call funtion to send data to page
          console.log('success',json);
          this.setState({
            response: json.text,
            receivedSummary: true,
            wait: false
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
  onEditTitle = (e) => {
    this.setState({ title: e.target.value });
  }
  changeBrevity = (e) => {
    this.setState({
      brevity: e.target.value,
      sentenceCount: Math.floor(this.state.brevity * (1/100) * this.state.sentences.length)
    });
    if (this.state.receivedSummary === true) {
      this.updateSummary();
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
      response
    ).then((json) => {
        if (json.success === false) {
            console.log('error', json.error);
            this.setError("Your summary was not saved!");
            window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
        }
        else {
          // call funtion to send data to page
          console.log('success',json);
          this.setState({
            editMode: false
          });
          this.setError("Your summary was successfully saved!");
          window.setTimeout(function() { this.setError(null); }.bind(this), 4000);

          console.log('response', json);
          // this.updateSummary();
        }
      });
  }
  setError = (error) => {
    this.setState({
      error
    });
  }
  toggleEditMode = (e) => {
    e.preventDefault( );
    if (this.state.receivedSummary === true) {
      this.setState({
        editMode: !this.state.editMode
      });
    } else if (this.state.editMode === true) {
      this.setState({
        editMode: false
      });
    } else {
      this.setError("You can only edit summarized text!");
      window.setTimeout(function() { this.setError(null); }.bind(this), 4000);
    }
  }
  toggleEditTitle = () => {
    this.setState({
      editTitle: true
    });
  }
  render() {
    console.log('response', this.state.response);
    const { cookies } = this.props;
    const isAuthenticated = cookies.get('isAuthenticated');
    if (isAuthenticated === "false" || !isAuthenticated) {
      return (<Redirect to="/login"/>);
    }
    const sentences = [];
    this.state.sentences.forEach(sentence => {
      sentences.push(<p>{sentence}</p>);
    });
    // const dummyResponse = [
    //   ["It wasn’t too long ago that Silicon Valley scoffed at cryptocurrencies.",2,0],
    //   ["All over coffee shops in Mountain View and Menlo Park, you heard the same conversation: “Sure, it’s cool technology, but when are we going to see the killer app”?",3,1],
    //   ["A few merchants dipped their toes into accepting Bitcoin in 2014.",4,2],
    //   ["But adoption largely backed off.",5,3],
    //   ["I remember seeing a few Bitcoin ATMs in Austin, and then they disappeared.",6,4],
    //   ["Bitcoin reneged on its promise to replace cash, so most venture capitalists assumed it was dead on arrival.",7,5],
    //   ["Without a killer app driving consumer adoption, cryptocurrencies seemed like they would be nothing more than a curiosity for cryptographers and paranoids.",8,6],
    //   ["In the last year, interest in cryptocurrencies has skyrocketed.",0,7],
    //   ["The public cryptocurrency market cap has surged to highs of over $170B.",9,8],
    //   ["With over 1.5B raised through ICOs in 2017, over 70 crypto exchanges open for business, and crypto hedge funds and VCs popping up left and right, it seems that everyone is clambering to get a seat on the rocketship.",1,9]
    // ];
    return (
      <div className="summary">
      {this.state.wait ? <Loader/> : null}
      <form onSubmit={this.summarize}>
        <textarea className="h1" name="textarea" placeholder="Enter a Title..." value={this.state.title} onChange={this.onEditTitle} onKeyUp={this.handleKeyUp} />
        <button className="icon orange" onClick={this.toggleEditMode}><img src={edit_icon_orange} alt="edit"/></button>
        {this.state.error ? <p>{this.state.error}</p> : null}
        {this.state.editMode ?
          <EditSummary brevity={this.state.brevity} response={this.state.response} updateResponse={this.updateResponse} setError={this.setError} />
          :
          <textarea className="note" name="textarea" placeholder="Start taking notes..." onKeyUp={this.handleKeyUp} value={this.state.text} onChange={this.onEdit} id="summary"/>
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
