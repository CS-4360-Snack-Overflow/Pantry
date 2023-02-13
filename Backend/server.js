// there are routes in this folder, but none of the routes are been implemented, do it later.
// add the databse object from that other file
// then create teh ATLAS credential file, locally don't post
// then implement CRUD for dgiri12db/recipes
//
const express = require('express');
const app = express();

// site for learning about routes is follows:
// https://www.freecodecamp.org/news/building-a-simple-crud-application-with-express-and-mongodb-63f80f3eb1cd/

// this is a route in express
app.get('/',(req,res) => {
	res.sendFile('/Users/diptanshugiri1/On\ This\ Mac/github/Team-Project/backend/index.html');
});

// this is also a route in express
app.get('/route1',(req,res) => {
	res.send("Welp! Looks like you activated a route bruv!")});

app.listen(4000, ()=>{
	console.log("Listening to port 4000");
});

