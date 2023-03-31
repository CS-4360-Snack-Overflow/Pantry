const Recipe = require('../models/recipe');
const escapeRegExp = require('escape-string-regexp');
const fs = require("fs");
const path = require('path');
require('dotenv').config();

const recipe_index = (req, res) => {
    const retrieveRecipes = (ingredients, filter) => {
        let recipes;
        if(!ingredients){
            recipes = Recipe.find();
        }
        else if(typeof(ingredients) === "string") {
            recipes = Recipe.find({ingredients:RegExp(ingredients)})
        }
        else {
            let regexp = [];
            for(let i = 0; i < ingredients.length; i++) {
                regexp.push({ingredients: RegExp(ingredients[i])})
            }
            console.log(regexp)
            recipes = Recipe.find({$and : regexp});
        }
        switch(filter){
        case "Popular":
            recipes = recipes.sort({total_reviews: -1});
        case "Recent":
            recipes = recipes.sort({createdAt: -1});
        case "Highly Rated":
            recipes = recipes.sort({review: -1});
        default:
            recipes = recipes.sort({name: 1});
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
    recipe.save().catch((err) => {console.log(err)})
    return res.json({recipeId: recipe._id, redirect: '/recipes'})
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
const recipe_upload_image = (req, res) => {
    const pathString = process.env.RECIPE_IM_PATH + req.file.originalname
    const newPath = path.join(__dirname, "../../"+pathString)
    fs.rename(req.file.path, newPath, err => {console.log(err)});
    return res.json({"path": pathString})
}
 

module.exports = {
    recipe_index,
    recipe_details,
    recipe_create_get,
    recipe_create_post,
    recipe_delete,
    recipe_patch, 
    recipe_upload_image
};