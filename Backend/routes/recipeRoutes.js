/**
 * @fileoverview router module that handles requests related to recipes.
 * @module routes/recipeRoutes
 * @author Snack Overflow
 */

 const express = require('express');
 const recipeController = require('../controllers/recipeController');
 const router = express.Router();
 const multer = require('multer');
 const upload = multer({dest: "../../Frontend/public/recipeimages/"});
 
 // Route for getting all recipes
 router.get('/', recipeController.recipe_index);
 
 // Route for creating a new recipe
 router.post('/create', recipeController.recipe_create_post);
 
 // Route for getting all recipes created by the user
 router.get('/created', recipeController.recipe_get_created);

 router.get('/favorited', recipeController.recipe_get_favorited);

 router.post('/upload', upload.single('files'), recipeController.recipe_upload_image);
 
 // Route for getting details of a specific recipe
 router.get('/:id', recipeController.recipe_details);
 
 // Route for deleting a recipe
 router.delete('/:id', recipeController.recipe_delete);
 
 // Route for updating a recipe
 router.patch('/:id', recipeController.recipe_patch);
 
 // Route for uploading an image for a recipe
 router.post('/upload', upload.single('files'), recipeController.recipe_upload_image);
 
 module.exports = router;