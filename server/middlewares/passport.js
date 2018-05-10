const passport = require('passport');
const config = require('../config.js');
const { verifyUser } = require('../auth.js');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  return verifyUser(email)
    .then((validUser) => {
      if (validUser === null) {
        done(null, false);
      } else {
        bcrypt.compare(password, validUser.password)
          .then((validPassword) => {
            if (validPassword) {
              return done(null, validUser);
            }
            return done(null, false);
          })
          .catch((err) => done(err, false));
      }
    });
});

passport.use(localLogin);
