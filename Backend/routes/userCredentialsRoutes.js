const express = require('express');
const router = express.Router();
const User = require('../models/userCredentials');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = new User({
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
      username: req.body.username,
      password: req.body.password,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      countryRegion: req.body.countryRegion
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

