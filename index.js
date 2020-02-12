const express = require('express');  // commonJS modules
const mongoose = require('mongoose');
const { passportConfig } = require('./services/passport');  // use passportJS config in index.js. Not returning anything, just needs to be executed. No need to assign it to anything, only execute with require().
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');

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

// routes
app.get('/', (req, res) => {  // root route
  res.send('Home page');
});

passportConfig(); // config passport OAuth- Google
app.use('/auth', authRoutes);

// set up ports
const PORT = process.env.PORT || 5000;  // dynamic port binding for Heroku. Heroku injects enviroment variables to app via some runtime configuration. Or use Port 5000 if no .env exists 
app.listen(PORT);  // port listening for incoming requests -> localhost:5000 