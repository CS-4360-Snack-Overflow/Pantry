//.env file reader package
require('dotenv').config({path: './.env'})

// import express
const express = require('express');

//import body-parser
const bodyParser = require('body-parser');
const app = express();

//url encoded extracts info from the POST
app.use(bodyParser.urlencoded({extended: true}));

//to have relative paths instead of absolute paths
const path = require('path');
//give path for backend folder
const options = {root: path.join(__dirname, "../backend")};

//mongoDB middleware
const MongoClient = require('mongodb').MongoClient;
const connectionString = process.env.ATLAS_URI;
//connect to MongoClient
var db;
MongoClient.connect(connectionString, (err, database) => {
	if (err) return console.log(err);
	db = database; // get reference to the DB
	console.log("Database connection successful");
	database.close();
});

//'/' route for GET
app.get('/',(req,res) => {
	res.sendFile('index.html', options); //options is just making relative path for us.
});

//'route1' route for GET
app.get('/route1',(req,res) => {
	res.send("Welp! Looks like you activated a route bruv!")});

// a POST route called 'routepost'
app.post('/routepost', (req, res) => {
	console.log(req.body); //receive data from POST
	res.sendFile('index.html', options);
});


//implementing POST crud to MongoDB

//this is Create function
app.post('/crudpost', (req, res) => {
	db.collection('recipes').save(req.body, (err, result) => { 
		if (err) return console.log(err)
	});
	// here goes another method
	console.log('saved to database');
	res.redirect('/');
});

//this is Read function
app.get('/readDB', (req, res) => {
	var cursor = db.collection('recipes').find()
	.toArray(function (err, results) {
		console.log(results);
	}
	);
});
//toArray() function retrieves data from MongoDB.

app.listen(4000, ()=>{
	console.log("Listening to port 4000");
});
