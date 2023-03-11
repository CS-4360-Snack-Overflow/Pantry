// Import dependencies
require('dotenv').config();
const express = require('express');
const testRoutes = require('./routes/testroutes');
const recipeRoutes = require('./routes/recipeRoutes');
const morgan = require('morgan');
const mongoose = require('mongoose');
const {connectDB} = require('./dbconnector')

// Express app instance
const app = express();

//connect to db
connectDB()
app.listen(process.env.PORT);
//some req data to console
app.use(morgan('dev'));

//lets server see front-end data 
app.use(express.urlencoded({ extended: true}));
app.use(express.json())
// Handle test requests
app.use('/test/', testRoutes);
// redirect from local to /recipes
app.get('/', (req,res) => {
	res.redirect('/recipes');
});

app.use('/recipes', recipeRoutes);
