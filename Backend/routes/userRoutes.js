const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/userCreate', async (req, res) => {
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
router.get('/userRead', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// user search route
router.get('/userSearch', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.query.username });
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: "User not found" });
		}
	}catch (err) {
		res.status(500).json({message: err.message});
	}
});

//user update
router.put('/userUpdate', async (req, res) => {
	try {
		const username = req.query.username;
		const updates = req.body;

		const updatedUser = await User.findOneAndUpdate({ username }, updates, { new: true
		});

		if (updatedUser) {
			res.json(updatesUser);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;

