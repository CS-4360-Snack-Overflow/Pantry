import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithVideo.js";
import Features from "components/features/ThreeColSimple.js";
//import MainFeature from "components/features/TwoColWithButton.js";
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js";
import TabGrid from "components/cards/TabCardRecipeGrid.js";
import TabNavGrids from "components/cards/TabCardNavGrid.js";
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js";
//import DownloadApp from "components/cta/DownloadApp.js";
//Old footer
//import Footer from "components/footers/FiveColumnWithInputForm.js";
import Footer from "components/footers/MiniCenteredFooter";
import chefIconImageSrc from "images/chef-icon.svg";
import celebrationIconImageSrc from "images/celebration-icon.svg";
import shopIconImageSrc from "images/shop-icon.svg";
import {getRecipes} from "../helpers/RecipeService.js"

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  //const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
  //const Description = tw.span`inline-block mt-8`;
  const imageCss = tw`rounded-4xl`;
  const [recipes, setRecipes] = useState([])
  useEffect(()=>{
    setRecipes(loadRecipes("All"))
  }, [])
  async function loadRecipes(_, filter){
    getRecipes(`filter=${filter}`).then((result) => {
      setRecipes(result);
  })
  }
  return (
    <AnimationRevealPage>
      <Hero
        heading={<>Delicious Recipes <HighlightedText>Meals Made easy</HighlightedText></>}
        description="Tired of not knowing what to make or having to shop to make your meal? Look no further, make delicious food with what you have in your pantry!"
        imageSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Search Now"
        primaryButtonUrl="/recipes"
        watchVideoButtonText="Quick Recipes"
      />
       
      <TabGrid loadRecipes={loadRecipes} recipes={recipes}
        heading={
          <>Checkout our <HighlightedText>trending</HighlightedText> recipes</>
        }
      />
      <TabNavGrids
        heading={
          <> <HighlightedText>Pages</HighlightedText></>
        }
      />
      <Features
        heading={
          <>Amazing Selection for any <HighlightedText>Occasion</HighlightedText></>
        }
        cards={[
          {
            imageSrc: shopIconImageSrc,
            title: "230+ Resturant Recipes",
            description: "Resturant meals, home cooked, same taste",
            url: "/about"
          },
          {
            imageSrc: chefIconImageSrc,
            title: "Professional Chefs",
            description: "Learn how the pro's make their food",
            url: "/about"
          },
          {
            imageSrc: celebrationIconImageSrc,
            title: "Celebrations",
            description: "Meals made for the best occasions",
            url: "/about"
          }
        ]}
        imageContainerCss={tw`p-2!`}
        imageCss={tw`w-20! h-20!`}
      />
      <MainFeature2
        subheading={<Subheading>A Reputed Brand</Subheading>}
        heading={<>Why <HighlightedText>Choose Us?</HighlightedText></>}
        statistics={[
        ]}
        primaryButtonText="Learn More"
        primaryButtonUrl="/about"
        imageInsideDiv={false}
        imageSrc="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzNzI2fQ&auto=format&fit=crop&w=768&q=80"
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      />
      <Testimonial
        subheading=""
        heading={<>Novice Chefs <HighlightedText>Love Us</HighlightedText></>}
      />
      <Footer />
    </AnimationRevealPage>
  );
}
