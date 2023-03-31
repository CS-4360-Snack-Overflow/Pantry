import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";

const Container = tw.div`right-0`;
const Heading = tw(SectionHeading)`mt-4 font-black text-right text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

const RecipeList = tw.ul`my-8 divide-y divide-gray-400`;

const RecipeItem = tw.li`py-4 flex justify-between items-center`;

const RecipeName = tw.span`text-lg font-medium text-gray-900`;

const RecipeDescription = tw.p`text-gray-500`;

export default ({ recipes = [] }) => {
  return (
    <Container>
      <Heading>My Recipes</Heading>
      <RecipeList>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id}>
            <RecipeName>{recipe.name}</RecipeName>
            <RecipeDescription>{recipe.description}</RecipeDescription>
          </RecipeItem>
        ))}
      </RecipeList>
    </Container>
  );
};