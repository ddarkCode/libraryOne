const express = require('express');

const bookController = require('../controllers/bookController');

function router(navs) {
  const bookRouter = express.Router();
  const { getIndex, getById, middlewares } = bookController(navs);

  bookRouter.use(middlewares);
  bookRouter.route('/').get(getIndex);

  bookRouter.route('/:bookId').get(getById);

  return bookRouter;
}

module.exports = router;
