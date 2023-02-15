const express = require('express');
const recipeController = require('../controllers/recipeController');
const router = express.Router();

router.get('/', recipeController.recipe_index);

router.post('/', recipeController.recipe_create_post);

router.get('/create', recipeController.recipe_create_get);

router.get('/:id', recipeController.recipe_details);

router.delete('/:id', recipeController.recipe_delete);

module.exports = router;