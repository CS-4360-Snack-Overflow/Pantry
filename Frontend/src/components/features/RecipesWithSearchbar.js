import tw from "twin.macro";
import styled from "styled-components";
import RecipeSearchBar from "components/forms/SearchBarWithIllustration";
import TabCardRecipeGrid from "components/cards/TabCardRecipeGrid.js";
import {getRecipes} from "../../helpers/RecipeService.js"
import { useState, useEffect } from "react";
import { SectionHeading } from "components/misc/Headings.js";

export default () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("");

    
    useEffect(() => {
        getRecipes(url)
        .then((result) => {
            setRecipes(result);
            setLoading(false);
            console.log(recipes)
        })
    }, [])

    const sortRecipes = (recipes, activeTab) => {
        switch(activeTab){
            case "Popular":
                return
            default:
                return
        }
    }

    const searchRecipes = (ingredients) => {
        setUrl(new URLSearchParams(ingredients.map(value => ['ingredients', value])).toString());
        getRecipes(url).then((result) => {
            setRecipes(result);
            setLoading(false);
            console.log(recipes)
        })
    }

    if(loading) {
    return (
        <div>
            <RecipeSearchBar searchFor={searchRecipes}/> 
            <SectionHeading>Loading...</SectionHeading>
        </div>
    );
    } else {
        return (
            <div>
                <RecipeSearchBar searchFor={searchRecipes}/> 
                <TabCardRecipeGrid sort={sortRecipes} recipes={recipes}/>
            </div>
        );
    }    
  };
  