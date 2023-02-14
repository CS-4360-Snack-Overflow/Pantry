// I would like to change name of this file to recipe routes. Is there any testing side changes I should mk 

const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();

router.get('/', (req,res) => {
    Recipe.find().sort({createdAt: -1}).then((result) => {
        res.render('index', {title: 'All Recipes', recipes: result})
    })
    .catch((err) => {
        console.log(err)
    });
});

router.post('/', (req,res) => {
    const recipe = new Recipe(req.body);
    console.log(req.body)
    recipe.save((err) => {
        console.log(res.statusCode)
        if (err) return handleError(err);
    })
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'create' });
});



module.exports = router;