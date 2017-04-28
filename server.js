// "use-strict";

/*
[x] set up server
[x] serve static files
[] connect to DB
[] configure middleware & routing
[x] handle GET for previously asked questions
[x] handle POST for new questions
[] handle PUT for manipulating stored questions
*/

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Question = require('./src/db/db-schema');
// const morgan = require('morgan');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '/src/client')));

app.get('/api/questions', (req, res) => {
  console.log('GET req received');
  // request all question data form DB, send data in response
  Question.find({}, (err, questions) => {
    if (err) {
      console.log(err);
      res.status(404);
      res.send(err);
    } else {
      res.status(200).send(questions);
    }
  });
});

app.post('/api/questions', (req, res) => {
  console.log('POST req received');
  // add new questions to the DB
  var newQuestion = new Question({
    questionText: req.body.data,
    votes: 0,
    answered: false
  })

  newQuestion.save((err, question) => {
    if (err) {
      console.log('ERRROR!', err);
      res.status(500).res.send(err);
    } else {
      res.status(200).send();
    }
  });
});

app.put('/api/questions', (err, data) => {
  console.log('PUT req received');
  // make edits to stored questions, return new version
  Question.findByIdAndUpdate(id, { $set: { text: 'req.body.data' }}, { new: true }, function (err, data) {
    if (err) return handleError(err);
    res.send(data);
  })
});

app.listen(port, () => {
  console.log('Listening to port...' + port);
});