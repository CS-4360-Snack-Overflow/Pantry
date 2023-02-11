const express = require('express');

router = express.Router();

// GET all test objects
router.get('/', (request, response) => {
	response.json({mssg: 'GET all test objects'});
});

// GET a single test object
router.get('/:id', (request, response) => {
	response.json({mssg: `GET single test object`});
});

// POST a new test object
router.post('/', (request, response) => {
	response.json({mssg: `POST new test object`});
});

// DELETE a test object
router.delete('/:id', (request, response) => {
	response.json({mssg: `DELETE a test object`});
});

// UPDATE a test object
router.patch('/:id', (request, response) => {
	response.json({mssg: `UPDATE a test object`});
});

module.exports = router;