import React, {useNavigate} from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import { Link, useLocation } from "react-router-dom";
import { editRecipe, deleteRecipe } from "helpers/RecipeService";
import { PrimaryButton } from "components/misc/Buttons";
const Heading = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-center pt-10 md:pt-24`;
//-----------------RECIPE FIELDS TO FILL IN------------------
// Recipe Header
  // misc - edit/delete buttons, favorite/like/dislike buttons
  // recipe.name , String
  // recipe.tags , String array, stuff like "Breakfast" and "Vegetarian"
  // recipe.poster_image_url , String
  // recipe.description, String
  // recipe.credits , String, author's name
  // recipe.createdAt , String, timestamp
  // recipe.prep_time , Number
  // recipe.cook_time , Number
  // recipe.review - Number, rating out of 5
  // recipe.user_reviews.count_positive - Number
  // recipe.user_reviews.count_negative - Number
  // recipe.total_reviews - Number, sum of reviews
  // recipe.num_servings , Number
//
// Recipe Content
  // recipe.ingredients , String array, each element is an ingredient
  // recipe.directions , String array, each element is a step in the recipe
  // recipe.nutrition , comes with several fields:
  //    recipe.nutrition.protein - Number (grams)
  //    recipe.nutrition.fat - Number (grams)
  //    recipe.nutrition.calories - Number
  //    recipe.nutrition.sugar - Number (grams)
  //    recipe.nutrition.carbohydrates - Number (grams)
  //    recipe.nutrition.fiber - Number (grams)

export default () => {
  const recipe = useLocation().state.clickedRecipe
  console.log(recipe)
  return (
    <AnimationRevealPage>
      <Header />
      <img src={recipe.poster_image_url}></img>
      <Heading>{recipe.name}</Heading>     
      <Link to="/addrecipe" state= {{recipe:recipe}}>
        <PrimaryButton>Edit Recipe</PrimaryButton>
      </Link>
      <PrimaryButton onClick={()=>{deleteRecipe(recipe._id); window.location.href='/recipes/'}}>Delete Recipe</PrimaryButton>
      <p>{recipe.user_ratings.count_positive}</p>
      <Footer />
    </AnimationRevealPage>
  );
};
