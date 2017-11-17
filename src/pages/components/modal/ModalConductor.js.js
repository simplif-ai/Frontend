import React from 'react';
import {connect} from 'react-redux';

import TutorialModal from './TutorialModal';
import FeedbackModal from './FeedbackModal';

const ModalConductor = props => {
    switch (props.currentModal) {
        case 'TUTORIAL':
            return <TutorialModal {...props}/>;

        case 'FEEDBACK':
            return <FeedbackModal {...props}/>;

        default:
            return null;
    }   
}
export default ModalConductor;
