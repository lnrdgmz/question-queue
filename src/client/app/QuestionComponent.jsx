import React from 'react';

const QuestionComponent = (props) => {
  const question = props.question;
  return (
    <div>
      <div>{question.questionText}</div>
      <div>Votes: {question.votes}</div>
      <div>Asked on {Date(question.createdAt)}</div>
      {question.answered ||
        <div>
          <button onClick={() => props.handleUpvote(question)}>Vote</button>
          <button onClick={() => props.handleAnswered(question)}>Clear</button>
        </div>
      }
    </div>
  );
};

export default QuestionComponent;
