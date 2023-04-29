import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { deleteRecipe } from "helpers/RecipeService";
import { removeFavoriteRecipe } from "helpers/UserService";

// This is the styling for the form

const Heading = tw(SectionHeading)`mt-4 font-black text-right text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Button = tw(PrimaryButtonBase)`inline-block p-3`

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



export default ({recipes = [], heading = "", authorized=false}) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <RecipeList>
        {recipes.map((recipe, index) => (
          <RecipeListItem key={index}>
            <div>
              <RecipeTitle>{recipe.name}</RecipeTitle>
            </div>
            {authorized && (
              <div>
                <Link to="/addrecipe" state= {{recipe:recipe}}>
                  <Button type="Edit">Edit</Button>
                </Link>
                <Button onClick={()=>{deleteRecipe(recipe._id); window.location.href='/user'}}>Delete Recipe</Button>
              </div>

            )}

            {!authorized && ( 
              <div>
                <Link to="/recipedetails" state= {{clickedRecipe:recipe}}>
                  <Button type="View">View Recipe</Button>
                </Link>
                <Button onClick={() => {removeFavoriteRecipe(recipe._id); window.location.href='/user'}}>Unfavorite</Button>
              </div>
            )}
          </RecipeListItem>
        ))}
      </RecipeList>
    </Container>
  );
};