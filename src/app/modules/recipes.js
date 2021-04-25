import {HeaderBaseTemplate} from '../components/header';
import {BasePageTemplate} from '../components/base-page';
import {CardTemplate} from '../components/bootstrap-card';
import {CollapsingMenu} from '../components/bootstrap-collapseMenu';
import {SearchBar} from '../components/bootstrap-search-bar';
import {Recipe, Ingredient} from '../utils/recipe-model';
import {RecipeFactory, IngredientFactory} from '../utils/recipe-factory';
import {fetchAllData, setLocal} from '../utils/fetch-data';

/* ================================================== */
/* MODULE IN CHARGE OF ALL COMPONENTS + LOGIC */
/* ================================================== */

export const RecipeModule = (function() {
    
    // private part of module
    
    // define vars
    const root = document.querySelector('#root'); // where 'main' content will be hosted
    const localUrl = './assets/data.json';
    let localData;
    let recipes = [];
    const recipesList = [];

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
        setUpMainSearchBar();
        initData(recipes);
        setUpAdvancedSearch(recipes);
    }

    // set up main search bar
    function setUpMainSearchBar(){
        const searchBar = new SearchBar();
        root.appendChild(searchBar);
    }

    // cast retrieved data into local recipe model containing an ingredients array
    function initData(recipes) {
        let recipeFactory = new RecipeFactory();
        let ingredientFactory = new IngredientFactory();

        recipes.forEach( recipe => {
            let newRecipe = recipeFactory.create(
                recipe.id,
                recipe.name,
                recipe.servings,
                recipe.time,
                recipe.ingredients,
                recipe.description,
                recipe.appliance,
                recipe.ustensils
                );
            
            recipe.ingredients.forEach(ingredient => {
                let newIngredient = ingredientFactory.create(
                    ingredient.ingredient,
                    ingredient.quantity,
                    ingredient.unit
                );
                recipe.ingredients.push(newIngredient);
            });
            recipesList.push(newRecipe);
        });
        setUpAdvancedSearch(recipesList);
    }


    function setUpAdvancedSearch(recipesList){

        // define search categories
        const recipesSearchCategories = [ 'ingredients', 'appliances', 'ustensils' ];


        // create advanced search button + menu CONTAINER for each category
        recipesSearchCategories.forEach(cat => { 
            let advancedSearchCat = new CollapsingMenu(cat, menuElements);
            root.appendChild(advancedSearchCat);
        });

        // populate each menu container with category list items

    }


    return {};
    


}());
