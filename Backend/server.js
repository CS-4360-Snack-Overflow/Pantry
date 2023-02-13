// there are routes in this folder, but none of the routes are been implemented, do it later.
// add the databse object from that other file
// then create teh ATLAS credential file, locally don't post
// then implement CRUD for dgiri12db/recipes
//
const express = require('express');
//this is where body parser is added, need to add it before CRUD functions
const bodyParser = require('body-parser');
const app = express();

// the urlencoded extracts info from the POST and sends it to the request object
app.use(bodyParser.urlencoded({extended: true}));

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

