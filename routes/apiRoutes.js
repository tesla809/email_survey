const express = require('express');
const router = express.Router();  // modularize our routes
const passport = require('passport');  // require the original passportJS module

// main auth entrance.
router.get('/', (req, res) => {
  res.send('API routes main!');
});

router.get('/current_user', (req, res) => {  // If req.user exists, auth works.
  console.log(req.session);  // contains data passport is trying to store in cookie. Cookie-session(extract cookie data) -> assigns to req.session -> inside req.sesson passport key exists -> passport(pull user id out of cookie data) -> deserializeUser(userId to user instance)
  console.log(req.user);  // when we sign in, passportJS adds user to request object.
  res.send(`req.user is: ${req.user}. req.session is ${req.session}`); // send user. Make sure that you sign in with /auth/google first
});

module.exports = router;