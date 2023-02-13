//env files are containers for environment variables
//the dotenv package via npm can help with importing those vars into source code
//include the package then run config() init function
require('dotenv').config({path:'/Users/diptanshugiri1/On\ This\ Mac/github/Team-Project/config.env'});
// path needed to be defined explicitly, later during server deploymment to webhost, this path needs to be obscured somehow.

const express = require('express');
//this is where body parser is added, need to add it before CRUD functions
const bodyParser = require('body-parser');
const app = express();

// the urlencoded extracts info from the POST and sends it to the request object
app.use(bodyParser.urlencoded({extended: true}));

//mongoDB middleware
const MongoClient = require('mongodb').MongoClient;
const connectionString = process.env.ATLAS_URI;
//connect to MongoClient
var db;
MongoClient.connect(connectionString, (err, database) => {
	if (err) return console.log(err);
	db = database;
	//app.listen is now inside mongodb connect function,
	//so that only start running server when database is connected.
	app.listen(4000, ()=>{
		console.log("Listening to port 4000");
	});
});

// site for learning about routes is follows:
// https://www.freecodecamp.org/news/building-a-simple-crud-application-with-express-and-mongodb-63f80f3eb1cd/

// this is a route in express
app.get('/',(req,res) => {
	res.sendFile('/Users/diptanshugiri1/On\ This\ Mac/github/Team-Project/backend/index.html');
});

// this is also a route in express
app.get('/route1',(req,res) => {
	res.send("Welp! Looks like you activated a route bruv!")});

//the following code responds to POST from client
app.post('/routepost', (req, res) => {
	console.log(req.body)
	res.sendFile('/Users/diptanshugiri1/On\ This\ Mac/github/Team-Project/backend/index.html');
	// there is a sendFile because client freezes after sending POST, sendFile will refresh their page and also give them an empty form

});

//so now Express listens to POST and req.body gives us data
//now what's left is send this data to MongoDB with MongoDB Querying Langauge or something




app.listen(4000, ()=>{
	console.log("Listening to port 4000");
});

