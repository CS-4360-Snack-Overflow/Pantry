import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
//import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import AddRecipeForm from "components/forms/AddRecipeForm";
import { useLocation } from "react-router-dom";

const Heading = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-center pt-10 md:pt-24`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
export default () => {
  const state = useLocation().state;
  console.log(state)
  const recipe = state.clickedRecipe
  return (
    <AnimationRevealPage>
      <Header />
      <img src={recipe.poster_image_url}></img>
      <Heading>{recipe.name}</Heading>     
      <Footer />
    </AnimationRevealPage>
  );
};
