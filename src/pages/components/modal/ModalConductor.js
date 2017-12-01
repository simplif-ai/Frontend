/*Taken from https://codeburst.io/modals-in-react-f6c3ff9f4701*/

import React from 'react';
import TutorialModal from './TutorialModal';
import FeedbackModal from './FeedbackModal';
import ViewCollabModal from './ViewCollab';
import AddCollabModal from './AddCollab';
import ReminderModal from './SendReminder';

const ModalConductor = props => {
    switch (props.currentModal) {
        case 'TUTORIAL':
            return <TutorialModal {...props}/>;

        case 'FEEDBACK':
            return <FeedbackModal {...props}/>;

        case 'ADDCOLLAB':
            return <AddCollabModal {...props}/>;
        
        case 'VIEWCOLLAB':
            return <ViewCollabModal {...props}/>;

        case 'SENDREMINDER':
            return <ReminderModal {...props}/>;

        default:
            return null;
    }   
}
export default (ModalConductor);
