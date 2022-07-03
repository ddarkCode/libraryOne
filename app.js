require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const { connect, model, Schema } = require('mongoose');

const app = express();
const { PORT, MONGO_URL } = process.env;

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.static('public'));

const navs = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];

connect(MONGO_URL, (err) => {
  if (err) {
    debug(err);
  } else {
    debug('Database connected successfully');
  }
});
const bookSchema = new Schema({
  title: String,
  genre: String,
  author: String,
  read: Boolean,
});
const Book = model('Book', bookSchema);

const adminRouter = require('./src/routes/adminRoutes')(navs, Book);
const bookRouter = require('./src/routes/bookRoutes')(navs, Book);

app.use('/admin', adminRouter);
app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render('index', {
    navs,
    title: 'Library',
  });
});

app.listen(PORT || 4000, () => {
  debug(`Server is running on port ${chalk.green(PORT || 4000)}`);
});
