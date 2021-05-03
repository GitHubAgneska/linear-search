
import {RecipeFactory} from '../utils/recipe-factory';
import {SearchBar} from '../components/bootstrap-search-bar';
import {CollapsingMenu} from '../components/advanced-search-menu';
import {MenuListItem} from '../components/menu-listItem';
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
    let arrayOfCategoryElements = []; // to store the 3 previous lists

    let storedResults = [];  // local storage of results
    let storedSuggestions = []; // local storage of suggestions

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
            
            // set up CATEGORY MENU LISTS : DEFAULT ( = all recipes ) ========================
            // retrieve category elements : all ingredients
            const recipeIngr = recipe.ingredients;
            recipeIngr.forEach( ingre => {
                if ( !ingredientsList.includes(ingre) ) // skip if already in list
                ingredientsList.push(ingre.ingredient);
            });
            
            // retrieve category elements : all appliances
            if (!appliancesList.includes(recipe.appliance)) { appliancesList.push(recipe.appliance); }
            
            // retrieve category elements : all ustensils
            const recipeUst = recipe.ustensils;
            recipeUst.forEach(ust => {
                if ( !ustensilsList.includes(ust) ) // skip if already in list
                ustensilsList.push(ust);
            });
            
            // generate view for recipe
            generateRecipeCard(recipe);
            
            // all recipes casted, ordered as coming from api (default)
            recipesList.push(newRecipe);
        });
        arrayOfCategoryElements.push(ingredientsList,appliancesList, ustensilsList );
        initAdvancedSearchSection();
        setUpAdvancedSearchView(arrayOfCategoryElements); // default == all recipes (= array of arrays [appliancesList, ustensilsList, ingredientsList])
    }

    // generate recipes list section
    const recipesListWrapper = document.createElement('section');
    recipesListWrapper.setAttribute('id', 'recipes-list');
    recipesListWrapper.setAttribute('class', 'row');
    
    function generateRecipeCard(recipe){
        let newRecipeCard = new CardTemplate(recipe);
        recipesListWrapper.appendChild(newRecipeCard);
        root.appendChild(recipesListWrapper);
    }


    // when search term in main search produces a list of recipes,
    // the categories menus lists are updated with corresponding recipes ingredients/appliances/ustensils
    function updateCategoryLists(recipes) {
        // first, reset menus lists from default data
        ingredientsList = [];
        appliancesList = [];
        ustensilsList = [];
        arrayOfCategoryElements = [];

        // then for each recipe of results, retrieve elements for each category
        recipes.forEach( recipe => {

            const recipeIngr = recipe.ingredients;
            recipeIngr.forEach( ingre => {
                if ( !ingredientsList.includes(ingre) ) // skip if already in list
                ingredientsList.push(ingre.ingredient);
            });

            if (!appliancesList.includes(recipe.appliance)) { appliancesList.push(recipe.appliance); }
    
            const recipeUst = recipe.ustensils;
            recipeUst.forEach(ust => {
                if ( !ustensilsList.includes(ust) ) // skip if already in list
                ustensilsList.push(ust);
            });
    
        });
        arrayOfCategoryElements.push(ingredientsList,appliancesList, ustensilsList );
        return arrayOfCategoryElements;
    }


    // ADVANCED SEARCH = based on DEFAULT OR SORTED LIST of recipes  =======================================================================
    // components are generated accordingly

    // set up host section for advanced search
    function initAdvancedSearchSection() {
        // set up wrapper for all 3 collapsing menus
        const advancedSearchWrapper = document.createElement('section');
        advancedSearchWrapper.setAttribute('class', 'adv-search-wrapper');
        advancedSearchWrapper.classList.add('row');
        advancedSearchWrapper.classList.add('m-0');
        root.insertBefore(advancedSearchWrapper, recipesListWrapper);
    }

    // set up advanced search fixed content (dynamic menus DEFAULT content (all recipes) is set up inside CollapsingMenu component)
    function setUpAdvancedSearchView(arrayOfCategoryElements){
        // ( arrayOfCategoryElements = [ingredientsList, appliancesList, ustensilsList] )
        // console.log('===>arrayOfCategoryElements==', arrayOfCategoryElements);
        const categoryNames = [ 'ingredients', 'appareils', 'ustensils'];
        const advancedSearchWrapper = document.querySelector('.adv-search-wrapper');
        // generate advanced search : button + menu CONTAINER for each category
        arrayOfCategoryElements.forEach( (category, index) => {
            let catName = categoryNames[index];
            // generate menu container for each category
            let catComponent = new CollapsingMenu(catName, category); // population of each menu container = done inside CollapsingMenu component
            advancedSearchWrapper.appendChild(catComponent);
        });
    }

    function updateAdvancedSearchView(arrayOfCategoryElements) { // ( arrayOfCategoryElements = [ingredientsList, appliancesList, ustensilsList] )
        // get each category menu list to update
        const ingredientsListElement = document.querySelector('#ingredients-list');
        const appliancesListElement = document.querySelector('#appareils-list');
        const ustensilsListElement = document.querySelector('#ustensils-list');

        // destroy (reset) their current content
        const allMenus = [ ingredientsListElement, appliancesListElement, ustensilsListElement];
        allMenus.forEach(el => { 
            while (el.firstChild) { el.removeChild(el.firstChild); }
        });
        // inject new content : ingredients list
        arrayOfCategoryElements[0].forEach(el => { 
            let listELement = new MenuListItem(el);
            ingredientsListElement.appendChild(listELement);
        });
        // inject new content : ingredients list
        arrayOfCategoryElements[1].forEach(el => { 
            let listELement = new MenuListItem(el);
            appliancesListElement.appendChild(listELement);
        });
        // inject new content : ingredients list
        arrayOfCategoryElements[2].forEach(el => { 
            let listELement = new MenuListItem(el);
            ustensilsListElement.appendChild(listELement);
        });
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
    let setResults = function(results) { storedResults = results; };
    let getResults = function() { return storedResults; };

    // used to store results in the module, until display method needs them
    let setSuggestions = function(suggestions) { storedSuggestions = suggestions; };
    let getSuggestions = function() { return storedSuggestions; };


    // HANDLE SUGGESTIONS ---------------
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
        search(recipes, inputField.value); // launch search again for this one current term

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

    // retrieve first word in suggestions list 
    // (for click event on search icon to update current search term to first suggestion)
    function retrieveFirstSuggestion() {
        let suggestionsList = getSuggestions();
        let firstSuggestion = suggestionsList[0];
        return firstSuggestion;
    }
    
    function resetSearch(arr){ // arr = resultsList or/and suggestions
        if (arr) {
            while( arr.length > 0  ) { arr.pop(); } // remove arr items
        } else { return; }
    }

    // DISPLAY RECIPE LIST BY SEARCH TERM ==================================================================================================
    // when an array of results for the search term is ready to be displayed in UI
        // 'ready' means: a suggestion has been selected
        // OR : user presses 'enter' or clicks 'submit' icon
    function displaySearchResults(results) {

        results = getResults();
        // reset current list of recipes
        let recipesListWrapper = document.querySelector('#recipes-list');
        //reset recipes list wrapper
        while (recipesListWrapper.firstChild) { recipesListWrapper.removeChild(recipesListWrapper.firstChild); }
        // generate recipe elements to display based on new results
        results.forEach(recipe => { 
            generateRecipeCard(recipe);
        });
        
        // set categories elements based on new results
        arrayOfCategoryElements = updateCategoryLists(results); // order advanced search menus update;
        // display categories elements in menus
        updateAdvancedSearchView(arrayOfCategoryElements); // = array of arrays [appliancesList, ustensilsList, ingredientsList]
    }


    
    return {
        processCurrentMainSearch: processCurrentMainSearch,
        addSuggestionInList: addSuggestionInList,
        resetSuggestions:resetSuggestions,
        resetSearch: resetSearch,
        setResults: setResults,
        setSuggestions: setSuggestions,
        retrieveFirstSuggestion: retrieveFirstSuggestion,
        displaySearchResults: displaySearchResults
    };
    
}());
