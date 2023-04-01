import React, { useEffect } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
//import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import UserForm from "components/forms/UserForm";
import UserRecipe from "components/forms/UserRecipe";
import FavoriteRecipes from "components/forms/FavoriteRecipes"
import { useState } from "react";
const Heading = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-left pt-10 md:pt-24 w-full`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;

const RecipeContainer = tw.div`border-2 border-solid border-orange-500 rounded-lg p-4 mx-2 w-full md:w-2/5`;

export default () => {
  const [user, setUser] = useState([])
  
  useEffect(()=>{console.log(user)}, [user])

  useEffect(()=>{
    async function getUser(){
      const res = await fetch("/user/userRead")
      return await res.json()
    }
    getUser().then((result) => {
      setUser(result)
    }
    )
  }, [])

  return (
    <AnimationRevealPage>
      <Header />
      <Heading><HighlightedText>Profile</HighlightedText></Heading>
      <div css={tw`flex flex-wrap justify-center md:justify-between`}>
        <UserForm userData={user} css={tw`w-full md:w-2/5 mx-2`} />
        <RecipeContainer>
        <FavoriteRecipes css={tw`w-full md:w-2/5 mx-2`} />
        </RecipeContainer>
        <RecipeContainer>
        <UserRecipe css={tw`w-full md:w-2/5 mx-2 float-right`} />
        </RecipeContainer>
      </div>
      
      <Footer />
    </AnimationRevealPage>
  );
};