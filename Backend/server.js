// Import dependencies
require('dotenv').config();
const express = require('express');
const testRoutes = require('./routes/testroutes');
const recipeRoutes = require('./routes/recipeRoutes');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")

// Express app
const app = express();

mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGO_URI;

main().catch(err => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
	app.listen(process.env.PORT);
	console.log("Connected to MongoDB via Mongoose");
}

/* mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then((result) => {app.listen(process.env.PORT)})
.catch( (err) => {console.log(err)});
*/


const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
	a_string: String,
	a_date: Date,
});

const SomeModel = mongoose.model("SomeModel", SomeModelSchema);

const instance01 = new SomeModel({ name: "awesome" });

instance01.save((err) => {
	if (err) return handleError(err);
	//saved
});




//some req data to console
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
// Handle test requests
app.use('/test/', testRoutes);
// Handle root requests
app.use('/recipes', recipeRoutes);
