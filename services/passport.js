const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;  // we only want .Strategy from module
const keys = require('../config/keys.js');  // clientID and ClientSecret

const mongoose = require('mongoose');  // loaded like this to avoid confusing mongoose and having errors
const User = mongoose.model('User');  // already loaded into mongoose in User.js, so we can access it.

passport.serializeUser((user, done) => {  // create cookie from user model
  done(null, user.id);  // user.id is primary key made by mongoDB, not profile.id. Ids unique user in database. After user signs in we only care about database id. Google id is for auth flow only.
});

passport.deserializeUser((id, done) => {  // turn cookie to mongoose model user instance
  User.findById(id)  // find user by id
    .then(user => {  // async, so handle promise 
      done(null, user);  // done() is passportJS middleware to tell it to move to next step in auth. null is passed in as an error handler
    })  
});

const saveToDatabase = (accessToken, refreshToken, profile, done) => {  // in this callback, we can create new user in database
  User.findOne({ googleId: profile.id }) // query to see if googleId matches profileId. If no, create.
    .then(existingUser => {
      if (existingUser) {  // if exisitingUser exist, don't add them again.
        done(null, existingUser); // done(err, userRecord)tell passportJS -> finished, proceed w/ auth flow, no error, here is user.
        console.log(`${existingUser}User exists already`)
      } else {
        new User({ googleId: profile.id })  // user info  we send to database
          .save()  // save our ID into our database -> ourId: google's id
          .then(newUser => done(null, newUser));  // userInfo database sends back to us. Might have more info, including the primary key that MongoDB adds to each new record.
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