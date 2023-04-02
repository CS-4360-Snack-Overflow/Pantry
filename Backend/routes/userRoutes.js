const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const recipeController = require('../controllers/recipeController');

// function to protect routes that require authentication
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};


//function to login user
async function loginUser(credentials, session) {
  const { username, password } = credentials;
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect){
    throw new Error('Invalid credentials');
  }

  session.userId = user._id;
}

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
      profilePicture: req.body.profilePicture,
      bio: req.body.bio,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      countryRegion: req.body.countryRegion
    });
    const savedUser = await user.save();
    //res.status(201).json(savedUser);
    await loginUser(req.body, req.session);
    res.redirect('/'); //might wanna direct users to profile page later

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//TODO: this route is accessed from the signup.html. after user is created, automatically log him in, then direct them to their user profile page.

// Get all users
router.get('/userRead', requireAuth, async (req, res) => {
  console.log("message: Accessed userRead route");
  try {
    console.log(session.userId)
    const user = await User.findById(req.session.userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// need to make update and create seperate routes instead
// update route
router.post('/userUpdate', async (req, res) => {
  try {

    // first access the username attribute from the model
    const username = req.body.username;
    const updates = req.body;
    const updatedFields = {};

    //check which fields are updated
    for (const field in updates) {
      if (field != 'username' && updates[field]) {
	updatedFields[field] = updates[field];
      }
    }

    const updatedUser = await User.findOneAndUpdate({ username }, updatedFields, { new: true});

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
  try{
    await loginUser(req.body, req.session);
    res.redirect('/');
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/testAuth', requireAuth, async (req, res) => {
  res.json({active:true});
});


// even logging out runs 'requireAuth' function, so if this route is accessed, you get sent to login page
router.get('/logout', requireAuth, async (req, res) => {
  req.session.destroy(function(err) {
    // express-session is linked to connect-mongo, so when this session.destroy() function is executed, it deletes the relevant entry from mongodb, and that signals the end of session
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
});

//router.post('/recipe_create', recipeController.recipe_create_post);


module.exports = router;

