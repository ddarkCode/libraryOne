require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const app = express();
const { PORT } = process.env;

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello from my library app');
});

app.listen(PORT, () => {
  debug(`Server is running on port ${chalk.green(PORT)}`);
});
