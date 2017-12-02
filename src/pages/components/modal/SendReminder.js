import React from 'react';
import ModalWrapper from './ModalWrapper';

class ReminderModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            error: '',
            dates: props.dates,
            selectedDate: ''
        };
    }
    componentDidMount() {

    }
    handleInput = (e) =>  {
      this.setState({ text: e.target.value });
    }
    selectDate = (date) => {
      console.log('add to calendar: ', date);
      this.setState({
        dateSelect: true,
        selectedDate: date
      });
    }
    render() {
        console.log('dateFound', this.props.dateFound, 'dates', this.state.dates);
        console.log('this.state.dateSelect', this.state.dateSelect);
        const dates = [];
        if (this.state.dates && this.state.dates.length > 0) {
          this.state.dates.forEach(date => {
            console.log('date in for each', date);
            dates.push(<a className="block" onClick={() => this.selectDate(date)}>{date}</a>);
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
                    <p>Try using this format instead `mm[/.-]dd[/.-]yyyy hh:mm:ss am|pm`</p>
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
                  <input type="text" name="summary" placeholder={`Event on ${this.state.selectedDate}`} required />
                  <label htmlFor="start-date">Start Date</label>
                  <input type="datetime-local" name="start-date" required />
                  <label htmlFor="end-date">End Date</label>
                  <input type="datetime-local" name="end-date" required />
                  <input className="btn" type="submit" name="submit" value="Save Event in Google Calendar" />
                </form>
                :
                null
              }
            </ModalWrapper>
        );
    };
}

export default ReminderModal;
