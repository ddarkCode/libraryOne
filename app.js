require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
// const path = require('path');

const app = express();
const { PORT } = process.env;

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Library' });
});

app.listen(PORT, () => {
  debug(`Server is running on port ${chalk.green(PORT)}`);
});
