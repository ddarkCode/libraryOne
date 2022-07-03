const express = require('express');
const debug = require('debug')('app:bookRoutes');

function router(navs, Book) {
  const bookRouter = express.Router();

  bookRouter.route('/').get((req, res) => {
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
  });

  bookRouter.route('/:bookId').get((req, res) => {
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
  });

  return bookRouter;
}

module.exports = router;
