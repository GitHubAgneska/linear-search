
// search term can be one word or several words
// but search starts when term >= 3 chars

const {includes} = require("lodash");

let resultsList = [];
let suggestions = [];
let matchFound = false;
let partialMatch = false;


export function search(allRecipes, searchterm) {

    allRecipes.forEach( recipe => {

        searchInName(recipe.name, searchterm);
        if (matchFound) { console.log(recipe.name); }
    
        // searchInDescription(recipe.description, searchterm){}
    
        // searchInIngredients(recipe.ingredients, searchterm) {}

    });


}

// find string in array : array.includes(term)
// find object in array : array.find(({key}) => key === term )
// find object Index in array : array.findIndex(({key}) => key === term )


// ex : searchterm = 'concombre'  - => should match 'soupe de concombre'
// ex : searchterm = 'soup' - => should match 'soupe'

function searchInName(name, searchterm) {

    // console.log('searchterm==', searchterm);

    let arrayFromName = name.toLowerCase().split(' ');  // 'soupe de concombre' => [ 'soupe', 'de', 'concombre' ]
    // console.log(arrayFromName);

    // part of a word in array matches searchterm
    arrayFromName.filter(word => { 
        if (word.includes(searchterm)){
            console.log(' search is ==', searchterm, 'word matching is==', word);
            suggestions.push(word); // store suggestion in array
            matchFound = true;
            return matchFound;

        } else { matchFound = false; }
    });

    
    // whole array word matches searchterm
    /* if ( arrayFromName.includes(searchterm) ) { // true/false
        suggestions.push(name);  // store suggestion in array

        matchFound = true;
        return matchFound;

    } else {
        matchFound = false;
    } */
}


