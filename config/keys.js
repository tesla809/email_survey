// keys.js - figure out what set of credentials to return
// prod or dev

module.exports =  process.env.NODE_ENV === 'production'
  ? require('./prod') // if production, return prod keys
  : require('./dev'); // if dev, return dev keys