import React from 'react';
import '../../css/summary.css';

const EditSummary = ({ response, updateResponse, setError, brevity }) => {
  const deleteSentenceFromSummary = (index) => {
    console.log('index', index);
    updateResponse(index, response.length);
  };
  const addSentenceToSummary = (index) => {
    updateResponse(index, -1);
  };
  const sentences = [];
  if (response) {
    const summaryCount = Math.floor(brevity * (1/100) * response.length);
      response.forEach((sentence, index) => {
        console.log('index', index);
      if (sentence[1] <= summaryCount) {
        sentences.push(<p className="summary-sentence" onClick={() => deleteSentenceFromSummary(index)} key={`Sentence: ${index}: ${sentence[0]}`}>{sentence[0]}</p>);
      } else {
        sentences.push(<p className="non-summary-sentence" onClick={() => addSentenceToSummary(index)} key={`Sentence: ${index}: ${sentence[0]}`}>{sentence[0]}</p>);
      }
    });
  } else {
    () => setError('You can only edit summarized text!');
  }
  return <div className="marginBottom">{sentences}</div>;
}

export default EditSummary;
