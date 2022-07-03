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

const navs = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];

const bookRouter = require('./src/routes/bookRoutes')(navs);

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render('index', {
    navs,
    title: 'Library',
  });
});

app.listen(PORT, () => {
  debug(`Server is running on port ${chalk.green(PORT)}`);
});
