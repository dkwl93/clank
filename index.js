const express = require('express');
const { WebClient } = require('@slack/web-api');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { updateLabel } = require('./postMessage');

const SLACK_TOKEN = process.env.SLACK_TOKEN;
const CHANNEL = 'CJ3LQT2EL';
const port = process.env.PORT || 3000;
const web = new WebClient(process.env.SLACK_TOKEN);

if (!SLACK_TOKEN) {
  console.log('No slack token');
  return;
}

const app = express();

// Setup middlewares
app.use(bodyParser.json());


// Start listening
app.get('/', (req, res) => {
  res.send(JSON.stringify({ Hello: 'World' }))
});

// Github hook
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
        const prUrl = _.get(req, 'body.pull_request.url');
        const labelColor = _.get(req, 'body.label.color');

        // Post to slack
        await updateLabel(labelName, prTitle, prNumber, prUrl, labelColor, CHANNEL, web);

        // Let GitHub know everything went well
        return res.sendStatus(200);
      }
    }
  }

  res.sendStatus(400);
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log('GitBot listening on port ', port);
})
