import RecipeSearchBar from "components/forms/SearchBarWithIllustration";
import TabCardRecipeGrid from "components/cards/TabCardRecipeGrid.js";
import {getRecipes} from "../../helpers/RecipeService.js"
import { useState, useEffect } from "react";
import { SectionHeading } from "components/misc/Headings.js";
import tw from "twin.macro";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

export default () => {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [url, setUrl] = useState("");
    const [loadedFilter, setFilter] = useState("");
    const [loadedIngredients, setIngredients] = useState([])

    useEffect(() => {
        loadRecipes([], "All");
    }, [])

    useEffect(() => {
        console.log(url)
        getRecipes(url).then((result) => {
            setRecipes(result);
            setLoading(false);
        })
    }, [url])

    const loadRecipes = (selectedIngredients, filter = loadedFilter, writeUrl = true) => {
        let query
        if(writeUrl){
            query = new URLSearchParams(selectedIngredients.map(value => ['ingredients', value]));
            setIngredients(selectedIngredients);
        }
        else {
            query = new URLSearchParams(loadedIngredients.map(value => ['ingredients', value]));
            setFilter(filter)
        }
        query.append('filter', filter);
        setUrl(query.toString());  
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
  