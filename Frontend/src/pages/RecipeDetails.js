import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import { useLocation } from "react-router-dom";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { CustomButton as CustomButtonBase, PrimaryButton } from "components/misc/Buttons.js";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as LikeIcon } from "images/like.svg";
import { ReactComponent as DislikeIcon } from "images/dislike.svg";
import { css } from "styled-components/macro"; //eslint-disable-line
import { motion } from "framer-motion";

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
  const recipe = useLocation().state.clickedRecipe;
  console.log(recipe);
  var i = "" 
  var d = "";
  var t = "";
  var ingredients = getIngedients(i);
  var directions = getDirections(d);
  var tags = getTags(t);
  var credits = getCredits(t);
  const prepTime = recipe.prep_time ? recipe.prep_time : 0;
  const cookTime = recipe.cook_time ? recipe.cook_time : 0;
  const numServings = recipe.num_servings ? recipe.num_servings : 0;
  const protein = recipe.nutrition.protein ? recipe.nutrition.protein : 0;
  const fat = recipe.nutrition.fat ? recipe.nutrition.fat : 0;
  const calories = recipe.nutrition.calories ? recipe.nutrition.calories : 0;
  const sugar = recipe.nutrition.sugar ? recipe.nutrition.sugar : 0;
  const carbs = recipe.nutrition.carbohydrates ? recipe.nutrition.carbohydrates : 0;
  const fiber = recipe.nutrition.fiber ? recipe.nutrition.fiber : 0;
  const review = recipe.review ? recipe.review : 0;
  const numReviews = recipe.total_reviews ? recipe.total_reviews : 0;
  var likes = recipe.user_ratings.count_positive ? recipe.user_ratings.count_positive : 0;
  var dislikes = recipe.user_ratings.count_negative ? recipe.user_ratings.count_negative : 0;


  function getIngedients(ingredients) {
    var ing = recipe.ingredients
    if (ingredients) {
      for(var i = 0; i < ing.length; i++){
        ingredients += "\t•" + ing[i] + "\n";
      }
    } else {
      ingredients = "No ingredients";
    }
    return ingredients;
  }

  function getDirections(directions) {
    var dir = recipe.directions
    if (directions) {
      for(var i = 0; i < dir.length; i++){
        directions += "\t" + (i+1) + ". " + dir[i] + "\n";
      }
    } else {
      directions = "No directions";
    }
    return directions;
  }

  function getTags(tags) {
    var tag = recipe.tags
    if (tag) {
      for(var i = 0; i < tag.length; i++){
        if(i !== tag.length - 1){
          tags += tag[i] + "   ";
        } else {
          tags += tag[i];
        }
      } 
    } else {
      tags = "No tags";
    }
    return tags;
  }

  function getCredits(credits) {
    var cred = recipe.credits
    if(cred) {
      for(var i = 0; i < cred.length; i++){
        if(i !== cred.length - 1){
          cred += cred[i] + " ";
        } else {
          cred += cred[i];
        }
      }
    } else {
      cred = "Anonymous";
    }
    return cred;
  }


  const Heading = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-center pt-10 md:pt-24`;
  const Subheading = tw.div`uppercase tracking-wider text-sm text-center justify-center text-orange-600 font-bold`;
  const SubheadingLeft = tw.div`uppercase tracking-wider text-sm text-left justify-start text-orange-600 font-bold`;
  const Text = tw.div`tracking-wider text-sm text-left justify-start text-black font-bold`;
  const Tag = tw.div`inline-flex p-2 mt-2 mx-1 bg-gray-400 hover:bg-gray-300 text-gray-600 rounded-full`
  const TagContainer = tw.div`w-full flex flex-wrap justify-center` 
  const AddButton = tw(PrimaryButtonBase)`inline-block`
  const Container = tw.div`relative`;
  const Column = tw.div`w-1/2`
  const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
  const SingleColumn = tw.div`flex flex-col md:flex-row justify-start max-w-screen-xl mx-auto py-8 md:py-8`;
  const SmallColumn = tw.div`flex flex-col md:flex-row justify-start max-w-screen-xl mx-auto py-4 md:py-4`;
  const TwoRow = tw.div`flex justify-start mx-auto py-20 md:py-24`;
  const Row = tw.div`flex w-full bottom-0 left-0 max-w-xl mx-auto md:max-w-none md:mx-0`;
  const RowForm = tw.form`justify-start pt-2 mt-8 md:mt-10 text-base flex`
  const CardReview = tw.div`font-medium justify-center text-xs text-gray-600`;
  const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
  const CardLikeContainer = tw(PrimaryButtonBase)`leading-none absolute inline-flex bg-gray-100 bottom-0 right-[110px] ml-4 mb-4 rounded-full px-5 py-2 items-end`;
  const CardDislikeContainer = tw(PrimaryButtonBase)`leading-none absolute inline-flex bg-gray-100 bottom-0 right-[18px] ml-4 mb-4 rounded-full px-5 py-2 items-end`;
  const CardRating = styled.div`
    ${tw`mr-1 text-sm font-bold flex items-end`}
    svg {
      ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
    }
  `;
  const CardContainer = tw.div`mt-10 max-w-md sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
  const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
  const CardImageContainer = styled.div`
    ${props => css`background-image: url("${props.imageSrc}");`}
    ${tw`h-56 bg-center bg-cover relative rounded-t`}
  `;
  const RecipeContainer = tw.div`border-2 border-solid bottom-0 left-0 border-white rounded-lg p-4 mx-2 w-full md:w-2/5`;

  return (
    <AnimationRevealPage>
      <Header/>
      <Heading>{recipe.name}</Heading>
      <Subheading>by {credits}</Subheading>
      <TagContainer>
        {recipe.tags.map((tag, index) => (
        <Tag key={index}><span>{tag}</span></Tag>
      ))}</TagContainer>
      <SingleColumn></SingleColumn>
      <div css={tw`flex flex-initial justify-start md:justify-items-start`}>
        <CardContainer>
          <Card>
            <CardImageContainer imageSrc={recipe.poster_image_url}>
              <CardRatingContainer>
                <CardRating>
                  <StarIcon />
                </CardRating>
                <CardReview>{review ? Math.round(review*10)/10 : "No reviews yet"}</CardReview>
              </CardRatingContainer>
              <CardLikeContainer type="like" onClick={null}>
                <CardRating>
                  <LikeIcon />
                </CardRating>
                <CardReview>{likes}</CardReview>
              </CardLikeContainer>
              <CardDislikeContainer type="dislike" onClick={null}>
                <CardRating>
                  <DislikeIcon />
                </CardRating>
                <CardReview>{dislikes}</CardReview>
              </CardDislikeContainer>
            </CardImageContainer>
          </Card>
        </CardContainer>
        <RecipeContainer>
        <SmallColumn></SmallColumn>
        <Text>Prep time: {prepTime} minutes</Text>
        <Text>Cook time: {cookTime} minutes</Text>
        <Text>Number of servings: {numServings}</Text>
        <SmallColumn></SmallColumn>
        <AddButton type="Edit" onClick={null}>Edit</AddButton>
        <SmallColumn></SmallColumn>
        <AddButton type="Delete" onClick={null}>Delete</AddButton>
        </RecipeContainer>
      </div>
      <SmallColumn></SmallColumn>
      <SubheadingLeft>Ingredients</SubheadingLeft>
      <Text>{ingredients}</Text>
      <SmallColumn></SmallColumn>
      <SubheadingLeft>Cooking Instructions</SubheadingLeft>
      <Text>{directions}</Text>
      <SmallColumn></SmallColumn>
      <SubheadingLeft>Nutrition Facts</SubheadingLeft>
      <Text>{calories} calories</Text>
      <Text>{protein}g of protein</Text>
      <Text>{fat}g of fat</Text>
      <Text>{carbs}g of carbs</Text>
      <Text>{sugar}g of sugar</Text>
      <Text>{fiber}g of fiber</Text>
      <TwoColumn></TwoColumn>
      <Footer />
    </AnimationRevealPage>
  );
};