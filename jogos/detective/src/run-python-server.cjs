const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/run-python', (req, res) => {
  exec('python ./src/main.py', (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(stderr);
      return;
    }
    res.send(stdout);
  });
});

app.listen(3001, () => {
  console.log('Servidor escuchando en http://localhost:3001');
});