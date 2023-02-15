// Import dependencies
require('dotenv').config();
const express = require('express');
const testRoutes = require('./routes/testroutes');
const recipeRoutes = require('./routes/recipeRoutes');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")

// Express app instance
const app = express();

//connect to db
mongoose.connect(process.env.MONGO_URI, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true
})
.then((result) => {app.listen(process.env.PORT)})
.catch( (err) => {console.log(err)});

//some req data to console
app.use(morgan('dev'));

//lets server see front-end data 
app.use(express.urlencoded({ extended: true}));

// Handle test requests
app.use('/test/', testRoutes);
// redirect from local to /recipes
app.get('/', (req,res) => {
	res.redirect('/recipes');
});

app.use('/recipe', recipeRoutes);
