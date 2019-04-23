const express = require('express');
const { WebClient } = require('@slack/web-api');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { handleGithubWebhook } = require('./src/webhooks/github');

// Env vars
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const port = process.env.PORT || 3000;

if (!SLACK_TOKEN) {
  console.log('No slack token');
  return;
}

// Create instance of slack
const slackClient = new WebClient(SLACK_TOKEN);
// Create instance of express
const app = express();

// Setup middlewares
app.use(bodyParser.json());

// Start listening
app.get('/', (req, res) => {
  res.send(JSON.stringify({ Hello: 'World' }));
});

// Github hook
// TODO Only allow access from github
app.post('/webhooks/github', async (req, res) => {
  return await handleGithubWebhook(req, res);
});

app.listen(port, () => {
  console.log('DanBot listening on port ', port);
});
