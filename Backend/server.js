// Import dependencies
require('dotenv').config();
const express = require('express');
const testRoutes = require('./routes/testroutes');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Express app instance
const app = express();

//connect to db
mongoose.connect(process.env.MONGO_URI, { //remember to change it back to MONGO_URI in two places 
	useNewUrlParser: true, 
	useUnifiedTopology: true
})
.then((result) => {app.listen(process.env.PORT)})
.catch( (err) => {console.log(err)});

//some req data to console
app.use(morgan('dev'));

//lets server see front-end data 
app.use(express.urlencoded({ extended: true}));
app.use(express.json())

//set the session middleware up
//first make mongoStore instance
 
const store = MongoStore.create({ //'MongoStore' needs to be capital just like that, for some reason
  mongoUrl: process.env.MONGO_URI,
  /* ttl: 14 * 24 * 60 * 60, //session will expire in 14 days*/
  ttl: 10 * 60, //session will expire in 10 minutes
});

// now pass the connect-mongo object into the express-session object
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
  store: store,
}));

// Handle test requests
app.use('/test/', testRoutes);

// redirect from local to /recipes
/*app.get('/', (req,res) => {
	res.redirect('/recipes');
});*/

app.get('/', (req,res) => {
	res.sendFile('./index.html', { root: __dirname });
});
// route to display login page
app.get('/login', (req, res) => {
  if (!req.session.userId){ // if user is already logged in, redirect to '/'
    res.sendFile('./login.html', { root: __dirname } );
  } else {
    res.redirect('/');
  }

});
// this route isn't inside userRoutes.js because login.html is in root folder

app.get('/user-id', (req, res) => {
  res.json({ userId: req.session.userId });
});

app.get('/signup', (req, res) => {
  res.sendFile('./signup.html', { root: __dirname } );
  });

//this is here because any route that uses sendFile doesn't work unless it is in a file that is in root directory
app.get('/getProPic', (req, res) => {
  res.sendFile('./sample1.png', { root: __dirname});
});

app.use('/recipes', recipeRoutes);
app.use('/user', userRoutes);
