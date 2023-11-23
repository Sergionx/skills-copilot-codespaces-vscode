// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create app
const app = express();
// Use body parser
app.use(bodyParser.json());
// Use cors
app.use(cors());

// Create comments object to store comments
const commentsByPostId = {};

// Create get request to get all comments
app.get('/posts/:id/comments', (req, res) => {
  // Send comments back
  res.send(commentsByPostId[req.params.id] || []);
});

// Create post request to create a comment
app.post('/posts/:id/comments', (req, res) => {
  // Create id for comment
  const commentId = randomBytes(4).toString('hex');
  // Create comment
  const { content } = req.body;
  // Get comments for post
  const comments = commentsByPostId[req.params.id] || [];
  // Add comment to comments
  comments.push({ id: commentId, content });
  // Add comment to comments by post id
  commentsByPostId[req.params.id] = comments;
  // Send comment back
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});