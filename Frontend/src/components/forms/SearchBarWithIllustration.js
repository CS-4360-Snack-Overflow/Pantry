import React, { useState, useRef } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { useNavigate } from "react-router-dom";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const TextContent = tw.div`lg:py-8 text-left md:text-left`;

const Subheading = tw(SubheadingBase)`text-left md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Search = tw.div`inline-flex w-full`
const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-md mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500 basis-3/4`

const Tag = tw.div`inline-flex p-2 mt-2 mx-1 bg-gray-400 hover:bg-gray-300 text-gray-600 rounded-full`
const TagContainer = tw.div`w-full`
const AddButton = tw(PrimaryButtonBase)`bg-white hover:bg-gray-200 text-gray-700 hover:text-black font-semibold py-2 px-4 border border-gray-400 rounded shadow basis-1/4`
const SubmitButton = tw(PrimaryButtonBase)`basis-3/4 mx-3 p-0`
const AddRecipeButton = tw(PrimaryButtonBase)`basis-1/4 ml-3 p-0`
const ButtonContainer = tw.div`inline-flex w-full`

export default ({
  subheading = "Recipes",
  heading = <>Your one<span tw="text-primary-500"> stop shop for new</span><wbr/>and delicious recipes.</>,
  description = "Select ingredients to find recipes that meet your needs or search directly for what you're looking for.",
  submitButtonText = "Search recipes",
  addButtonText = "Add",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
  searchFor
}) => {
  const [parameters, setParameters] = useState([]);
  const [query, setQuery] = useState("");
  const ref = useRef(null);
  let navigate = useNavigate();
  // Update the search query while user types, and add it to search when enter is pressed
  const handleQuery = event => {
    const newValue = event.target.value;
    setQuery(newValue.toLowerCase());
    if(event.key === "Enter"){
      addParameter();
    }
  }

  // Add an parameter to filter the search by
  const addParameter = () => {
    const elements = new Set(parameters);
    if(!elements.has(query) && query !== ""){
      setParameters([...parameters, query]);
    }
  }

  // Remove an entered Parameter
  const removeParameter = index => {
    setParameters([...parameters.filter(parameter => parameters.indexOf(parameter) !== index)])
  }
  const linkToAddRecipe = () => { 
    const path = '/addrecipe'
    navigate(path);
  }
  
  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}

            <Search>
                <Input 
                  type="ingredients" 
                  name="search"
                  placeholder="Search for recipes here ..." 
                  onKeyUp={handleQuery}/>
                <AddButton type="button" onClick={addParameter}>{addButtonText}</AddButton>
            </Search>
            <TagContainer>
              {parameters.map((parameter, index) => (
                <Tag key={parameter}>
                  <span>{parameter}</span>
                  <CloseIcon onClick={() => removeParameter(index)}></CloseIcon>
                </Tag>
              ))}
            </TagContainer>
            <Form action={formAction} method={formMethod}>
              <ButtonContainer>
                <SubmitButton type="Search" onClick={() => searchFor(parameters)}>{submitButtonText}</SubmitButton>
                <AddRecipeButton onClick={linkToAddRecipe}>Add a New Recipe!</AddRecipeButton>
              </ButtonContainer>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
