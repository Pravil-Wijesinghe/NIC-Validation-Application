// File: app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nicRoute = require('./routes/nic');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/nic', nicRoute);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
