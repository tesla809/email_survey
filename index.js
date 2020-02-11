const express = require('express');  // commonJS modules
const { passportConfig } = require('./services/passport');  // use passportJS config in index.js. Not returning anything, just needs to be executed. No need to assign it to anything, only execute with require().
const authRoutes = require('./routes/authRoutes');

const app = express();

app.get('/', (req, res) => {
  res.send('Home page');
});

passportConfig(); // config passport OAuth- Google
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;  // dynamic port binding for Heroku. Heroku injects enviroment variables to app via some runtime configuration. Or use Port 5000 if no .env exists 
app.listen(PORT);  // port listening for incoming requests -> localhost:5000 
