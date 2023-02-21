const Recipe = require('../models/recipe');

const recipe_index = (req, res) => {
    Recipe.find().sort({createdAt: -1}).then((result) => {
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
    Recipe.findOneAndUpdate({_id: id}, {title: req.body.title, snippet: req.body.snippet, body: req.body.body}, {new: true})
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