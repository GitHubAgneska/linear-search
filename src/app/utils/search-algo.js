
// search term can be one word or several words
// but search starts when term >= 3 chars

import {RecipeModule} from '../modules/recipes';


let resultsList = []; // list of recipes matching search
let suggestions = [];


// search term in recipes list
export function search(recipes, searchterm) {

    recipes.forEach( recipe => {
        searchInName(recipe, recipe.name, searchterm); // search term in each recipe name
        return resultsList;
    });
    console.log('results=====',resultsList );
    if (resultsList.length > 0) {
        RecipeModule.processSearchResults(resultsList); // return updated results array
    } else {
        console.log('NO RESULTS FOUND IN RECIPES NAMES');
        // searchInDescription(recipe.description, searchterm){}
        // searchInIngredients(recipe.ingredients, searchterm) {}
    }
}


function searchInName(recipe, name, searchterm){
    let arrayFromName = name.toLowerCase().split(' ');  // 'Soupe de concombre' => [ 'soupe', 'de', 'concombre' ]
    
    arrayFromName.filter(word => { 
        
        // part of a word in array matches current searchterm // ex : searchterm = 'soup' - => should match all recipes names containing 'soupe'
        if (word.includes(searchterm)) { 
            console.log(' search is ==', searchterm, 'word matching is==', word);

            if ( !suggestions.includes(word)) { 
                suggestions.push(word); } // store suggestion in array: all words beginning with these letters
            
                RecipeModule.processSearchSuggestions(suggestions);

            if ( !resultsList.includes(recipe)){  // prevents multiple addings when user continues typing word that has already been found - ideally, search should stop if matches are found?
                resultsList.push(recipe); // store recipes in array: all recipes names  containing these letters
            }
        }
    });
    return resultsList;
}


