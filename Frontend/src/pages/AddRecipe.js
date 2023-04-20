import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
//import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import AddRecipeForm from "components/forms/AddRecipeForm";

import { useEffect } from 'react';

const Heading = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-center pt-10 md:pt-24`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
 
export default () => {
  useEffect(()=>{
    fetch('/user/testAuth')
      .then(response => response.json())
      .then(data => {
	if(!data.active) {
	 window.location.href = "/login";
	}
      });
  }, [])
  return (
    <AnimationRevealPage>
      <Header />
      <Heading>Share Your <HighlightedText>Recipes</HighlightedText></Heading>
      <div css={tw`w-full`}>
      <AddRecipeForm />
      </div>
      <Footer />
    </AnimationRevealPage>
  );
};
