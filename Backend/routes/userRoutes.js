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
		// check here if the above username exists, if so only update, don't create new entry

		// first access the username attribute from the model
		const username = user.username;
		console.log(`user.username=${username}`);
		const updates = req.body;

		const updatedUser = await User.findOneAndUpdate({ username }, updates, { new: true});

		// if update was successful, there's that
		// if not, create new user instead
		if (updatedUser) {
			res.json(updatedUser);
		} else {
			const savedUser = await user.save();
			res.status(201).json(savedUser);
		}

	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Get all users
router.get('/userRead', async (req, res) => {
	console.log("message: Accessed userRead route");
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

// delete function for user remains

module.exports = router;

