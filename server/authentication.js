const express = require('express');
const passport = require('passport');

const authenticationProvider = require('./authProvider');

const requireSignIn = passport.authenticate('local', { session: false });

const router = express.Router();

router.get('/sign-up', (req, res) => {
  res.render = 'authentication/sign-up';
});

router.post('/sign-up', authenticationProvider.signUp);

// router.get('/sign-in', (req, res) => {
//   res.render('authentication/sign-in');
// });
//
// router.post('/sign-in', requireSignIn, authenticationProvider.signIn);

module.exports = router;
