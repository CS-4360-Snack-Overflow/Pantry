const express = require('express');

router = express.Router();

// GET all root objects
router.get('/', (request, response) => {
	response.json({mssg: 'GET all root objects'});
});

// GET a single root object
router.get('/:id', (request, response) => {
	response.json({mssg: `GET single root object`});
});

// POST a new root object
router.post('/', (request, response) => {
	response.json({mssg: `POST new root object`});
});

// DELETE a root object
router.delete('/:id', (request, response) => {
	response.json({mssg: `DELETE a root object`});
});

// UPDATE a root object
router.patch('/:id', (request, response) => {
	response.json({mssg: `UPDATE a root object`});
});


module.exports = router;