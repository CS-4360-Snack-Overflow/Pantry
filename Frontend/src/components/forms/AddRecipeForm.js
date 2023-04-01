import React from "react";
import Select, { IndicatorSeparatorProps } from "react-select"

import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import styled from "styled-components";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { CustomButton as CustomButtonBase, PrimaryButton } from "components/misc/Buttons.js";
import { motion } from "framer-motion";
//import EmailIllustrationSrc from "images/email-illustration.svg";
import { useState, useEffect } from "react";
import { addRecipe, uploadImage } from "helpers/RecipeService";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { tags } from "./Inputs";
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
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
const TopForm = tw.form`justify-center pt-80 md:pt-12 mt-8 md:mt-10 text-base flex`
const RowForm = tw.form`flex justify-start pt-2 mt-8 md:mt-10 text-base flex`
const ColForm = tw.form`mt-8 md:mt-10 p-2 w-1/3 text-sm flex flex-col`
const AreaInput = tw.textarea`border-2 p-2 rounded focus:outline-none font-medium transition duration-150 hocus:border-primary-500`
const RowInput = tw.input`border-2 px-5 py-3 w-1/3 rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const RowSelect = tw.select`border-2 px-5 py-3 w-1/6 rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const RowMultiSelect = tw.select`border-2 px-5 py-3 min-h-48 w-1/6 rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const AddButton = tw(PrimaryButtonBase)`inline-block`
const SubmitButtonRow = tw(PrimaryButtonBase)``
const Tag = tw.div`inline-flex p-2 mt-2 mx-1 bg-gray-400 hover:bg-gray-300 text-gray-600 rounded-full`
const TagContainer = tw.div`w-full`
const Step = tw.div`inline-flex p-2 mt-2 mx-1 bg-gray-200 hover:bg-gray-300 text-black w-full`
const NumBox = tw.input`mx-2 w-2`
// const ImageContainer = tw.div`lg:container mx-auto`;
const ImageContainer = tw(motion.a)`rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`

export default ({
  recipeId = null,
  submitButtonText = "Submit Recipe!",
  formAction = "",
  formMethod = "get",
  
}) => {
  const [currentInput, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [imUrl, setUrl] = useState("/placeholder.webp");
  const [videoUrl, setVideo] = useState(null)
  const [numServings, setServings] = useState(null)
  const [prepTime, setPrep] = useState(null)
  const [cookTime, setCook] = useState(null)
  const [author, setAuthor] = useState(null)
  const [nutrition, setNutrition] = useState({"protein": 0,"fat": 0,"calories": 0,
                                              "sugar": 0, "carbohydrates":0, "fiber":0}) 
  const [attributes, setAttributes] = useState([]);
  const [mealType, setMealType] = useState("Breakfast");
  const [recipeName, setName] = useState(""); 
  const [recipeIngredients, setIngredients] = useState([]); 
  const [recipeSteps, setSteps] = useState([]); 
  const [recipeDescription, setDescription] = useState(""); 
  const [recipeFields, setFields] = useState([]);
  
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
    form.append('files', image);
    let res = await uploadImage(form);
    res = await res.json().then((result) =>{
      setUrl(__dirname + result.path)
    })
  }

  async function submitRecipe(e) {
    e.preventDefault();
    // await handleFileUpload(e);
    console.log(JSON.stringify(recipeFields))
    await fetch("/recipes/create", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(recipeFields)
    });
  }

  useEffect(() => {
    console.log(recipeFields)
  }, [recipeFields])

  useEffect(() => {
    setFields({
      "name": recipeName,
      "description": recipeDescription,
      "num_servings":numServings,
      "cook_time":cookTime,
      "prep_time":prepTime,
      "credits":author,
      "user_num":null,
      "poster_image_url": imUrl,
      "video_url": videoUrl,
      "tags": [mealType, ...attributes],
      "ingredients": recipeIngredients,
      "instructions": recipeSteps,
      "nutrition":nutrition
    })
  }, [attributes, mealType, recipeName, recipeIngredients, recipeDescription, 
    recipeSteps, imUrl, videoUrl, numServings, prepTime, cookTime, author, nutrition])
  return (
    <Container>
    <ContentWithPaddingXl class="mx-auto container">
    <ImageContainer>
        <TopForm action={formAction} method={formMethod} >
          <CustomDescription>Upload Recipe Image: </CustomDescription>
          <RowInput required={true} type="file" enctype="multipart/form-data" name="image" onChange={handleFileChange}/>
          <AddButton type="add" onClick={handleFileUpload}>Save Photo</AddButton>
        </TopForm>
        <Image class="relative" imageSrc={imUrl}>
        </Image>
    </ImageContainer>
      <RowForm>
        <CustomDescription>Recipe Name: </CustomDescription>
        <RowInput required={true} type="text" name="recipeInstructions" placeholder="Recipe Name" onChange={(e)=>setName(e.target.value)}/>
      </RowForm>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Recipe description: </CustomDescription>
        <RowInput required={true} type="text" name="recipeDescription" placeholder="Recipe Description" onChange={(e)=>setDescription(e.target.value)} />
      </RowForm>
      <RowForm>
        <CustomDescription>Your Name: </CustomDescription>
        <RowInput required={true} type="text" name="recipeInstructions" placeholder="Recipe Name" onChange={(e)=>setAuthor(e.target.value)}/>
      </RowForm>
      <RowForm>
        <CustomDescription>Number of Servings: </CustomDescription>
        <RowInput required={true} type="text" name="recipeServings" placeholder="# Servings" onChange={(e)=>setServings(e.target.value)}/>
      </RowForm>
      <RowForm>
        <CustomDescription>Prep Time: </CustomDescription>
        <RowInput required={true} type="text" name="recipeInstructions" placeholder="#" onChange={(e)=>setPrep(e.target.value)}/>
      </RowForm>
      <RowForm>
        <CustomDescription>Cook Time: </CustomDescription>
        <RowInput required={true} type="text" name="recipeInstructions" placeholder="#" onChange={(e)=>setCook(e.target.value)}/>
      </RowForm>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Recipe Ingredients: </CustomDescription>
        <AreaInput required={recipeIngredients.length > 1} autoCorrect="on" rows={1} placeholder="Ingredient" onChange={(e) => setInput(e.target.value)}/>
        <AddButton onClick={(e) => {e.preventDefault(); setIngredients([currentInput,...recipeIngredients])}}>Add ingredient</AddButton>
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
        <AreaInput required={recipeSteps.length > 1} autoCorrect="on" rows={1} placeholder="Recipe Step" onChange={(e) => setInput(e.target.value)}/>
        <AddButton type="add" onClick={(e) => {e.preventDefault(); setSteps([...recipeSteps, currentInput])}}>Add step</AddButton>
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
        <RowMultiSelect name="selectedMealAttributes" multiple={true} onChange={(e)=>{
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
        <RowSelect name="selectedMealType" onChange={(e) => setMealType(e.target.value)}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </RowSelect>
      </RowForm>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Nutrition information: </CustomDescription>
      </RowForm>
      {Object.keys(nutrition).map((nutrient, index) => (
            <div key={index} class="w-full m-2">
              <label class="mx-3">{nutrient}</label>
              <input class="ml-2" type="text" onChange={(e) => handleNutrition(nutrient, e.target.value)}></input>           
            </div>
          ))}
      <RowForm><AddButton type="add" onClick={submitRecipe}>{submitButtonText}</AddButton></RowForm>
      <TwoColumn>
      </TwoColumn>
    </ContentWithPaddingXl>   
    </Container>
  );
};
