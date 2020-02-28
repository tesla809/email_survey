const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;  // we only want .Strategy from module
const keys = require('../config/keys.js');  // clientID and ClientSecret

const mongoose = require('mongoose');  // loaded like this to avoid confusing mongoose and having errors
const User = mongoose.model('User');  // already loaded into mongoose in User.js, so we can access it.

passport.serializeUser((user, done) => {  // create cookie from user model
  done(null, user.id);  // user.id is primary key made by mongoDB, not profile.id. Ids unique user in database. After user signs in we only care about database id. Google id is for auth flow only.
});

passport.deserializeUser(async (id, done) => {  // turn cookie to mongoose model user instance
  const findUser = await User.findById(id)  // find user by id
  done(null, findUser);  // done() is passportJS middleware to tell it to move to next step in auth. null is passed in as an error handler
});

const saveToDatabase = async (accessToken, refreshToken, profile, done) => {  // in this callback, we can create new user in database
  const existingUser = await User.findOne({ googleId: profile.id }) // query to see if googleId matches profileId. If no, create.
  if (existingUser) {  // if exisitingUser exist, don't add them again.
    console.log(`${existingUser} User exists already`)
    return done(null, existingUser); // done(err, userRecord)tell passportJS -> finished, proceed w/ auth flow, no error, here is user.
  } 

  const newUser = await new User({ googleId: profile.id }).save()  // if not above, else do this: user info  we send to database and save our ID into our database -> ourId: google's id
  console.log(`${profile.id} SAVED`);
  done(null, newUser);  // userInfo database sends back to us. Might have more info, including the primary key that MongoDB adds to each new record.
};

const passportConfig = () => {
  passport.use(new GoogleStrategy({  // passport is middleware that helps express with OAth- signing in via third parties to an app. 
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',  // route that google sends users to after users gives ok to let app access info. Google gives access token/code to redeemed for access.
    proxy: true // fixes issues with Passport trusting Heroku's proxy load balancing server, and how it's Google Strategy appends protocol (http vs https). We could have also added key to dev/prod keys with hardcoded address 
  }, saveToDatabase));  // passport to use new instance of code for Google OAuth  
};

module.exports = {
  passportConfig
};