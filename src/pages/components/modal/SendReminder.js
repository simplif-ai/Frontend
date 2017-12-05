import React from 'react';
import ModalWrapper from './ModalWrapper';
import apiFetch from '../../../utils/api.js';
import { withCookies } from 'react-cookie';

class ReminderModal extends React.Component {
    constructor(props) {
        super(props);
        const { cookies } = this.props;
        const googleToken = cookies.get('token');
        this.state = {
            text: props.text,
            error: '',
            dates: props.dates,
            selectedDate: '',
            eventTitle: '',
            token: googleToken,
            sendEmail: false
        };
    }
    handleInput = (e) =>  {
      this.setState({ text: e.target.value });
    }
    selectDate = (date) => {
      console.log('add to calendar: ', date);
      this.setState({
        dateSelect: true,
        selectedDate: date,
        eventTitle: `Event on ${date}`
      });
    }
    onChange = (e) => {
      this.setState({
        eventTitle: e.target.value
      });
    }
    addDate = (e) => {
      e.preventDefault();
      if (this.state.token === '') {
        this.setState({ error: "You do have an account attached." });
        return;
      }
      const start = {
        date: this.state.selectDate
      };
      const end = {
        date: this.state.selectDate
      }
      const event = {
        summary: e.target.summary.value,
        start,
        end
      };
      console.log('event', event, 'token', this.state.token);
      return apiFetch('createGoogleEvent', {
        headers: {
         'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
          googleToken: this.state.token,
          event
        }),
        method: 'POST'
      }).then(response =>
        response.json()
      ).then((json) => {
          console.log('json', json);
          if (json.success === false) {
            this.setState({ error: "We could not pull a summary from this noteID" });
            window.setTimeout(function() { this.setState({ error: "" }); }.bind(this), 4000);
          }
          else {
            this.setState({ error: "the date was successfully added to your calendar" });
          }
        });
    }
    showEmail = (e) => {
      e.preventDefault();
      this.setState({
        sendEmail: true
      })
    }
    sendEmail = (e) => {
      e.preventDefault();
      const { cookies } = this.props;
      const email = cookies.get('email');
      const message = '<h3>Here is a reminder for a Simplif.ai event we found in your notes</h3><br/><br/>' + 'Event: ' + this.state.eventTitle + "<br/><br/>Message: " + e.target.message.value + '<br/><br/>Cheers,<br/><br/>Simplif.ai Team';
      const req = {
        email,
        dateString: this.state.dateSelect,
        message
      };
      apiFetch('emailReminder', {
        headers: {
         'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
          email,
          dateString: this.state.dateSelect,
          message
        }),
        method: 'POST'
      }).then(response =>
        response.text()
      ).then((json) => {
          json = JSON.parse(json);
          console.log('json', json);
          if (json.success === true) {
            this.setState({ error: "You were reminded by email!" });
            window.setTimeout(function() {
              this.setState({ error: '' });
            }.bind(this), 2000);
          }
          else {
            this.setState({ error: "You were unable schedule an email!" });
            window.setTimeout(function() {
              this.setState({ error: '' });
            }.bind(this), 2000);
          }
        });
    }
    render() {
        console.log('dateFound', this.props.dateFound, 'dates', this.state.dates);
        console.log('this.state.dateSelect', this.state.dateSelect);
        const dates = [];
        if (this.state.dates && this.state.dates.length > 0) {
          this.state.dates.forEach(date => {
            console.log('date in for each', date);
            dates.push(<a key={`event = ${date}`} className="block" onClick={() => this.selectDate(date)}>{date}</a>);
          });
        }
        return (
            <ModalWrapper
              title="Send me a Reminder or Create an Event!"
              width={800}
              showOk={true}
              showModal={this.props.showModal}
              toggleState={this.props.toggleState}
              name={this.props.name}
              okText="Submit"
            >
              {this.state.error ? <p>{this.state.error}</p> : null}
              {this.props.dateFound === false ?
                (
                  <div>
                    <h2>Sorry we could not find a date in your summary</h2>
                    <p>Try using this format instead `mm[/.-]dd[/.-]yyyy hh:mm:ss AM|PM`</p>
                  </div>
                )
                :
                  <div>
                    <h2>Here are some dates we pulled from your summary</h2>
                    <p>Click to create an event in google drive</p>
                    {dates}
                  </div>
              }
              {this.state.dateSelect === true ?
                <form onSubmit={this.addDate}>
                  <h2>Edit Your Event</h2>
                  <label htmlFor="summary">Event Title</label>
                  <input type="text" name="summary" value={this.state.eventTitle} onChange={this.onChange} required />
                  <input className="btn" type="submit" name="submit" value="Save Event in Google Calendar" />
                  <input className="btn" onClick={this.showEmail} value="Send Email" />
                </form>
                :
                null
              }
              {(this.state.dateSelect === true && this.state.sendEmail === true) ?
                <form onSubmit={this.sendEmail}>
                  <h2>Send an Email Reminder with this Event</h2>
                  <label htmlFor="summary">Event Title</label>
                  <input type="text" name="summary" value={this.state.eventTitle} onChange={this.onChange} required />
                  <label htmlFor="message">Email Message</label>
                  <input type="text" name="message" required />
                  <input className="btn" type="submit" name="submit" value="Send Email" />
                </form>
                :
                null
              }
            </ModalWrapper>
        );
    };
}

export default withCookies(ReminderModal);
