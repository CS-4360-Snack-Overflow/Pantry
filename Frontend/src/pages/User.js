import React, { useEffect } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
//import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import UserForm from "components/forms/UserForm";
import UserRecipes from "components/forms/UserRecipes"
import { useState } from "react";
import {getCreatedRecipes} from "../helpers/RecipeService"

const Heading = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-left pt-10 md:pt-24 w-full`;
const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 pt-6 transform -skew-x-12 inline-block`;

const RecipeContainer = tw.div`border-2 border-solid border-orange-500 rounded-lg p-4 mx-2 w-full md:w-2/5`;

export default () => {
  const [user, setUser] = useState([])
  const [createdRecipes, setCreated] = useState([])
  const [favoritedRecipes, setFavorited] = useState([])

  useEffect(()=>{
    async function getUser(){
      const res = await fetch("/user/userRead")
      return await res.json()
    }

    getUser().then((result) => {
      setUser(result)
    })

    getCreatedRecipes().then((result) => {
      setCreated(result)
    })
  }, [])

  return (
    <AnimationRevealPage>
      <Header />
      <Heading><HighlightedText>Profile</HighlightedText></Heading>
      <div css={tw`flex flex-initial max-[1023px]:flex-col justify-center justify-between pb-10`}>
        <UserForm userData={user} css={tw`w-full md:w-2/5 mx-2`}/>
        <RecipeContainer>
        <UserRecipes css={tw`w-full md:w-2/5 mx-2`} heading="Favorited Recipes" recipes={favoritedRecipes}/>
        </RecipeContainer>
        <RecipeContainer>
        <UserRecipes css={tw`w-full md:w-2/5 mx-2`} heading="My Recipes" recipes={createdRecipes}/>
        </RecipeContainer>
      </div>
      <Footer />
    </AnimationRevealPage>
  );
};