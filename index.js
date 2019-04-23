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
} else {
  console.log('SLACK_TOKEN: ', SLACK_TOKEN);
}


const app = express();

// Setup middlewares
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(JSON.stringify({ Hello: 'World' }))
});

// Github hook
app.post('/', async (req, res) => {
  console.log(req);
  const actionType = _.get(req, ['headers', 'x-github-event'])

  // TODO Fix this
  const action = 'labeled';
  const labelName = _.get(req, 'label.name');

  res.send(200);

  return

  const message = `Label added: ${labelName}`;

  await postMessage(message, CHANNEL, web);

  res.send(200);
});

app.get('/test', (req, res) => {
  res.send(JSON.stringify({
    Message: 'GET /test SUCCESS'
  }))
})

app.listen(port, () => {
  console.log('GitBot listening on port ', port);
})
