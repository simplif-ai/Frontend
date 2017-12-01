import React from 'react';
import ModalWrapper from './ModalWrapper';

import '../../../css/tutorial.css';
import img1 from '../../../assets/profile_ss.png';
import img2 from '../../../assets/folders_ss.png';
import img3 from '../../../assets/notes_ss.png';

class TutorialModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        slideIndex: 1,
        slides: [img1,img2,img3],
        tutText:[
          "explanatory text1","text2","text3!"
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
            <img src= {this.state.slides[(this.state.slideIndex%3)]} style={{'width':'60%'}}alt = "slide"/>
            <p>{this.state.tutText[this.state.slideIndex%3]}</p>
          </div>
           <i className="arrow leftArrow" onClick={this.clickPrev}></i>
           <i className="arrow rightArrow" onClick={this.clickNext}></i>
          </ModalWrapper>
        );
      }
    }

export default TutorialModal;
