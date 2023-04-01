import React, {useState, useEffect} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import RecipesWithSearchbar from "components/features/RecipesWithSearchbar";

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <RecipesWithSearchbar />
      <Footer />
    </AnimationRevealPage>
  );
};
