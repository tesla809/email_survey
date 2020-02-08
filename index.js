const express = require('express');  // commonJS modules
const app = express();

app.get('/', (req, res) => {  // express route handler
  res.send({ hi: 'there' });
}); 


const PORT = process.env.PORT || 5000;  // dynamic port binding for Heroku. Heroku injects enviroment variables to app via some runtime configuration. Or use Port 5000 if no .env exists 
app.listen(PORT);  // port listening for incoming requests -> localhost:5000 
