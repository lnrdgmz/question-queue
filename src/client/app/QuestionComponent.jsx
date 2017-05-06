import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardText } from 'material-ui/Card';
import { grey200 } from 'material-ui/styles/colors';
import TagArray from './TagArray.jsx';
// import QuestionModifyComponent from './QuestionModifyComponent.jsx';

const QuestionComponent = (props) => {
  const question = props.question;
  const user = props.user;

  const upVoteBtn = <FlatButton onClick={() => props.handleUpvote(question)} label="Vote" />;
  const answerBtn = <FlatButton onClick={() => props.handleAnswered(question)} label="Clear" />;
  const deleteBtn = <FlatButton onClick={() => props.handleDelete(question)} label="Delete" />;
  const editBtn = <FlatButton onClick={() => props.handleEdit(question)} label="Edit" />;

  const buttons = [
    !question.answered
      && !question.usersVoted.includes(user.username)
      ? upVoteBtn : null,
    user.username === question.username ||
      user.role === 'admin'
      ? editBtn : null,
    user.username === question.username ||
      user.role === 'admin'
      ? deleteBtn : null,
    user.role === 'admin'
      ? answerBtn : null,
  ];

  const tags = user.username === question.username || user.role === 'admin' ? (
    <TagArray tags={question.tags}
      question={question}
      handleTagDelete={props.handleTagDelete}
      />
  ) : (
    <TagArray tags={question.tags}
      question={question}
      />
  );

  return (
      <Card className="question">
        <CardText className="question-card-content">
        <div className="question-body">
          {question.questionText.split('\n').map((line, idx) => (
            <span key={idx}>{line}<br/></span>
          ))}
        </div>
        <div className="question-snippet">
          {question.codeSnippet.split('\n').map((line, idx) => (
            <span key={idx}>{line}<br/></span>
          ))}
        </div>
        <div className="tag-bar">{tags}</div>
        <div className="question-info-bar">
          <span className="votes-span">Votes: {question.votes}</span>
          <span className="timestamp-span">Asked on {question.createdAt}</span>
        </div>
        </CardText>
        <CardActions>
          {buttons}
        </CardActions>
      </Card>
  );
};

// <div>Tags: <TagArray tags={question.tags} /></div>
export default QuestionComponent;
