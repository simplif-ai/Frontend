import React from 'react';
import ModalWrapper from './ModalWrapper';

import '../../../css/tutorial.css';
import img1 from '../../../assets/simplifai_profile.png';
import img2 from '../../../assets/simplifai_notes1.png';
import img3 from '../../../assets/simplifai_notes2.png';
import img4 from '../../../assets/simplifai_summarize.png';
import img5 from 
'../../../assets/simplifai_sumOptions.png'
import img6 from '../../../assets/simplifai_feedback.png';
class TutorialModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        slideIndex: 0,
        slideNum: 6,
        slides: [img1,img2,img3,img4,img5,img6],
        tutText:[
          "The profile page lets you handle user settings! Edit your name and email in 'Edit Profile', toggle your email preferences, delete your account (careful with that one!),authorize your account with Google, and view previously submitted feedback!",
          "In 'My Notes', you handle your notes. You can create a new folder to store notes in, summarize an article by URL, upload a pdf or pptx file to summarize, or just click the '+' button at the top to create a new summary!",
          "If you scroll down 'My Notes', you can schedule email reminders for yourself to study for an important exam, or just for kicks!",
          "Upon clicking '+' you will be brought to the summary page! Copy and paste text here and click 'Summarize' to receive your summarized text! Use the brevity slider to control the size of your summary and click the pencil to enter edit mode. Don't forget to 'Save'!",
          "If you click the '?' icon, you will see many more options for your notes. Though most are self-explanatory, it is worth highlighting that you can search for important dates in your summarized notes using 'Search for Dates'. If we find noteworthy dates, you'll have the option to email yourself a reminder!",
          "If you want to send in feedback, you can find the 'Send Feedback' option in the nav bar to give us your thoughts on Simplif.ai or maybe just say hello :) Click Submit when you're finished. If you want to view previously submitted feedback, you can find that on your profile page. Please remember to use friendly language! Please note that if you want to report a bug, this is the best place to do so."
        ]
    };
  }
      clickPrev = (e) => {
        if (this.state.slideIndex > 0){
          this.setState({ slideIndex:   this.state.slideIndex-1 });
        }
        console.log('slide index:',this.state.slideIndex);
      }
      clickNext = (e) => {
        if (this.state.slideIndex < this.state.slideNum - 1){
          this.setState({ slideIndex: this.state.slideIndex+1 });
        }
        console.log('slide index:',this.state.slideIndex);
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
            <img className="carousel-img" src= {this.state.slides[(this.state.slideIndex)]} style={{'width':'60%'}}alt = "slide"/>
            <p style={{'font-family':'Crimson Text, serif'}}>{this.state.tutText[this.state.slideIndex]}</p>
          </div>
           {this.state.slideIndex > 0 ? <i className="arrow leftArrow" onClick={this.clickPrev}></i> : null}
           {this.state.slideIndex < this.state.slideNum - 1 ? <i className="arrow rightArrow" onClick={this.clickNext}></i> : null}
          </ModalWrapper>
        );
      }
    }

export default TutorialModal;
