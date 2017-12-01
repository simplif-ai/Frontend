import React from 'react';
import ModalWrapper from './ModalWrapper';

import '../../../css/tutorial.css';
import img1 from '../../../assets/simplifai_profile.png';
import img2 from '../../../assets/simplifai_notes1.png';
import img3 from '../../../assets/simplifai_notes2.png';
import img4 from '../../../assets/simplifai_summarize.png';
import img5 from '../../../assets/simplifai_feedback.png';

class TutorialModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        slideIndex: 1,
        slides: [img1,img2,img3],
        tutText:[
          "The profile page lets you handle user settings! Edit your name and email in 'Edit Profile', toggle your email preferences, delete your account (careful with that one!),authorize your account with Google, and view previously submitted feedback!",
          "In 'My Notes', you handle your notes. You can create a new folder to store notes in, summarize an article by URL, pdf, or by pptx, or just click the '+' button at the top to create a new summary!",
          "If you scroll down 'My Notes', you can schedule email reminders for yourself to study, or "
        ]
    };
  }
      clickPrev = (e) => {
        this.setState({ slideIndex: this.state.slideIndex-1 });
    }
      clickNext = (e) => {
        this.setState({ slideIndex: this.state.slideIndex+1 });
    }
      
    render() {
        return (
          <ModalWrapper
            title="Tutorial"
            width={800}
            showOk={true}
            showModal={this.props.showModal}
            name={this.props.name}
            toggleState={this.props.toggleState}
          >
          <div className="carousel">
            <img className="carousel-img" src= {this.state.slides[(this.state.slideIndex%3)]} style={{'width':'60%'}}alt = "slide"/>
            <p>{this.state.tutText[this.state.slideIndex%3]}</p>
          </div>
           <i className="arrow leftArrow" onClick={this.clickPrev}></i>
           <i className="arrow rightArrow" onClick={this.clickNext}></i>
          </ModalWrapper>
        );
      }
    }

export default TutorialModal;
