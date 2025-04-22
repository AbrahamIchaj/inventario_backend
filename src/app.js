const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor Express funcionando en http://localhost:${PORT}`);
});

exports = app;