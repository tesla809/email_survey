const mongoose = require('mongoose');
const { Schema } = mongoose;  // pulls Schema property off mongoose.

const UserSchema = new Schema({  // Schema-> singular.
  googleId: String,  // Mongoose also wants to know all of a collection's properties
  name: {
    firstName: String,
    lastName: String
  },
  imageURL: String,
  createdAt: Date
});

const Users = mongoose.model('User', UserSchema);  // Create new collection called users. mongoose pluralizes it for us in the background to users collection