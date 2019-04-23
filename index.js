const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send(JSON.stringify({ Hello: 'World' }))
});

app.post('/webhooks/github', (req, res) => {

})


app.listen(port, () => {
  console.log('GitBot listening on port ', port);
})
