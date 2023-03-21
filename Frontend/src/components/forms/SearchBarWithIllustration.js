import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

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

const Search = tw.form`inline-flex max-w-lg`
const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-md mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500 basis-3/4`

const AddButton = tw(PrimaryButtonBase)`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow basis-1/4`
const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

export default ({
  subheading = "Recipes",
  heading = <>Your one<span tw="text-primary-500"> stop shop for new</span><wbr/>and delicious recipes.</>,
  description = "Select ingredients to find recipes that meet your needs or search directly for what you're looking for.",
  submitButtonText = "Search recipes",
  addButtonText = "Add",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  const [ingredients, setIngredients] = useState([])

  const handleSubmit = event => {
    const newValue = this.input.value;
    setIngredients(prevArray => [...prevArray, newValue]);
  };

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
            <Search onSubmit = {this.handleSubmit}>
                <Input type="ingredients" name="search" placeholder="Search for recipes here ..." ref={input => this.input = input}/>
                <AddButton type="submit">{addButtonText}</AddButton>
                <p>{ingredients}</p>
            </Search>
            <Form action={formAction} method={formMethod}>
              <SubmitButton type="Search">{submitButtonText}</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
