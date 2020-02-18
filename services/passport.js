const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;  // we only want .Strategy from module
const keys = require('../config/keys.js');  // clientID and ClientSecret

const mongoose = require('mongoose');  // loaded like this to avoid confusing mongoose and having errors
const User = mongoose.model('User');  // already loaded into mongoose in User.js, so we can access it.

const saveToDatabase = (accessToken, refreshToken, profile, done) => {  // in this callback, we can create new user in database
  User.findOne({ googleId: profile.id }) // query to see if googleId matches profileId. If no, create.
    .then(existingUser => {
      if (existingUser) {  // if exisitingUser exist.
        console.log('record exists, do nothing');
      } else {
        new User({ googleId: profile.id }).save();  // save our ID into our database -> ourId: google's id
        console.log(`${profile.id} SAVED`);
      }
    });
};

const passportConfig = () => {
  passport.use(new GoogleStrategy({  // passport is middleware that helps express with OAth- signing in via third parties to an app. 
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'  // route that google sends users to after users gives ok to let app access info. Google gives access token/code to redeemed for access.
  }, saveToDatabase));  // passport to use new instance of code for Google OAuth  
};

module.exports = {
  passportConfig
};