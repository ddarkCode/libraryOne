const express = require('express');
const debug = require('debug')('app:authRoutes');

const User = require('../model/user');

const authRouter = express.Router();

function router() {
  authRouter.route('/sign-up').post((req, res) => {
    debug(req.body);
    req.login(req.body, (err) => {
      if (err) {
        res.json(err);
      } else {
        res.redirect('/auth/profile');
      }
    });
  });

  authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
  });
  return authRouter;
}

module.exports = router;
