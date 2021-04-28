
// search term can be one word or several words
// but search starts when term >= 3 chars

const {includes} = require("lodash");

let resultsList = []; // list of recipes matching search
let suggestions = [];
let matchFound = false;
let partialMatch = false;


export function search(allRecipes, searchterm) {

    allRecipes.forEach( recipe => {

        searchInName(recipe.name, searchterm);
        if (matchFound) { 
            
            if ( !resultsList.includes(recipe)){ // prevents multiple addings when user continues typing word that has already been found - ideally, search should stop if matches are found?
                resultsList.push(recipe);  // => will be passed to module to order displaying of these
            }
        }
        // searchInDescription(recipe.description, searchterm){}
        // searchInIngredients(recipe.ingredients, searchterm) {}
    });
    
    console.log('resultsList==', resultsList);
}

// find string in array : array.includes(term)
// find object in array : array.find(({key}) => key === term )
// find object Index in array : array.findIndex(({key}) => key === term )


function searchInName(name, searchterm) {

    let arrayFromName = name.toLowerCase().split(' ');  // 'Soupe de concombre' => [ 'soupe', 'de', 'concombre' ]

    // SCENARIO 1
    // part of a word in array matches current searchterm // ex : searchterm = 'soup' - => should match 'soupe'
    arrayFromName.filter(word => { 
        
        
        if (word.includes(searchterm)) { 

            console.log(' search is ==', searchterm, 'word matching is==', word);

            if ( !suggestions.includes(word)) { suggestions.push(word); } // store suggestion in array: all words beginning with these letters
            console.log('suggestions==', suggestions);

            matchFound = true;
            
        } 
        else { matchFound = false; }
    });
    
    return matchFound;
    
    // whole array word matches searchterm  // ex : searchterm = 'concombre'  - => should match 'soupe de concombre'
/*     if ( arrayFromName.includes(searchterm) ) { // true/false
        suggestions.push(name);  // store suggestion in array

        matchFound = true;
        return matchFound;

    } else {
        matchFound = false;
    } */
}


