import React, {useEffect, useState} from "react";
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
import { deleteRecipe } from "helpers/RecipeService";
import { addFavoriteRecipe, checkAuth, checkFavorited, removeFavoriteRecipe } from "helpers/UserService";
import { Link } from "react-router-dom";


const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};

export default () => {
  // Load the recipe in from recipe grid
  const recipe = useLocation().state.clickedRecipe;

  // Set all the fields if they aren't null
  // (note: pretty sure this is a stupid way to do this but it works)
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

  // Initialize any variables that might change
  const [likes, setLikes] = useState(recipe.user_ratings.count_positive ? recipe.user_ratings.count_positive : 0);
  const [dislikes, setDislikes] = useState(recipe.user_ratings.count_negative ? recipe.user_ratings.count_negative : 0);
  const [isAuthorized, setAuthorized] = useState(false)
  const [isFavorite, setFavorite] = useState(false)
  
  const Heading = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-center pt-10 md:pt-24`;
  const Subheading = tw.div`uppercase tracking-wider text-base text-center justify-center text-orange-600 font-bold`;
  const SubheadingLeft = tw.div`uppercase tracking-wider text-base text-left justify-start text-orange-600 font-bold`;
  const Text = tw.div`tracking-wider text-sm text-left justify-start text-black font-bold`;
  const Tag = tw.div`inline-flex p-2 mt-2 mx-1 bg-gray-400 hover:bg-gray-300 text-gray-600 rounded-full`
  const TagContainer = tw.div`w-full flex flex-wrap justify-center` 
  const AddButton = tw(PrimaryButtonBase)`inline-block text-sm text-center text-white font-bold bg-orange-600 hover:bg-orange-500 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded-full`;
  const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
  const SingleColumn = tw.div`flex flex-col md:flex-row justify-start max-w-screen-xl mx-auto py-8 md:py-8`;
  const SmallColumn = tw.div`flex flex-col md:flex-row justify-start max-w-screen-xl mx-auto py-4 md:py-4`;
  const SmallColumn2 = tw.div`flex flex-col md:flex-row justify-start max-w-screen-xl mx-auto py-6 md:py-6`;
  const TwoRow = tw.div`flex flex-row md:flex-col justify-start max-w-screen-xl mx-auto py-4 md:py-4`;
  const CardReview = tw.div`font-medium justify-center text-xs text-gray-600`;
  const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
  const CardLikeContainer = tw(PrimaryButtonBase)`leading-none absolute inline-flex bg-gray-100 bottom-0 right-[112px] ml-4 mb-4 rounded-full px-5 py-2 items-end`;
  const CardDislikeContainer = tw(PrimaryButtonBase)`leading-none absolute inline-flex bg-gray-100 bottom-0 right-[20px] ml-4 mb-4 rounded-full px-5 py-2 items-end`;
  const CardRating = styled.div`
    ${tw`mr-1 text-sm font-bold flex items-end`}
    svg {
      ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
    }
  `;
  //const CardContainer = tw.div`mt-10 flex flex-wrap max-w-md sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
  const CardContainer2 = tw.div`mt-10 min-w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pl-8 md:pl-8 lg:pl-32 xl:pl-32 2xl:pl-32`;
  const CardContainerLarge = tw.div`mt-10 min-w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pl-8 md:pl-8 lg:pl-32 xl:pl-32 2xl:pl-32`;
  const CardContainer = tw.div`mt-10 w-full sm:min-w-[100%] md:min-w-[56%] lg:min-w-[25%] xl:min-w-[25%] 2xl:min-w-[25%] sm:w-1/2 md:w-1/3 lg:w-1/4`;
  const Card = tw(motion.div)`relative bg-gray-200 rounded-b aspect-square block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
  const CardImageContainer = styled.div`
  ${props => css`background-image:url("${props.imageSrc}");`}
  ${tw`w-full bg-center bg-cover relative aspect-square rounded-t`}
  `;
  const RecipeContainer = tw.div`border-2 border-solid bottom-0 left-0 border-white rounded-lg p-4 mx-2 w-full md:w-2/5 sm:pl-8 md:pl-8 lg:pl-32 xl:pl-32 2xl:pl-32`;

  // When the page loads, check if user owns recipe and if they have it favorited
  useEffect(() => {
    checkAuth(recipe.user_num)
    .then((res) =>{
      setAuthorized(res)
    })

    checkFavorited(recipe._id)
    .then((res) => {
      setFavorite(res)
    })
  }, [])
  
  const handleFavorite = () => {
    if(isFavorite){
      removeFavoriteRecipe(recipe._id)
    } else {
      addFavoriteRecipe(recipe._id)
    }

    setFavorite(!isFavorite)
  }
  return (
    <ScrollToTop>
    <AnimationRevealPage>
      <Header/>
      <Heading>{recipe.name}</Heading>
      <Subheading>by {recipe.credits ? recipe.credits : "Unknown"}</Subheading>
      <TagContainer>
        {recipe.tags.map((tag, index) => (
        <Tag key={index}><span>{tag}</span></Tag>
      ))}</TagContainer>
      <SingleColumn></SingleColumn>
      <div css={tw`flex flex-wrap justify-start justify-items-start sm:pl-8 md:pl-8 lg:pl-32 xl:pl-32 2xl:pl-32`}>
        <CardContainer>
          <Card>
            <CardImageContainer imageSrc={recipe.alt_image_url}>
              <CardRatingContainer>
                <CardRating>
                  <StarIcon />
                </CardRating>
                <CardReview>{review ? Math.round(review*10)/10 : "No reviews yet"}</CardReview>
              </CardRatingContainer>
              <CardLikeContainer type="like" onClick={()=>setLikes(likes + 1)}>
                <CardRating>
                  <LikeIcon />
                </CardRating>
                <CardReview>{likes}</CardReview>
              </CardLikeContainer>
              <CardDislikeContainer type="dislike" onClick={()=>setDislikes(dislikes + 1)}>
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

        {/* Show edit/delete buttons if user created the recipe */}
        {isAuthorized && (
          <div>
            <Link to="/addrecipe" state= {{recipe:recipe}}>
              <AddButton type="Edit">Edit Recipe</AddButton>
            </Link>
            <AddButton onClick={()=>{deleteRecipe(recipe._id); window.location.href='/recipes/'}}>Delete Recipe</AddButton>
          </div>
        )}
        {/* Show favorite/unfavorite button if user didn't create the recipe */}
        {!isAuthorized &&(
          <AddButton onClick={()=>{handleFavorite()}}>
            {!isFavorite ? "Favorite Recipe" : "Unfavorite Recipe"}
          </AddButton>
        )}
        </RecipeContainer>
      </div>
      <SmallColumn></SmallColumn>
      <CardContainer2>
        <SubheadingLeft>Ingredients</SubheadingLeft>
        <ol>
        {recipe.ingredients.map((ingredient, index)=>(
          <li key={index}>{index + 1}. {ingredient}</li>
        ))}
        </ol>
        <SmallColumn></SmallColumn>
      </CardContainer2>
      <CardContainerLarge>
        <SubheadingLeft>Cooking Instructions</SubheadingLeft>
        <ol>
        {recipe.instructions.map((step, index)=>(
          <li key={index}>{index + 1}. {step}</li>
        ))}
        </ol>
        <SmallColumn></SmallColumn>
        <SubheadingLeft>Nutrition Facts</SubheadingLeft>
        <Text>{calories} calories</Text>
        <Text>{protein}g of protein</Text>
        <Text>{fat}g of fat</Text>
        <Text>{carbs}g of carbs</Text>
        <Text>{sugar}g of sugar</Text>
        <Text>{fiber}g of fiber</Text>
        <SmallColumn2></SmallColumn2>
      </CardContainerLarge>
      <CardContainer2>
        <AddButton onClick={event =>  window.location.href='/recipes'}>Back</AddButton>
      </CardContainer2>
      <TwoColumn></TwoColumn>
      <Footer />
    </AnimationRevealPage>
    </ScrollToTop>
  );
};
