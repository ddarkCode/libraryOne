const passport = require('passport');

const User = require('../model/user');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    // User.findById(user.id, function (err, user) {
    //   done(err, user);
    // });
    done(null, user);
  });

  require('./strategies/localStrategy');
};
