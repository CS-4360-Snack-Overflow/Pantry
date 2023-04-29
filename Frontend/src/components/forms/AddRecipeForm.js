import React from "react";
import Select, { IndicatorSeparatorProps } from "react-select"

import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";

import styled from "styled-components";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { CustomButton as CustomButtonBase, PrimaryButton } from "components/misc/Buttons.js";
import { motion } from "framer-motion";
//import EmailIllustrationSrc from "images/email-illustration.svg";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { addRecipe, uploadImage, getOneRecipe, editRecipe } from "helpers/RecipeService";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import food from "images/honey.jpg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const SingleColumn = tw.div`flex flex-col md:flex-row justify-start max-w-screen-xl mx-auto py-10 md:py-12`;
const TwoRow = tw.div`flex justify-start mx-auto py-20 md:py-24`;
const Row = tw.div`flex w-full max-w-xl mx-auto md:max-w-none md:mx-0`;
const Column = tw.div`flex w-full justify-center max-w-xl mx-auto md:max-w-none md:mx-0`;
//const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div`
  ${props => css`background-image:url("${props.imageSrc}");max-width:80%;`}
  ${tw`h-128 bg-center bg-cover relative rounded-t mx-auto flex-row`}
`;
// const Image = styled.div`${css`max-width:100%; max-height:100%`} 
//                      ${tw`object-scale-down`}`
const TextContent = tw.div`lg:py-8 text-center md:text-left`;
const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`
const CustomDescription = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 pr-2`
const TopForm = tw.form`flex justify-center pt-80 md:pt-12 mt-8 md:mt-10 text-base flex`
const RowForm = tw.form` justify-center pt-2 mt-8 md:mt-10 text-base w-full`
const ColForm = tw.form`mt-8 md:mt-10 p-2 w-1/3 text-sm flex flex-col`
const AreaInput = tw.textarea`border-2 p-2 w-full rounded focus:outline-none font-medium transition duration-150 hocus:border-primary-500`
const RowInput = tw.input`border-2 px-5 py-3 w-full rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const RowInputShort = tw.input`border-2 px-5 py-3 w-full rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const RowInputLong = tw.input`border-2 px-5 py-3 w-full rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const RowInputLong2 = tw.input`border-2 px-5 py-3 w-full rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const RowSelect = tw.select`border-2 px-5 py-3 w-1/6 rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const RowSelectLong = tw.select`border-2 px-5 py-3 w-1/4 rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const RowMultiSelect = tw.select`border-2 px-5 py-3 min-h-48 w-full rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const AddButton = tw(PrimaryButtonBase)`inline-block`
const SubmitButtonRow = tw(PrimaryButtonBase)``
const Tag = tw.div`inline-flex p-2 mt-2 mx-1 bg-gray-400 hover:bg-gray-300 text-gray-600 rounded-full`
const TagContainer = tw.div`w-full`
const Step = tw.div`inline-flex p-2 mt-2 mx-1 bg-gray-200 hover:bg-gray-300 text-black w-full`
const RecipeContainer = tw.div`border-2 border-solid border-orange-500 rounded-lg p-4 mx-auto sm:w-full md:w-4/5 lg:w-3/5`;
const ImageContainer = tw.div`border-2 border-solid border-white rounded-lg p-4 m-2 w-full md:w-2/5`;
const Images = styled.div`
${props => css`background-image:url("${props.imageSrc}");max-width:80%;`}
${tw`h-32 sm:h-48 md:h-48 lg:h-128 xl:h-128 2xl:h-128 sm:w-4/5 md:w-3/5 lg:w-1/2 bg-center bg-cover relative rounded-t mx-auto flex-row`}`


export default ({
  recipeId = null,
  submitButtonText = "Submit Recipe",
  formAction = "",
  formMethod = "get",
}) => {
  const recipe = useLocation().state ? useLocation().state.recipe : null
  const [currentInput, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [numServings, setServings] = useState(recipe ? recipe.num_servings : 0)
  const [prepTime, setPrep] = useState(recipe ? recipe.prep_time : 0)
  const [cookTime, setCook] = useState(recipe ? recipe.cook_time : 0)
  const [nutrition, setNutrition] = useState(recipe? recipe.nutrition : {"protein": 0,"fat": 0,"calories": 0,
                                              "sugar": 0, "carbohydrates":0, "fiber":0}) 
  const [imUrl, setUrl] = useState(recipe ? recipe.alt_image_url : "/placeholder.webp");
  const [attributes, setAttributes] = useState([]);
  const [mealType, setMealType] = useState("Breakfast");
  const [recipeName, setName] = useState(recipe ? recipe.name : "");
  const [recipeIngredients, setIngredients] = useState(recipe ? recipe.ingredients : []);
  const [recipeSteps, setSteps] = useState(recipe ? recipe.instructions : []);
  const [recipeDescription, setDescription] = useState(recipe ? recipe.description : "");
  const [recipeFields, setFields] = useState(recipe)
  const navigate = useNavigate();

  function removeIngredient(index) {
    setIngredients([...recipeIngredients.filter(ingredient => recipeIngredients.indexOf(ingredient) !== index)])
  }

  function removeStep(index) {
    setSteps([...recipeSteps.filter(step => recipeSteps.indexOf(step) !== index)])
  }

  function handleFileChange(e) {
    if(e.target.files) {
      setImage(e.target.files[0]);
    }
  }

  function handleNutrition(nutrient, value) {
    let newObj = nutrition
    newObj[nutrient] = value
    console.log(newObj)
    setNutrition(newObj)
  }

  async function handleFileUpload(e) {
    e.preventDefault()
    let form = new FormData();
    if(image) {
      form.append('files', image);
    let res = await uploadImage(form);
    res = await res.json().then((result) =>{
      setUrl(__dirname + result.path)
    })
    }
    
  }

  const linkToRecipes = () => { 
    const path = '/recipes'
    navigate(path);
  }

  async function submitRecipe(e) {
    e.preventDefault();
    if(image){
      await handleFileUpload(e)
    }
    if(recipe) {
      await editRecipe(recipeFields);
    } else {
      let res = await addRecipe(recipeFields);
      res = await res.json().then((result) =>{
        recipeId = result.recipeId
      })
    }
  }
  
  useEffect(() => {
    let tags = [mealType, ...attributes]
    let newRecipe = Object.assign({}, recipe); 
    newRecipe.name = recipeName
    newRecipe.description = recipeDescription
    newRecipe.alt_image_url = imUrl
    newRecipe.poster_image_url = imUrl
    newRecipe.tags = tags
    newRecipe.ingredients = recipeIngredients
    newRecipe.instructions = recipeSteps
    newRecipe.cook_time = cookTime
    newRecipe.prep_time = prepTime
    newRecipe.num_servings = numServings
    newRecipe.nutrition = nutrition
    setFields(newRecipe)
  }, [attributes, mealType, recipeName, recipeIngredients, recipeDescription, recipeSteps, imUrl, numServings, prepTime, cookTime, nutrition])


  return (
    <AnimationRevealPage>
    <SingleColumn></SingleColumn>
    <div css={tw`w-full flex-row justify-center md:justify-between`}>
    <SingleColumn css={tw`w-full`}></SingleColumn>
    <Images imageSrc={imUrl} />

    {/* <ImageContainer>
    <Images imageSrc={imUrl} />
    </ImageContainer> */}
    <RecipeContainer>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Upload Recipe Image: </CustomDescription>
        <RowInputShort required={true} type="file" enctype="multipart/form-data" name="image" onChange={handleFileChange}/>
        <AddButton type="add" onClick={handleFileUpload}>Upload Photo</AddButton>
      </RowForm>
      <RowForm>
        <CustomDescription>Recipe Name: </CustomDescription>
        <RowInputLong required={true} type="text" name="recipeName" defaultValue={recipe ? recipe.name : ""} placeholder="Recipe Name" onChange={(e)=>setName(e.target.value)}/>
      </RowForm>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Recipe description: </CustomDescription>
        <RowInputLong2 required={true} type="text" name="recipeInstructions" defaultValue={recipe ? recipe.description : ""} placeholder="Recipe Description" onChange={(e)=>setDescription(e.target.value)} />
      </RowForm>
      <RowForm>
        <CustomDescription>Number of Servings: </CustomDescription>
        <RowInput required={true} type="number" name="recipeServings" placeholder="# Servings" defaultValue={numServings} onChange={(e)=>setServings(e.target.value)}/>
      </RowForm>
      <RowForm>
        <CustomDescription>Prep Time: </CustomDescription>
        <RowInput required={true} type="number" name="recipeInstructions" placeholder="#" defaultValue={recipe ? recipe.prep_time : 0} onChange={(e)=>setPrep(e.target.value)}/>
        <p>Minutes</p>
      </RowForm>
      <RowForm>
        <CustomDescription>Cook Time: </CustomDescription>
        <RowInput required={true} type="text" name="recipeInstructions" placeholder="#" defaultValue={recipe ? recipe.cook_time : 0} onChange={(e)=>setCook(e.target.value)}/>
        <p>Minutes</p>
      </RowForm>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Recipe Ingredients: </CustomDescription>
        <div class="inline-block">
          <AreaInput autoCorrect="on" rows={1} placeholder="Ingredient" onChange={(e) => setInput(e.target.value)}/>
          <AddButton onClick={(e) => {e.preventDefault(); setIngredients([currentInput,...recipeIngredients])}}>Add</AddButton>
        </div>
      </RowForm>
      <TagContainer>
          {recipeIngredients.map((ingredient,index) => (
            <Tag key={index}>
              <span>{ingredient}</span>
              <CloseIcon onClick={() => removeIngredient(index)}></CloseIcon>
            </Tag>
          ))}
      </TagContainer>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Recipe Instructions </CustomDescription>
        <AreaInput autoCorrect="on" rows={4} placeholder="Recipe Step" onChange={(e) => setInput(e.target.value)}/>
        <AddButton type="add" onClick={(e) => {e.preventDefault(); setSteps([...recipeSteps, currentInput])}}>Add</AddButton>
      </RowForm>
          {recipeSteps.map((step,index) => (
            <Step key={index}>
                <span>Step {index + 1}: </span>
                <span>{step}</span>
                <CloseIcon onClick={() => removeStep(index)}></CloseIcon>
            </Step>
          ))}
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Select Recipe Attributes:<br/>(Click and hold or<br/>Shift + Click or<br/>CTRL + Click) </CustomDescription>
        <RowMultiSelect name="selectedMealAttributes" multiple={true} defaultValue={recipe ? recipe.tags : null} onChange={(e)=>{
        setAttributes(Array.from(e.target.selectedOptions, option => option.value))}}>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Pescatarian">Pescatarian</option>
          <option value="Paleo">Paleo</option>
          <option value="Keto">Keto</option>
          <option value="Gluten Free">Gluten Free</option>
          <option value="Seafood Free">Seafood Free</option>
          <option value="Peanut Free">Peanut Free</option>
          <option value="Tree Nut Free">Tree Nut Free</option>
          <option value="Dairy Free">Dairy Free</option>
        </RowMultiSelect>
      </RowForm>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Select a meal type: </CustomDescription>
        <RowSelectLong name="selectedMealType" onChange={(e) => setMealType(e.target.value)} >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </RowSelectLong>
      </RowForm>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Nutrition information: </CustomDescription>
      </RowForm>
      {Object.keys(nutrition).map((nutrient, index) => (
            <div key={index} class="w-1/2 m-2">
              <label class="mx-3 flex">{nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} {nutrient!=="calories" ? "(grams)":""}</label>
              <RowInput class="ml-2 p-3 w-1/4" type="text" defaultValue={recipe? recipe.nutrition[nutrient] : 0} onChange={(e) => handleNutrition(nutrient, e.target.value)}></RowInput>           
            </div>
          ))}
      <RowForm action={formAction} method={formMethod}>
        <SubmitButtonRow type="submit" onClick={(e)=> {submitRecipe(e); linkToRecipes()}}>{recipe ? "Update Recipe" : "Submit Recipe"}</SubmitButtonRow>
      </RowForm>
    </RecipeContainer>

    <SingleColumn></SingleColumn>
    </div>
    <TwoColumn>
      </TwoColumn>
    </AnimationRevealPage>
  );
};
