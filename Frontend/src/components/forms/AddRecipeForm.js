import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
//import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
//import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { CustomButton as CustomButtonBase } from "components/misc/Buttons.js";
 
const Container = tw.div`relative `;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`flex w-full justify-center max-w-xl mx-auto md:max-w-none md:mx-0`; 
const CustomDescription = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 pr-2`
const TopForm = tw.form`flex justify-center pt-80 md:pt-12 mt-8 md:mt-10 text-base flex`
const RowForm = tw.form`flex justify-center pt-2 mt-8 md:mt-10 text-base flex`
const ColForm = tw.form`mt-8 md:mt-10 p-2 w-1/3 text-sm flex flex-col`
const AreaInput = tw.textarea`border-2 p-2 rounded focus:outline-none font-medium transition duration-150 hocus:border-primary-500`
const RowInput = tw.input`border-2 px-5 py-3 w-1/3 rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const RowSelect = tw.select`border-2 px-5 py-3 w-1/6 rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`
const RowMultiSelect = tw.select`border-2 px-5 py-3 min-h-48 w-1/6 rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500 hover:border-primary-500`

const SubmitButtonRow = tw(CustomButtonBase)`inline-block ml-2 lg:ml-4 mt-0`

export default ({
  submitButtonText = "Submit Recipe!",
  formAction = "#",
  formMethod = "get",
}) => {
 
  return (
    <Container>
      <TopForm action={formAction} method={formMethod}>
        <CustomDescription>Recipe Name: </CustomDescription>
        <RowInput type="text" name="recipeInstructions" placeholder="Recipe Name" />
      </TopForm>
      <Column>
        <ColForm action={formAction} method={formMethod}>
          <CustomDescription>Recipe Instructions: </CustomDescription>
          <AreaInput autoCorrect="on" rows={4} placeholder="Recipe Instructions" />
        </ColForm>
        <ColForm action={formAction} method={formMethod}>
          <CustomDescription>Recipe Ingredients: </CustomDescription>
          <AreaInput autoCorrect="on" rows={4} placeholder="Recipe Ingredients" />
        </ColForm>
      </Column>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Upload Recipe Image: </CustomDescription>
        <RowInput type="file" accept="image/*"/>
      </RowForm>
      <RowForm action={formAction} method={formMethod}>
        <CustomDescription>Select Recipe Attributes:<br/>(Click and hold or<br/>Shift + Click or<br/>CTRL + Click) </CustomDescription>
        <RowMultiSelect name="selectedMealAttributes" multiple={true}>
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
        <RowSelect name="selectedMealType">
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </RowSelect>
      </RowForm>
      <RowForm action={formAction} method={formMethod}>
        <SubmitButtonRow type="submit">{submitButtonText}</SubmitButtonRow>
      </RowForm>
      <TwoColumn>
      </TwoColumn>
    </Container>
  );
};
