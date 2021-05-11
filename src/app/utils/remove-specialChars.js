import { result } from "lodash";


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
        return removeSpecialChars(result);
    } else { 
        return result;
    }

}

// process string to remove ponctuation at the end of the word
export function removePonctuation(str) {

    if ( endsWithCommaOrPeriodRegex.test(str) ) {
        return str.substring(0, str.length-1); 
    }
}