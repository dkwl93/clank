const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send(JSON.stringify({ Hello: 'World' }))
});

app.post('/', (req, res) => {
  res.send(JSON.stringify({
    Message: 'Welcome to gitbot',
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
