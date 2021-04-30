
import {RecipeFactory, IngredientFactory} from '../utils/recipe-factory';
import {Recipe, Ingredient} from '../utils/recipe-model';
import {SearchBar} from '../components/bootstrap-search-bar';
import {CollapsingMenu} from '../components/advanced-search-menu';
// import {CollapsingMenu} from '../components/bootstrap-collapseMenu';
import {CardTemplate} from '../components/bootstrap-card';
import {HeaderBaseTemplate} from '../components/header';
import {search} from '../utils/search-algo';

/* ================================================== */
/* MODULE IN CHARGE OF ALL COMPONENTS + LOGIC */
/* ================================================== */

export const RecipeModule = (function() {
    
    // private part of module
    
    // define vars
    const root = document.querySelector('#root'); // where 'main' content will be hosted
    const localUrl = './assets/data.json';
    let localData;
    let recipes = []; // to store fetched data
    const recipesList = []; // to store all recipes
    let ingredientsList = [];
    let appliancesList = [];
    let ustensilsList = [];

    let storedResults = [];

    // fetch all recipes
    fetch(localUrl)
    .then(response => {
        const contentType = response.headers.get('content-type');
        // console.log('contentType is==', contentType);
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('no JSON content was found!'); }
            return response.json();
        })
        .then(data => {
            localData = data;
            localData.recipes.map(d => {recipes.push(d); });
            initDefaultView(recipes);
        })
        .catch(error => console.log(error));


    function initDefaultView(recipes) {
        const header = new HeaderBaseTemplate();
        document.body.insertBefore(header, root);
        setUpMainSearchBar();
        initData(recipes);
    }

    // set up main search bar
    function setUpMainSearchBar(){
        const searchBar = new SearchBar();
        root.appendChild(searchBar);
    }

    // cast retrieved data into local recipe model
    // each recipe contains an ingredients array, an appliance string, an ustensils array 
    function initData(recipes) {
        let recipeFactory = new RecipeFactory();
        // let ingredientFactory = new IngredientFactory();

        // for each recipe of data, cast recipe into new recipe object
        recipes.forEach( recipe => {
            let newRecipe = recipeFactory.create(
                recipe.id,
                recipe.name,
                recipe.servings,
                recipe.ingredients,
                recipe.time,
                recipe.description,
                recipe.appliance,
                recipe.ustensils
                );
                
            // take advantage of this loop to retrieve category elements
            if (!appliancesList.includes(recipe.appliance)) { appliancesList.push(recipe.appliance); }

            const recipeUst = recipe.ustensils;
            recipeUst.forEach(ust => {
                if ( !ustensilsList.includes(ust) ) // skip if already in list
                ustensilsList.push(ust);
            });

            const recipeIngr = recipe.ingredients;
            recipeIngr.forEach( ingre => {
                if ( !ingredientsList.includes(ingre) ) // skip if already in list
                ingredientsList.push(ingre.ingredient);
            });


            // for each ingredient of recipe's ingredients array, cast ingredient into new ingredient object (UI display purposes)
            /* recipe.ingredients.forEach(ingredient => {
                let newIngredient = ingredientFactory.create(
                    ingredient.ingredient,
                    ingredient.quantity,
                    ingredient.unit
                );
                recipe.ingredients.push(newIngredient);
            }); */
            generateRecipeCard(recipe); // generate view for recipe

            recipesList.push(newRecipe); // all recipes casted, ordered as coming from api (default)
        });
        setUpAdvancedSearchView(ingredientsList, appliancesList, ustensilsList);
    }

    const recipesListWrapper = document.createElement('section');
    recipesListWrapper.setAttribute('id', 'recipes-list');
    recipesListWrapper.setAttribute('class', 'row');
    
    function generateRecipeCard(recipe){
        let newRecipeCard = new CardTemplate(recipe);
        recipesListWrapper.appendChild(newRecipeCard);
        root.appendChild(recipesListWrapper);
    }


    // ADVANCED SEARCH = based on DEFAULT OR SORTED LIST of recipes 
    // components are generated accordingly
    function setUpAdvancedSearchView(ingredientsList, appliancesList, ustensilsList){
        // console.log('ingredientsList, appliancesList, ustensilsList===', ingredientsList, appliancesList, ustensilsList);
        let categories = [ingredientsList, appliancesList, ustensilsList];
        const categoryNames = [ 'ingredients', 'appareils', 'ustensils'];
        
        // set up wrapper for all 3 collapsing menus
        const advancedSearchWrapper = document.createElement('section');
        advancedSearchWrapper.setAttribute('class', 'adv-search-wrapper');
        advancedSearchWrapper.classList.add('row');
        advancedSearchWrapper.classList.add('m-0');

        // generate advanced search : button + menu CONTAINER for each category
        categories.forEach( (category, index) => {
            let catName = categoryNames[index];
            // generate menu container for each category
            let catComponent = new CollapsingMenu(catName, category); // population of each menu container = done inside CollapsingMenu     

            advancedSearchWrapper.appendChild(catComponent);
        });
        root.insertBefore(advancedSearchWrapper, recipesListWrapper);
    }


    // SEARCH FUNCTIONALITY : MAIN SEARCH ==================================================================================================
    function processCurrentMainSearch(currentSearchTerm) {
        console.log(currentSearchTerm);
        if ( currentSearchTerm.length >= 3 ) { // launch search from 3 chars to make suggestions
            console.log('currentSearchTerm is 3 chars long');
            search(recipes, currentSearchTerm); // launch search for term in recipes list
        }
    }

    // used to store results in the module, until display method needs them
    function retrieveSearchResults(resultsList){
        // console.log('resultsList==', resultsList);
        storedResults = resultsList;
        console.log('storedResults==', storedResults);
        return storedResults;
    }

    
    // for each new found suggestion, generate list item in suggestions wrapper
    function addSuggestionInList(suggestion){
        let newSuggestion = document.createElement('p');
        let newSuggestedWord = document.createTextNode(suggestion);
        newSuggestion.appendChild(newSuggestedWord);

        let suggestionsWrapper = document.querySelector('#main-suggestions');
        suggestionsWrapper.appendChild(newSuggestion);

        // handle selection of suggested word (both click and keydown)
        newSuggestion.addEventListener('click', function(event){ handleSelectSuggestedWord(event); }, false);
        newSuggestion.addEventListener('keydown', function(event){ handleSelectSuggestedWord(event); }, false);
    }

    // when a list of suggestions is displayed, user can select a word => 
    // word is then 'sent'/displayed in input field
    // this automatically updates the list of recipes displayed on the page
    function handleSelectSuggestedWord(event) {
        let word = event.target.innerText; // text inside <p> element where event occurs
        // console.log('word is==', word);
        // let currentSearchInput = document.querySelector('#main-search-input').value; // what is the current search in input field
        // console.log('currentSearchInput===', currentSearchInput);
        let inputField = document.querySelector('#main-search-input');
        inputField.value = word; // make selected suggested word the current search word of input field
        // reset / close suggestion list
        resetSuggestions();
        // order display of list results for this word
        displaySearchResults();
    }

    // suggestions list should be reset at each new keystroke
    function resetSuggestions(parent){
        parent = document.querySelector('#main-suggestions');
        while (parent.firstChild) { parent.removeChild(parent.firstChild); }
        return parent;
    }
    
    function resetSearch(arr){ // arr = resultsList or/and suggestions
        if (arr) {
            while( arr.length > 0  ) { arr.pop(); } // remove arr items
        } else { return; }
    }

    // when an array of results for the search term is ready to be displayed in UI
        // 'ready' means: a suggestion has been selected
        // OR : user presses 'enter' or clicks 'submit' icon
    function displaySearchResults(results) {
        
        console.log(results);
        if ( !results ) { 
            results = retrieveSearchResults();
            console.log('HERE====', results);
        }

        // reset current list of recipes
        let recipesListWrapper = document.querySelector('#recipes-list');
        while (recipesListWrapper.firstChild) { recipesListWrapper.removeChild(recipesListWrapper.firstChild); }

        results.forEach(recipe => { 
            generateRecipeCard(recipe);
        });
    }



    // when user uses searchbar icon to confirm search start
    // meaning search has actually been done already (as user was typing in)
    function launchMainSearch(currentSearchTerm){
        console.log('SEARCHING FOR: ', currentSearchTerm);
    }

    
    return {
        processCurrentMainSearch: processCurrentMainSearch,
        launchMainSearch: launchMainSearch,
        retrieveSearchResults: retrieveSearchResults,
        addSuggestionInList: addSuggestionInList,
        resetSuggestions:resetSuggestions,
        resetSearch: resetSearch
    };
    


}());
