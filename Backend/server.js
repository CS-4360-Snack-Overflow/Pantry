// Import dependencies
require('dotenv').config();
const express = require('express');
const testRoutes = require('./routes/testroutes');
const recipeRoutes = require('./routes/recipeRoutes');
const morgan = require('morgan');
const mongoose = require('mongoose');


// Express app
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

// Handle test requests
app.use('/test/', testRoutes);
// Handle root requests
app.use('/recipe', recipeRoutes);
