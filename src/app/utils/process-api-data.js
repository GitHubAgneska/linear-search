
/* ================================================== */
/* ALL METHODS USED TO PROCESS INCOMING API DATA
/* ================================================== */

// recipe -> 'ingredients' : [ { 'ingredient': 'sucre', 'quantity': 300, 'UNIT': 'grammes'} ] => 'grammes' => 'g'

// any character that is not a word character or whitespace
const regexNotCharOrWhiteSpace = /[^\w\s]/g;
const parenthesesRegExp = /\(([^)]+)\)/;
const endsWithCommaOrPeriodRegex = /\.|,$/i;

// process string to escape/remove parentheses -> ex: 'thon rouge (ou blanc)' => 'thon rouge ou blanc'
export function removeSpecialChars(str){  
    let index = str.search(parenthesesRegExp); // = returns inde
    if( index !== -1 ) {
        console.log('contains parentheses', index);
        let result = str.substring(0, index-1 ).concat(str.substring(index+1, str.length-1));
        removeSpecialChars(result);
    } else { 
        return;
    }
    return;
}

// remove ponctuation at the end of a string
export function removePonctuation(str) {
    if ( endsWithCommaOrPeriodRegex.test(str) ) {
        return str.substring(0, str.length-1); 
    }
}

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