const mongoose = require('mongoose');
//.Schema is a constructor
const Schema = mongoose.Schema;
/* schema difines the structure of documents we store inside a collection, 
the thing a model wraps around
*/
const recipeSchema = new Schema({
    //properties of recipe docs
    name: String,
    video_url: String,
    poster_image_url: String,
    alt_image_url: String,
    credits: String,
    user_num: String,
    tags: [String],
    user_ratings: {
        count_positive: Number,
        count_negative: Number
    },
    review: Number,
    total_reviews: Number,
    ingredients: [String],
    nutrition: {
        protein: Number,
        fat: Number,
        calories: Number,
        sugar: Number,
        carbohydrates: Number,
        fiber: Number
    },
    num_servings: Number,
    prep_time: Number,
    cook_time: Number,
    description: String,
    instructions: [String],
}, {timestamps: true})

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
//module.exports = Recipes_API