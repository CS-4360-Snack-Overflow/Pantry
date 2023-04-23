/**
 * @fileoverview Defines the Recipe model for MongoDB using Mongoose.
 * @author Snack Overflow
 */
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 const recipeSchema = new Schema({
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
 
 const Recipes = mongoose.model('Recipe', recipeSchema);
 module.exports = Recipes;