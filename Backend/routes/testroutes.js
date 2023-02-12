const express = require('express');

router = express.Router();

// GET all test objects
router.get('/', (request, response) => {
	response.json({
		mssg: 'GET all test objects',
		status: 200
	});
});

// GET a single test object
router.get('/:id', (request, response) => {
	response.json({
		mssg: `GET single test object`,
		status: 200
	});
});

// POST a new test object
router.post('/', (request, response) => {
	const {testMsg} = request.body;
	response.status(201).json({
		mssg: `POST new test object`
	});
});

// DELETE a test object
router.delete('/:id', (request, response) => {
	response.json({
		mssg: `DELETE a test object`,
		status: 200
	});
});

// UPDATE a test object
router.patch('/:id', (request, response) => {
	response.json({
		mssg: `UPDATE a test object`,
		status: 200
	});
});

module.exports = router;