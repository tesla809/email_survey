const express = require('express');
const router = express.Router();  // modularize our routes
const passport = require('passport');  // require the original passportJS module

// auth main entrance.
router.get('/', (req, res) => {
  res.send('Auth routes main. Go to .../auth/google');
});

// google auth. Note that if /auth is used in index.js, its kicked over here to use
router.get('/google',  // route to handle google auth
  passport.authenticate('google', {  //  use google strategy aka authentication helper code. Passport strategy has an internal identifer called 'google'
    scope: ['profile', 'email']  // scope tells google what access we want to have: profile and email.
  })
);

router.get('/google/callback', // code (inside returned url) sent back by google, to give app permission to data, is handled by passport. Make sure that callback address is whitelisted on google's OAuth service
  passport.authenticate('google')
);

router.get('/logout', (req, res) => {
  req.logout();  // passport attaches .logout() automatically to req. Kills cookie id.
  res.send(`Goodbye! Signed out! req.user is ${req.user}.`);
});


module.exports = router;