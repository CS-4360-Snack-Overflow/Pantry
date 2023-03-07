const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');

// function to protect routes that require authentication
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/user/userLogin');
  }
  next();
};

// Create a new user
// the method="POST" in the html form needs to be capital,
// POST not post
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

// need to make update and create seperate routes instead
// update route
router.post('/userUpdate', async (req, res) => {
  try {

    // first access the username attribute from the model
    const username = req.body.username;
    console.log(`user.username=${username}`);
    const updates = req.body;

    const updatedUser = await User.findOneAndUpdate({ username }, updates, { new: true});

    // if update was successful, there's that
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json( { message: 'User not found' });
    }

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE user by username
router.post('/userDelete', requireAuth, async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ username: req.body.username });
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/userLoginProc', async (req, res) => {
  const { username, password } = req.body;

  //find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    // user not found
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  //check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    // password is incorrect
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  //save the user ID in the session
  req.session.userId = user._id;

  res.redirect('/');
});

router.get('/testAuth', requireAuth, async (req, res) => {
  res.send('Logged in');
});



module.exports = router;

