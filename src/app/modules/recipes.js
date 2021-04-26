
import {RecipeFactory, IngredientFactory} from '../utils/recipe-factory';
import {Recipe, Ingredient} from '../utils/recipe-model';
import {SearchBar} from '../components/bootstrap-search-bar';
import {CollapsingMenu} from '../components/bootstrap-collapseMenu';
import {CardTemplate} from '../components/bootstrap-card';


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
        let ingredientFactory = new IngredientFactory();

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
            appliancesList.push(recipe.appliance);

            const recipeUst = recipe.ustensils;
            recipeUst.forEach(ust => { ustensilsList.push(ust); });

            const recipeIngr = recipe.ingredients;
            recipeIngr.forEach( ingre => {ingredientsList.push(ingre.ingredient); });


            // for each ingredient of recipe's ingredients array, cast ingredient into new ingredient object (UI display purposes)
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
        setUpAdvancedSearchView(ingredientsList, appliancesList, ustensilsList);
    }


    // ADVANCED SEARCH = based on DEFAULT OR SORTED LIST of recipes 
    // components are generated accordingly
    function setUpAdvancedSearchView(ingredientsList, appliancesList, ustensilsList){
        // console.log('ingredientsList, appliancesList, ustensilsList===', ingredientsList, appliancesList, ustensilsList);
        let categories = [ingredientsList, appliancesList, ustensilsList];
        const categoryNames = [ 'ingredients', 'appareils', 'ustensils'];
        
        // generate advanced search : button + menu CONTAINER for each category
        categories.forEach(category => {
            // generate menu container for each category
            let catComponent = new CollapsingMenu('name', category); // population of each menu container = done inside CollapsingMenu     

            root.appendChild(catComponent);
        });
    }

    
    return {};
    


}());
