import React, {useState, useEffect} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import RecipesWithSearchbar from "components/features/RecipesWithSearchbar";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};

export default () => {
  return (
    <ScrollToTop>
    <AnimationRevealPage>
      <Header />
      <RecipesWithSearchbar />
      <Footer />
    </AnimationRevealPage>
    </ScrollToTop>
  );
};
