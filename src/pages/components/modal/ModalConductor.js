/*Taken from https://codeburst.io/modals-in-react-f6c3ff9f4701*/

import React from 'react';
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
export default (ModalConductor);
