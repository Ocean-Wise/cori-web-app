const jwt = require('jwt-simple');
const config = require('./config');
const { createUser } = require('./auth');
const bcrypt = require('bcrypt');

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;
  const saltRounds = 12;

  if (!email || !password) {
    res.status(422).send({ error: 'You must provide an email and a password.' });
  }

  bcrypt.hash(password, saltRounds)
    .then((hash) => { // eslint-disable-line
      return createUser(name, email, hash)
        .then((newUser) => {
          res.json({ success: 'true' });
        })
        .catch(() => {
          res.json({ error: 'Error saving user to database.' });
        });
    })
    .catch((err) => { // eslint-disable-line
      return next(err);
    });
};

module.exports = { signUp };
