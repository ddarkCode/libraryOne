const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../../model/user');
const debug = require('debug')('app:localStrategy');

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        (async function findUser() {
          try {
            const user = await User.findOne({ username });
            if (user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (err) {
            debug(err);
          }
        })();
      }
    )
  );
};
