import ModalWrapper from '../ModalWrapper.jsx';

const TutorialModal = props => {
  const tutorialModal = provider => {
    props.hideModal();
    props.signIn(provider);
  };

  return (
    <ModalWrapper
      {...props}
      title="Tutorial"
      width={400}
      showOk={false}
    >
    <p>test</p>
    </ModalWrapper>
  );
};

export default TutorialModal;