import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import styled from "styled-components";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { CustomButton as CustomButtonBase, PrimaryButton } from "components/misc/Buttons.js";

//import EmailIllustrationSrc from "images/email-illustration.svg";
import { useState, useEffect } from "react";
import { addRecipe } from "helpers/RecipeService";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const TwoRow = tw.div`flex justify-start mx-auto py-20 md:py-24`;
const Row = tw.div`flex w-full max-w-xl mx-auto md:max-w-none md:mx-0`;
const Column = tw.div`flex w-full justify-center max-w-xl mx-auto md:max-w-none md:mx-0`;
//const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

// const Image = styled.div(props => [
//   `background-image: url("${props.imageSrc}");`,
//   tw`rounded bg-contain bg-no-repeat bg-center h-full`,
// ]);

const TextContent = tw.div`lg:py-8 text-center md:text-left`;
const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`
const CustomDescription = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 pr-2`
const TopForm = tw.form`flex justify-center pt-80 md:pt-12 mt-8 md:mt-10 text-base flex`
const RowForm = tw.form`flex justify-start pt-2 mt-8 md:mt-10 text-base flex`
const ColForm = tw.form`mt-8 md:mt-10 p-2 w-1/3 text-sm flex flex-col`
const AreaInput = tw.textarea`border-2 p-2 rounded focus:outline-none font-medium transition duration-150 hocus:border-primary-500`
const RowInput = tw.input`border-2 px-5 py-3 w-1/3 rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const RowSelect = tw.select`border-2 px-5 py-3 w-1/6 rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const RowMultiSelect = tw.select`border-2 px-5 py-3 min-h-48 w-1/6 rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const AddButton = tw(PrimaryButtonBase)`inline-block`
const SubmitButtonRow = tw(CustomButtonBase)`inline-block ml-2 lg:ml-4 mt-0`
const Tag = tw.div`inline-flex p-2 mt-2 mx-1 bg-gray-400 hover:bg-gray-300 text-gray-600 rounded-full`
const TagContainer = tw.div`w-full`
const Step = tw.div`inline-flex p-2 mt-2 mx-1 bg-gray-200 hover:bg-gray-300 text-black w-full`

export default ({
  recipeId = null,
  submitButtonText = "Submit Recipe!",
  formAction = "",
  formMethod = "get",
  
}) => {
  const [currentInput, setInput] = useState("")
  const [attributes, setAttributes] = useState([]);
  const [mealType, setMealType] = useState("Breakfast");
  const [recipeName, setName] = useState("");
  const [recipeIngredients, setIngredients] = useState([]);
  const [recipeSteps, setSteps] = useState([]);
  const [recipeDescription, setDescription] = useState("");
  const [recipeFields, setFields] = useState([])

  function addIngredient(e) {
    e.preventDefault();
    setIngredients([currentInput,...recipeIngredients])
  }
  function removeIngredient(index) {
    setIngredients([...recipeIngredients.filter(ingredient => recipeIngredients.indexOf(ingredient) !== index)])
  }
  function addStep(e) {
    e.preventDefault();
    setSteps([...recipeSteps, currentInput])
  }
  function removeStep(index) {
    setSteps([...recipeSteps.filter(step => recipeSteps.indexOf(step) !== index)])
  }
  function submitRecipe(e) {
    e.preventDefault();
    addRecipe(recipeFields)
  }

  useEffect(() => {
    let tags = [mealType, ...attributes]
      setFields({
        "name": recipeName,
        "description": recipeDescription,
        "tags": tags,
        "ingredients": recipeIngredients,
        "instructions": recipeSteps
      })
  }, [attributes, mealType, recipeName, recipeIngredients, recipeDescription, recipeSteps])


  return (
    <Container>
      <TopForm action={formAction} method={formMethod}>
        <CustomDescription>Upload Recipe Image: </CustomDescription>
        <RowInput type="file" accept="image/*"/>
      </TopForm>
      <RowForm>
        <CustomDescription>Recipe Name: </CustomDescription>
        <RowInput type="text" name="recipeInstructions" placeholder="Recipe Name" onChange={(e)=>setName(e.target.value)}/>
      </RowForm>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Recipe description: </CustomDescription>
        <RowInput type="text" name="recipeInstructions" placeholder="Recipe Description" onChange={(e)=>setDescription(e.target.value)} />
      </RowForm>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Recipe Ingredients: </CustomDescription>
        <AreaInput autoCorrect="on" rows={1} placeholder="Ingredient" onChange={(e) => setInput(e.target.value)}/>
        <AddButton onClick={addIngredient}>Add ingredient</AddButton>
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
        <AreaInput autoCorrect="on" rows={1} placeholder="Recipe Step" onChange={(e) => setInput(e.target.value)}/>
        <AddButton onClick={addStep}>Add step</AddButton>
      </RowForm>
          {recipeSteps.map((step,index) => (
            <Step key={index}>
                <span>Step {index + 1}:</span>
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
        <SubmitButtonRow type="submit" onClick={submitRecipe}>{submitButtonText}</SubmitButtonRow>
      </RowForm>
      <TwoColumn>
      </TwoColumn>
    </Container>
  );
};
