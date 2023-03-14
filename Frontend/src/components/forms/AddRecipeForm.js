import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { CustomButton as CustomButtonBase } from "components/misc/Buttons.js";
//import EmailIllustrationSrc from "images/email-illustration.svg";
 
const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const TwoRow = tw.div`flex justify-start mx-auto py-20 md:py-24`;
const Row = tw.div`flex w-full max-w-xl mx-auto md:max-w-none md:mx-0`;
const Column = tw.div`flex w-full max-w-xl mx-auto md:max-w-none md:mx-0`;
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
const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col lg:flex-row`
const RowForm = tw.form`flex justify-center pt-32 mt-8 md:mt-10 text-base flex`
const Input = tw.input`border-2 px-5 py-3 rounded focus:outline-none font-medium transition duration-150 hocus:border-primary-500`
const RowInput = tw.input`border-2 px-5 py-3 w-1/3 rounded focus:outline-none font-medium transition duration-150 focus:border-primary-500`
const SubmitButton = tw(PrimaryButtonBase)`inline-block lg:ml-6 mt-6 lg:mt-0`
const SubmitButtonRow = tw(CustomButtonBase)`inline-block ml-2 lg:ml-4 mt-0`
 
export default ({
  subheading = "Subheading text",
  heading = <>Heading <span tw="text-primary-500">text</span><wbr/> </>,
  description = "Text here.",
  submitButtonText = "Button text",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  return (
    <Container>

      <RowForm action={formAction} method={formMethod}>
      <CustomDescription>Recipe Name </CustomDescription>
        <RowInput type="text" name="recipeInstructions" placeholder="Recipe Name" />
        <SubmitButtonRow type="submit">{submitButtonText}</SubmitButtonRow>
      </RowForm>

      <TwoColumn>
      <Heading>{heading}</Heading>
          <Description>{description}</Description>
          <Form action={formAction} method={formMethod}>
            <textarea placeholder="description" />
            <SubmitButton type="submit">{submitButtonText}</SubmitButton>
          </Form>
        {/* <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <Form action={formAction} method={formMethod}>
              <Input type="email" name="email" placeholder="Placeholder text" />
              <SubmitButton type="submit">{submitButtonText}</SubmitButton>
            </Form>
          </TextContent> */}
        <TextContent>
          <Heading>{heading}</Heading>
          <Description>{description}</Description>
          <Form action={formAction} method={formMethod}>
            <Input type="text" name="recipeInstructions" placeholder="Placeholder text" />
            <SubmitButton type="submit">{submitButtonText}</SubmitButton>
          </Form>
        </TextContent>
      </TwoColumn>
    </Container>
  );
};
