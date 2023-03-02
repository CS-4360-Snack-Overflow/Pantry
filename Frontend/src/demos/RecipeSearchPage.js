import React, {useState, useEffect} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import RecipeSearchBar from "components/forms/SearchBarWithIllustration";
import TabCardGrid from "components/cards/TabCardGrid.js";

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <RecipeSearchBar />
      <TabCardGrid />
      <Footer />
    </AnimationRevealPage>
  );
};
