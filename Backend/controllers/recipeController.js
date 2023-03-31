const Recipe = require('../models/recipe');
const escapeRegExp = require('escape-string-regexp')

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
    const recipe = new Recipe({
        name: req.body.name,
        video_url: req.body.video_url,
        poster_image_url: req.body.poster_image_url,
        alt_image_url: req.body.alt_image.url,
        num_servings: req.body.num_servings,
        prep_time: req.body.prep_time,
        credits: req.body.credits,
        cook_time: req.body.cook_time,
        description: req.body.description,
        nutrition: {
            protein: req.body.protein,
            fat: req.body.fat,
            calories: req.body.calories,
            sugar: req.body.sugar,
            carbohydrates: req.body.carbohydrates,
            fiber: req.body.fiber
        },
        user_ratings: {
            count_positive: 0,
            count_negative: 0
        },
        review: (((recipe.user_ratings.count_positive)/(recipe.user_ratings.count_positive + recipe.user_ratings.count_negative)) * 5).toFixed(1),
        tags: req.body.tags,
        ingredients: req.body.ingredients,
        instructions: req.bodyinstructions,
        user_num: req.session.userId
    });
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