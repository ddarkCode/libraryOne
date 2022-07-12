const express = require('express');
const passport = require('passport');
const debug = require('debug')('app:authRoutes');

const User = require('../model/user');

const authRouter = express.Router();

function router(navs) {
  authRouter.route('/sign-up').post((req, res) => {
    const { username, password } = req.body;
    const newUser = new User({
      username,
      password,
    });

    newUser.save((err, savedUser) => {
      if (err) {
        debug(err);
      } else {
        req.login(savedUser, (err) => {
          if (err) {
            res.json(err);
          } else {
            res.redirect('/auth/profile');
          }
        });
      }
    });
  });
  authRouter
    .route('/sign-in')
    .get((req, res) => {
      res.render('signin', {
        navs,
        title: 'Sign In',
      });
    })
    .post(
      passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/',
      })
    );
  authRouter
    .route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
