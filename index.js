const express = require('express');  // commonJS modules
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;  // we only want .Strategy from module
const keys = require('./config/keys.js');

const app = express();

app.get('/', (req, res) => {
  res.send('Home page')
});

passport.use(new GoogleStrategy({  // passport is middleware that helps express with OAth- signing in via third parties to an app. 
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'  // route that google sends users to after users gives ok to let app access info. Google gives access token/code to redeemed for access.
  }, (accessToken, refreshToken, profile, done) => {  // in this callback, we can create new user in database
    console.log('accessToken: ', accessToken);  // when code from google's servers is exchanged for a user's profile (or any info), we get back an access token. Access token allows us to re-access a user's info after being granted permission by user. This permssion can be removed by user.
    console.log('refreshToken: ', refreshToken);  // refresh token allows us to refresh access token. Access token expires after some amount of time. Optionally, we can be given a refresh token 
    console.log('profile: ', profile);
  })
);  // passport to use new instance of code for Google OAuth

app.get('/auth/google',  // route to handle google auth
  passport.authenticate('google', {  //  use google strategy aka authentication helper code. Passport strategy has an internal identifer called 'google'
    scope: ['profile', 'email']  // scope tells google what access we want to have: profile and email.
  })
);

app.get('/auth/google/callback', // code (inside returned url) sent back by google, to give app permission to data, is handled by passport. Make sure that callback address is whitelisted on google's OAuth service
  passport.authenticate('google')
);



const PORT = process.env.PORT || 5000;  // dynamic port binding for Heroku. Heroku injects enviroment variables to app via some runtime configuration. Or use Port 5000 if no .env exists 
app.listen(PORT);  // port listening for incoming requests -> localhost:5000 
