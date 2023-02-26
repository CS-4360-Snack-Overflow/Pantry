import React, {useState, useEffect} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
<<<<<<< HEAD:Frontend/src/demos/ServiceLandingPage.js
import Footer from "components/footers/MiniCenteredFooter";
//import RecipeSearchBar from "components/forms/SearchBarWithIllustration";
//import SearchCardGrid from "components/cards/SearchThreeColGrid.js";
import RecipeGrid from "components/cards/TabCardRecipeGrid.js";
=======
import Footer from "components/footers/FiveColumnWithInputForm.js";
import RecipeSearchBar from "components/forms/SearchBarWithIllustration";
import TabCardGrid from "components/cards/TabCardGrid.js";
>>>>>>> c4de3c649a3a994f3b6df78ecbecb9f44174628c:Frontend/src/demos/RecipeSearchPage.js

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
