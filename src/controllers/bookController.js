const Book = require('../model/book');
const debug = require('debug')('app:bookController');

function bookController(navs) {
  function getIndex(req, res) {
    Book.find((err, foundBooks) => {
      if (err) {
        debug(err);
      } else {
        res.render('bookListView', {
          navs,
          title: 'Library',
          books: foundBooks,
        });
      }
    });
  }
  function getById(req, res) {
    const { bookId } = req.params;
    Book.findById(bookId, (err, foundBook) => {
      if (err) {
        debug(err);
      } else {
        res.render('bookView', {
          navs,
          title: 'Library',
          book: foundBook,
        });
      }
    });
  }
  function middlewares(req, res, next) {
    //   if (req.user) {
    //     next();
    //   } else {
    //     res.redirect('/');
    //   }
    next();
  }
  return { getIndex, getById, middlewares };
}

module.exports = bookController;
