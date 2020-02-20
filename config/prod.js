// prod.js- production environment keys
// DO commit to Heroku

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
}

/*
const mongoDB = {
  adminUserName: 'Prod-Brainiac',
  adminPassword: 'Vg321EPMvTJKPmUO'
}

module.exports = {
  googleClientID: '496820388351-vavp0sgaef8cinsteb71sg0p46pac2vh.apps.googleusercontent.com',
  googleClientSecret: 'ZaiBqzk7nBvCjxWPNWOEM2RK',
  mongoURI: `mongodb+srv://${mongoDB.adminUserName}:${mongoDB.adminPassword}@cluster0-fhgyx.mongodb.net/test?retryWrites=true&w=majority`,
  cookieKey: 'zIaotRw9zE3u8zYZRi85kz6glYswE1Wb6KJxnfDKr0l0xOv9pEQN2HHefXJK'  // can be any string of characters
}
*/
