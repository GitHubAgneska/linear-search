
// search term can be one word or several words
// but search starts when term >= 3 chars

import {RecipeModule} from '../modules/recipes';


let resultsList = []; // list of recipes matching search
let suggestions = []; // list of suggested words matching search

// search term in recipes list
export function search(recipes, searchterm) {
    resultsList = [];suggestions = []; // reset these 2 at every new keystroke
    RecipeModule.resetSuggestions(); // reset displayed suggestions list

    recipes.forEach( recipe => {
        searchInName(recipe, recipe.name, searchterm); // search term in each recipe name
        searchInDescription(recipe, recipe.description, searchterm); // search term in each recipe description
        searchInIngredients(recipe, recipe.ingredients, searchterm); // search term in each recipe ingredients
    });

    console.log('results=====',resultsList );
    console.log('CURRENT suggestions for word ==', suggestions);

    if (resultsList.length > 0) {
        RecipeModule.setResults(resultsList); // return updated results array to Module
        // RecipeModule.storeSearchResults(resultsList); // return updated results array to Module
    } else {
        console.log('NO RESULTS FOUND IN RECIPES NAMES');
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
                console.log(' searching for ==', searchterm, 'match in name is==', word);

                // (if not there already) store suggestion in array : all words beginning with these letters
                if ( !suggestions.includes(word)) {
                    // CASE ONE - suggest word : search 'soup' will suggest 'soupe', not 'soupe de concombre' 
                    suggestions.push(word);

                    // CASE 2 - - suggest whole name : search 'soup' will suggest 'soupe de concombre', 'soupe de radis' etc
                    // suggestions.push(name);

                    // delegate suggestion to module to display it
                    RecipeModule.addSuggestionInList(word);
                }

                if ( !resultsList.includes(recipe)){  // prevents multiple addings when user continues typing word that has already been found - ideally, search should stop if matches are found?
                    resultsList.push(recipe); // store recipes in array: all recipes names  containing these letters
                }
            }
    });
    return resultsList;
}

// in description, we need to retrieve matching ingredients, and skip verbs
// ex : 'poi' => should find 'poivre' and skip 'poivrez'
// + skip ',' in 'poivre,'
function searchInDescription(recipe, description, searchterm){

    let arrayFromDesc = description.toLowerCase().split(' ');  // 'Eplucher les concombres, poivrez, ' => [ 'eplucher', 'les', 'concombres', 'poivrez,' ,  ]

    // search match in each word of the description
    arrayFromDesc.filter(word => {

        // identify verbs to skip ( words ending with 'er' or 'ez' + eventually comma/period )
        let isAverbRegex = /e(z|r)+(\.?|,?)$/i;
        // identify words ending with comma/period = NOT to skip
        let endsWithCommaOrPeriodRegex = /\.|,$/i;

        // if part of a word in array matches current searchterm 
        // ex : searchterm = 'concomb' - => should match 'concombre' in [ 'eplucher', 'les', 'concombres' ]
        
        // if word includes searchterm and is not a verb
        if ( word.includes(searchterm) && !(isAverbRegex.test(word))) {
            
            console.log(' searching for ==', searchterm, 'match in description is==', word);

            // if matching word ends with comma/period : remove them ()
            if ( endsWithCommaOrPeriodRegex.test(word) ) {
                // console.log('should be corrected: ', word);
                return word.substring(0, word.length-1); 
            }
            // (if not there already) store suggestion in array : all words beginning with these letters
            if ( !suggestions.includes(word)) {
                // CASE ONE - suggest word : search 'soup' will suggest 'soupe', not 'soupe de concombre' 
                suggestions.push(word);

                // delegate suggestion to module to display it
                RecipeModule.addSuggestionInList(word);
            }
            // prevent multiple addings when user continues typing word that has already been found - ideally, search should stop if matches are found?
            if ( !resultsList.includes(recipe)){
                resultsList.push(recipe); // store recipes in array: all recipes whose description contain serach term
            }
        }
    });
    return resultsList;
}


function searchInIngredients(recipe, recipeIngredients, searchterm){

    // recipe ingredients is an array of objects
    // match search occurs in 1st key/value of each object (ignoring rest of ingredients key/values : 'unit' and 'quantity')  
    // ex : recipe.ingredients :[ { 'ingredient':'concombre'}, { 'ingredient':'citron'} ]
    recipeIngredients.forEach( item => {
        if (item.key === 'ingredient') {
            let ingredientName = item.value;

            // ingredientName can be one word or several words

            if ( ingredientName.includes(searchterm) ) {
                if ( !suggestions.includes(ingredientName)) {
                    // CASE ONE - suggest word : search 'lait' will not suggest 'chocolat au lait' 
                    suggestions.push(ingredientName);
    
                    // delegate suggestion to module to display it
                    RecipeModule.addSuggestionInList(ingredientName);
                }
                // prevent multiple addings when user continues typing word that has already been found - ideally, search should stop if matches are found?
                if ( !resultsList.includes(recipe)){
                    resultsList.push(recipe); // store recipes in array: all recipes whose description contain serach term
                }
            }
        }
    });
    return resultsList;
}



