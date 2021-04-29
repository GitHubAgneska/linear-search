
// search term can be one word or several words
// but search starts when term >= 3 chars

import {RecipeModule} from '../modules/recipes';


let resultsList = []; // list of recipes matching search
let suggestions = [];


// search term in recipes list
export function search(recipes, searchterm) {

    recipes.forEach( recipe => {
        searchInName(recipe, recipe.name, searchterm); // search term in each recipe name
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

// search in each recipe name
function searchInName(recipe, name, searchterm){

    let arrayFromName = name.toLowerCase().split(' ');  // 'Soupe de concombre' => [ 'soupe', 'de', 'concombre' ]
    
    // search match in each word of the name (or in word if name = one word)
    arrayFromName.filter(word => { 
        
        // if part of a word in array matches current searchterm 
        // ex : searchterm = 'soup' - => should match 'soupe' in [ 'soupe', 'de', 'concombre' ]
            if (word.includes(searchterm)) { 
                console.log(' search is ==', searchterm, 'word matching is==', word);

                // (if not there already) store suggestion in array : all words beginning with these letters
                if ( !suggestions.includes(word)) { suggestions.push(word); }

                // delegate result to module to use it
                RecipeModule.addSuggestionsList(searchterm, suggestions);
                // RecipeModule.processSearchSuggestions(searchterm, suggestions);

                if ( !resultsList.includes(recipe)){  // prevents multiple addings when user continues typing word that has already been found - ideally, search should stop if matches are found?
                    resultsList.push(recipe); // store recipes in array: all recipes names  containing these letters
                }
            }
    });
    return resultsList;
}



