const Recipe = require('../models/recipe');

const recipe_index = (req, res) => {
    Recipe.find().sort({createdAt: -1}).then((result) => {
        // render from front-end here, (e.g)
        //res.render('index', {title: 'All Recipes', recipes: result})
    })
    .catch((err) => {
        console.log(err)
    });
};
const recipe_details = (req, res) => {
    const id = req.params.id;
    Recipe.findById(id)
    .then((result) => {
        console.log(result);
        //render from front-end here. (e.g)
        //res.render('details', {recipe: result, title: 'Details'});
    }).catch((err) => {
        console.log(err);
    });
};
const recipe_create_get = (req, res) => {
    //render from front-end here
    //res.render('create', { title: 'create' });
};
const recipe_create_post = (req, res) => {
    //the submit form will redirect here from html file
    const recipe = new Recipe(req.body);
    recipe.save()
    .then((result) => {
        res.redirect('/recipes')
    })
    .catch((err) => {console.log(err)})
};
const recipe_delete = (req, res) => {
    const id = req.params.id;
    Recipe.findByIdAndDelete(id)
    .then((result) => {
        //ajax request from browser, js not web form, so no redirect
        //send back json to browser
        res.json({ redirect: '/recipes'});
    })
    .catch((err) => {
        console.log(err)
    });
};
const recipe_patch = (req, res) => {
    //still need this
};

module.exports = {
    recipe_index,
    recipe_details,
    recipe_create_get,
    recipe_create_post,
    recipe_delete,
    recipe_patch
};