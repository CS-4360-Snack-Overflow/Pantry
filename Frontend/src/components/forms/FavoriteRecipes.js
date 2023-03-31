import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { SectionHeading } from "components/misc/Headings.js";

const Heading = tw(SectionHeading)`mt-4 font-black text-right text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecipeList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

const RecipeListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const RecipeTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const RecipeDescription = styled.div`
  font-size: 14px;
  color: #777;
`;

const UserFavoritesPage = () => {
  const favoriteRecipes = [
    { id: 1, title: "Test", description: "Desc" },
    { id: 2, title: "Test", description: "Desc" },
    { id: 3, title: "Test", description: "Desc" },
  ];

  return (
    <Container>
      <Heading>My Favorite Recipes</Heading>
      <RecipeList>
        {favoriteRecipes.map((recipe) => (
          <RecipeListItem key={recipe.id}>
            <div>
              <RecipeTitle>{recipe.title}</RecipeTitle>
              <RecipeDescription>{recipe.description}</RecipeDescription>
            </div>
            <button>Edit</button>
          </RecipeListItem>
        ))}
      </RecipeList>
    </Container>
  );
};

export default UserFavoritesPage;