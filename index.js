const express = require('express');
const { WebClient } = require('@slack/web-api');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { postMessage } = require('./postMessage');

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

  if (actionType) {
    if (actionType ==='labeled') {
      const labelName = _.get(req, 'body.label.name');
      const prTitle = _.get(req, 'body.pull_request.title');
      const prNumber = _.get(req, 'body.pull_request.number');
      const color = _.get(req, 'body.label.color');
      await postMessage(labelName, prTitle, prNumber, color, CHANNEL, web);
      res.send(200);
      return;
    }
  }

  res.send(400);
});

app.get('/test', (req, res) => {
  res.send(JSON.stringify({
    Message: 'GET /test SUCCESS'
  }))
})

app.listen(port, () => {
  console.log('GitBot listening on port ', port);
})
