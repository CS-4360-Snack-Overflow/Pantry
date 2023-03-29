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
        count_positive: {
            type: Number,
            default: 0
        },
        count_negative: {
            type: Number,
            default: 0}
    },
    review: {
        type: Number,
        default: 0
    },
    total_reviews: {
        type: Number,
        default: 0
    },
    ingredients: [String],
    nutrition: {
        protein: {
            type: Number,
            default: 0
        },
        fat: {
            type: Number,
            default: 0
        },
        calories: {
            type: Number,
            default: 0
        },
        sugar: {
            type: Number,
            default: 0
        },
        carbohydrates: {
            type: Number,
            default: 0
        },
        fiber: {
            type: Number,
            default: 0
        }
    },
    num_servings: {
        type: Number,
        default: 0
    },
    prep_time: {
        type: Number,
        default: 0
    },
    cook_time: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },
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