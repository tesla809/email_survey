const express = require('express');  // commonJS modules
const mongoose = require('mongoose');  // to interact with MongoDB database
const cookieSession = require('cookie-session');  // handles cookies since express doesn't
const passport = require('passport');  // middleware helper to deal with authentication with various providers.
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const keys = require('./config/keys');  // holds our secret keys we don't commit.

// load models first
require('./models/User');

// configure passport- needs to happen after creating model schema
const { passportConfig } = require('./services/passport');  // use passportJS config in index.js. Not returning anything, just needs to be executed. No need to assign it to anything, only execute with require().

// database
const handleDatabaseError = e => console.log(e);

try {  
  mongoose.connect(keys.mongoURI, { // try to connect mongoose to mongoDB atlas server.
    useNewUrlParser: true,
    useUnifiedTopology: true 
  });  // options passed due to deprecation warnings of old url string parser and useUnifiedTopology.
} catch (error) {
  handleDatabaseError(error);
}

const app = express();  // setup server instance

// cookie config and setup with passport
app.use(  // set up cookies
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,  // expiration date in 30 days,
    keys: [keys.cookieKey] // automatic encryption of key for cookie, can use multiple keys in array for security
  })
);

app.use(passport.initialize())  // start passport session?
app.use(passport.session());  // get passport to use cookies?

// routes
app.get('/', (req, res) => {  // root route
  res.send('Home page');
});

passportConfig(); // config passport OAuth- Google
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// set up ports
const PORT = process.env.PORT || 5000;  // dynamic port binding for Heroku. Heroku injects enviroment variables to app via some runtime configuration. Or use Port 5000 if no .env exists 
app.listen(PORT);  // port listening for incoming requests -> localhost:5000 