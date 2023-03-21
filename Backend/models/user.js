const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  profilePicture: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  phoneNumber: {
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

// modify the save function and the findOneAndUpdate function of 'User' model, so that password can be saved in a hashed form using 'bcrypt'
userSchema.pre('save', async function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // generate a salt with a complexity of 10
    const salt = await bcrypt.genSalt(10);
    // hash the password with the salt
    const hash = await bcrypt.hash(this.password, salt);
    // replace the plaintext password with the hash
    this.password = hash;
    next();
  }
  catch (error) {
    next(error);
  }
});
//findOneAndUpdate

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;

