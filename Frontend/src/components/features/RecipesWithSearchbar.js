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
        loadRecipes([], "All");
    }, [])

    // const sortRecipes = (recipes, activeTab) => {
    //     switch(activeTab){
    //         case "Popular":
    //             return
    //         default:
    //             return
    //     }
    // }

    const loadRecipes = (ingredients, filter) => {
        if(ingredients.length !== 0){
            setUrl(new URLSearchParams(ingredients.map(value => ['ingredients', value])).toString());
        }
        getRecipes(url, filter).then((result) => {
            setRecipes(result);
            setLoading(false);
        })
    }

    if(loading) {
    return (
        <div>
            <RecipeSearchBar searchFor={loadRecipes}/> 
            <SectionHeading>Loading...</SectionHeading>
        </div>
    );
    } else {
        return (
            <div>
                <RecipeSearchBar searchFor={loadRecipes}/> 
                <TabCardRecipeGrid loadRecipes={loadRecipes} recipes={recipes}/>
            </div>
        );
    }    
  };
  