const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { handleGithubWebhook } = require('./src/webhooks/github');

// Env vars
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const port = process.env.PORT || 3000;

// Create instance of express
const app = express();

// Setup middlewares
app.use(bodyParser.json());

// Start listening
app.get('/', (req, res) => {
  if (SLACK_TOKEN) {
    res.status(200).send('Clank is up and running')
  } else {
    res.status(400).send('No Slack Token provided');
  }
});

// Github hook
// TODO Only allow access from github
app.post('/webhooks/github', async (req, res) => {
  return await handleGithubWebhook(req, res);
});

app.listen(port, () => {
  console.log('Clank listening on port ', port);
});
