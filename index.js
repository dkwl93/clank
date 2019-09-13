const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const WebhooksApi = require('@octokit/webhooks');

const { handleLabelUpdate } = require('./src/webhooks/github/pull_request');

// Env vars
const { SLACK_TOKEN, GITHUB_SECRET } = process.env;
const PORT = process.env.PORT || 3000;

// Create instance of express
const app = express();
// Create instance of webhook handler
const webhooks = WebhooksApi({
  secret: GITHUB_SECRET,
  path: '/webhooks/github',
});

// Setup middlewares
app.use(bodyParser.json());
app.use(webhooks.middleware);

// Start listening
app.get('/', (req, res) => {
  if (!SLACK_TOKEN) {
    res.status(400).send('No Slack Token provided');
  }
  res.status(200).send('Clank is up and running');
});

// Github hook
webhooks.on('pull_request', async ({ payload }) => {
  // TODO Move this out into handlePullRequestEvent.js
  const { action } = payload;
  if (action === 'labeled') {
    return await handleLabelUpdate(payload);
  }
  return;
});

webhooks.on('error', error => {
  console.log('ERROR:', error);
  res
    .status(500)
    .send('Something wrong with the webhook! Check logs for error');
});

app.listen(PORT, () => {
  console.log('Clank listening on port', PORT);
});
