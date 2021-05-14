
/* ================================================== */
/* ALL METHODS USED TO PROCESS INCOMING API DATA
/* ================================================== */

import { result } from "lodash";

// recipe -> 'ingredients' : [ { 'ingredient': 'sucre', 'quantity': 300, 'UNIT': 'grammes'} ] => 'grammes' => 'g'

// any character that is not a word character or whitespace
const regexNotCharOrWhiteSpace = /[^\w\s]/g;
const parenthesesRegExp = /\(([^)]+)\)/;
const endsWithCommaOrPeriodRegex = /\.|,$/i;
const eContainsAccentRegex = /[èéêë]/g;
const iContainsAccentRegex = /[î]/g;

export function checkString(str) {
    removeSpecialChars(str);
    replaceAccents(str);
    removePonctuation(str);
}

// STRINGS --------------------------------------------------------------------------------------------------
// process string to escape/remove parentheses -> ex: 'thon rouge (ou blanc)' => 'thon rouge ou blanc'
export function removeSpecialChars(str){  
    let index = str.search(parenthesesRegExp); // = returns inde
    if ( index !== -1 ) {
        // console.log('contains parentheses', index);
        let result = str.substring(0, index-1 ).concat(str.substring(index+1, str.length-1));
        removeSpecialChars(result);// check again
    } else { 
        return str;
    }
    return result;
}

// replace accented 'e' char with regular 'e' char - ex: 'crême' -> 'creme'
export function replaceAccents(str) {
    if (eContainsAccentRegex.test(str)) {  
        let indexOfAccent = str.search(eContainsAccentRegex);
        let result =  str.replace(str.charAt(indexOfAccent), 'e');
        return replaceAccents(result); // check again
    }
    if (iContainsAccentRegex.test(str)) {  
        let indexOfAccent = str.search(iContainsAccentRegex);
        let result =  str.replace(str.charAt(indexOfAccent), 'i');
        return replaceAccents(result); // check again
    }
    else { let result = str; return result; }
}

// remove ponctuation at the end of a string
export function removePonctuation(str) {
    if ( endsWithCommaOrPeriodRegex.test(str) ) {
        return str.substring(0, str.length-1); 
    }
}


// ARRAYS --------------------------------------------------------------------------------------------------
// Prevent adding same word ending with/without 's' in ARRAYS: SUGGESTIONS/CATEGORY lists - ex : 'fraise' + 'fraises' => keep only 'fraises'
export function checkDoublonsBeforeAddingToArray(arr, str) {
        // current item === same exact word : skip
        let exactSame = arr.find(listItem => listItem === str);
        if ( exactSame ) { return; }

        // current item is SINGULAR & word already exists in PLURAL form : skip current
        let pluralSame = arr.find(listItem => listItem === str.concat('s'));
        if ( pluralSame ) { 
            // console.log('MATCHING pluralSame==', pluralSame, ':',str ); 
            return; }
        
        // current item is PLURAL & word already exists in SINGULAR form : remove previous and add current
        let singularSame = arr.find(listItem => listItem === str.substring(0, str.length -1));
        if ( singularSame ) { 
            // console.log('MATCHING singularSame==', singularSame, ':',str );
            let indexOfPrevious = arr.indexOf(singularSame);
            arr.splice(indexOfPrevious, 1, str); // replace previous singular by current plural 
        }
        else {
            str = str.toLowerCase();
            arr.push(str); } // no doublon found : insert new item in array
}

// OBJECTS --------------------------------------------------------------------------------------------------

// replaces 'grammes' with 'g' (string in object)
export function treatUnits(ingredientObject) {
    let ingredientUnit = ingredientObject.unit;
    let objectHasGrammesValue = Object.values(ingredientObject).includes('grammes');
    
    if (objectHasGrammesValue) {
        ingredientUnit = 'g';
        return ingredientObject.unit = ingredientUnit;
    }
    return ingredientObject;
}
// method that checks on ingredients 'quantity' and 'unit'
// so ingredients list displays proper spelling:
// ex: ALL quantifiable ingredients = plural form : if  there's NO 'UNITS' :  then ingredient must be of plural form ('S') : 'quantity' : 2 =>  'ingredient' : 'citronS'
// + inverse : ex: if 'quantity' === 1 , then unit should not take a 'S' -  ex: "quantity": 1,  "unit": "cuillère à soupe" 

// process object to either add or remove 's' at end of the word
export function checkUnitType(ingredientObject) {
    let ingredientName = ingredientObject.ingredient;
    // eslint-disable-next-line no-prototype-builtins
    let objectHasUnitProp = ingredientObject.hasOwnProperty('unit');
    let endsWithS = ingredientName.charAt(ingredientName.length-1) === 's';

    // first, check if object contains a 'unit' key
    if ( !objectHasUnitProp && !endsWithS ) { ingredientObject.ingredient = ingredientName.concat('S'); }

    console.log('ingredientObject corrected==', ingredientName);
    return ingredientObject;
}