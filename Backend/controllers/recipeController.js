const Recipe = require('../models/recipe');
const escapeStringRegexp = require('escape-string-regexp');

const recipe_index = (req, res) => {
    const retrieveRecipes = (ingredients, filter) => {
        let regex = []
        let recipes;
        if(!ingredients){
            recipes = Recipe.find();
        }
        else {
            ingredients.map((ingredient) => {
                regex.push({"ingredients": escapeStringRegexp(ingredient)});
            })
        }
        switch(filter){
        case "Popular":
            recipes = Recipe.aggregate()
            .match({$or: regex})
            .group({review: {$divide: [user_ratings.count_positive, user_ratings.count_negative]}});
        case "Recent":
            recipes = Recipe.find({$or: regex}).sort({createdAt: -1});
        default:
            recipes = Recipe.find({$or: regex}).sort({name: 1});
        }
        return recipes
    }
    retrieveRecipes(req.query.ingredients, req.query.filter).then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
};
const recipe_details = (req, res) => {
    const id = req.params.id;
    Recipe.findById(id)
    .then((result) => {
        res.send(result);
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
    Recipe.findByIdAndRemove({_id: id})
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
    const id = req.params.id;
    Recipe.findOneAndUpdate({_id: id}, req.body, {new: true})
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err)
    });
};

module.exports = {
    recipe_index,
    recipe_details,
    recipe_create_get,
    recipe_create_post,
    recipe_delete,
    recipe_patch
};