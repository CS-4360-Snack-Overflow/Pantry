// Import dependencies
require('dotenv').config();
const express = require('express');
const testRoutes = require('./routes/testroutes')
const indexRoutes = require('./routes')

// Express app
const app = express();

// Middleware //
// If request has data, parse and attach
app.use(express.json())
// Log all requests in the console
app.use((request, response, next) => {
	console.log(`Request recieved: Path = ${request.path}, Command = ${request.method}`);
	next();
});


// Handle test requests
app.use('/test/', testRoutes);
// Handle root requests
app.use(indexRoutes);

// Listen for requests
app.listen(process.env.PORT, () => {
	console.log(`listening on port ${process.env.PORT}`);
});