require('dotenv').config();
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const { connect } = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const app = express();
const { PORT, MONGO_URL, SESSION_SECRET } = process.env;

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true })
);

require('./src/config/passport.js')(app);

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

const adminRouter = require('./src/routes/adminRoutes')(navs);
const bookRouter = require('./src/routes/bookRoutes')(navs);
const authRouter = require('./src/routes/authRoutes')(navs);

app.use('/admin', adminRouter);
app.use('/books', bookRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index', {
    navs,
    title: 'Library',
  });
});

app.listen(PORT || 4000, () => {
  debug(`Server is running on port ${chalk.green(PORT || 4000)}`);
});
