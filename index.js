const express = require('express');
const { WebClient } = require('@slack/web-api');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { updateLabel } = require('./postMessage');

// Env vars
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const port = process.env.PORT || 3000;

// Constants TODO: refactor these
const REPO_CHANNEL_MAP = {
  groover: '#dan-test',
}
const getSlackChannelId = repoName => _.get(REPO_CHANNEL_MAP, repoName);

if (!SLACK_TOKEN) {
  console.log('No slack token');
  return;
}

// Create instance of slack
const web = new WebClient(SLACK_TOKEN);
// Create instance of express
const app = express();

// Setup middlewares
app.use(bodyParser.json());


// Start listening
app.get('/', (req, res) => {
  res.send(JSON.stringify({ Hello: 'World' }))
});

// Github hook
// TODO Only allow access from github
app.post('/', async (req, res) => {
  const actionType = _.get(req, ['body', 'action']);

  // Can it not have an action??
  if (actionType) {
    if (actionType ==='labeled') {
      const labelName = _.get(req, 'body.label.name');

      // Only post to slack if labels are relevant
      if (labelName === 'Ready for Review' || labelName === 'Question') {
        // Get the things I need
        const prTitle = _.get(req, 'body.pull_request.title');
        const prNumber = _.get(req, 'body.pull_request.number');
        const prUrl = _.get(req, 'body.pull_request.html_url');
        const user = _.get(req, 'body.pull_request.user.login');

        const labelColor = _.get(req, 'body.label.color');
        const sender = _.get(req, 'body.sender.login');
        const repoName = _.get(req, 'body.repository.name');

        const slackChannelId = getSlackChannelId(repoName);

        // Post to slack
        await updateLabel(labelName, prTitle, prNumber, prUrl, labelColor, slackChannelId, user, sender, web);

        // Let GitHub know everything went well
        return res.sendStatus(200);
      }
    }
  }

  res.sendStatus(400);
});

app.listen(port, () => {
  console.log('DanBot listening on port ', port);
})
