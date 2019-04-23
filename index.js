const express = require('express');
const port = process.env.PORT || 3000;
const _ = require('lodash');

const app = express();

app.get('/', (req, res) => {
  res.send(JSON.stringify({ Hello: 'World' }))
});

// Github hook
app.post('/', (req, res) => {
  const actionType = _.get(req, ['headers', 'X-GitHub-Event'])

  res.send(JSON.stringify({
    Message: `Github Action: ${actionType}`,
  }));
});

app.get('/test', (req, res) => {
  res.send(JSON.stringify({
    Message: 'GET /test SUCCESS'
  }))
})

app.listen(port, () => {
  console.log('GitBot listening on port ', port);
})
