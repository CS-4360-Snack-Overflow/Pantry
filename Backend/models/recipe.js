const mongoose = require('mongoose');
//.Schema is a constructor
const Schema = mongoose.Schema;
/* schema difines the structure of documents we store inside a collection, 
the thing a model wraps around
*/
const recipeSchema = new Schema({
    //properties of recipe docs
    recipeName: {
        type: String, 
        required: true
    }, 
    author: {
        type: String, 
        required: true
    }, 
    review: {
        type: Number, 
        required: false
    }, 
    imUrl: {
        type: String,
        required: false
    },
    ingredients: {
        type: [String],
        required: true,
        validate: [hasIngredients, "Recipe must contain at least one ingredient"]
    },
    directions: {
        type: String,
        required: true
    }
}, {timestamps: true})

function hasIngredients(array) {
    return array.length >= 1;
}

/* then create a model based on the schema, which defines the structure of the documents
model sourounds that and provides an interface with a db collection for that document
type
*/

/* the name is important becuase it will be pluralized and looked for in db
model name convention (capitalized), same with schema constructor
*/
const Recipes = mongoose.model('Recipe', recipeSchema);
//export to use elsewhere in the project
module.exports = Recipes;