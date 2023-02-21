import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
//import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import RecipeSearchBar from "components/forms/SearchBarWithIllustration";
import SearchCardGrid from "components/cards/SearchThreeColGrid.js";

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <RecipeSearchBar />
      <SearchCardGrid />
      <Footer />
    </AnimationRevealPage>
  );
};
