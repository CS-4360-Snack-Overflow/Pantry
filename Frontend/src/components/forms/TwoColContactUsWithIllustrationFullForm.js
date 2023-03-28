import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`flex justify-center max-w-xl mx-auto md:max-w-none md:mx-0`; 
const Header = tw(SectionHeading)`mt-4 font-black text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`
const TopForm = tw.form`flex justify-center pt-80 md:pt-12 mt-8 md:mt-10 text-base flex`
const RowForm = tw.form`flex justify-center pt-2 mt-8 md:mt-10 text-base flex`
const ColForm = tw.form`mt-8 md:mt-10 p-2 w-1/2 text-sm flex flex-col`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 w-full focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`${tw`h-24`}`
const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8 w-1/6`

export default ({
  heading = <>Feel free to <span tw="text-primary-500">get in touch</span><wbr/> with us.</>,
  description = "We understand that things don't always as planned. If you have any questions or concerns, please reach out.",
  submitButtonText = "Send",
  formAction = "#",
  formMethod = "get",
}) => {

  return (
    <Container>
      <TopForm>
        <Header>{heading}</Header>
      </TopForm>
      <RowForm>
        {description && <Description>{description}</Description>}
      </RowForm>
      <Column>
        <ColForm action={formAction} method={formMethod}>
          <Input type="email" name="email" placeholder="Your Email Address" />
          <Input type="text" name="name" placeholder="Your Full Name" />
          <Input type="text" name="subject" placeholder="Email Subject" />
          <Textarea name="message" placeholder="Your Message Here" />
        </ColForm>
      </Column>
      <RowForm>
        <SubmitButton type="submit">{submitButtonText}</SubmitButton>
      </RowForm>

      <TwoColumn>
      </TwoColumn>
    </Container>
  );
};
