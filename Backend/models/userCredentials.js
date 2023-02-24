const mongoose = require('mongoose');

// Define the user schema using the Mongoose.Schema constructor
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  countryRegion: {
    type: String,
    required: true
  }
}, {timestamps: true});

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;

