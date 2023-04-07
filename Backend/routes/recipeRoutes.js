const express = require('express');
const recipeController = require('../controllers/recipeController');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: "../../Frontend/public/recipeimages/"});

router.get('/', recipeController.recipe_index);

router.post('/create', recipeController.recipe_create_post);

router.get('/create', recipeController.recipe_create_get);

router.get('/:id', recipeController.recipe_details);

router.delete('/:id', recipeController.recipe_delete);

router.patch('/:id', recipeController.recipe_patch);

router.post('/upload', upload.single('files'), recipeController.recipe_upload_image);

module.exports = router;