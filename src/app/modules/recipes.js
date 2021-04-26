import {HeaderBaseTemplate} from '../components/header';
import {BasePageTemplate} from '../components/base-page';
import {CardTemplate} from '../components/bootstrap-card';
import {CollapsingMenu} from '../components/bootstrap-collapseMenu';
import {MenuListItem} from '../components/menu-listItem';
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
    let recipes = []; // to store fetch data
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
        // setUpAdvancedSearchView(recipes);
    }

    // set up main search bar
    function setUpMainSearchBar(){
        const searchBar = new SearchBar();
        root.appendChild(searchBar);
    }

    // cast retrieved data into local recipe model
    // each recipe contains an ingredients array, an appliance string, an ustensils array
    //  
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


    // advanced search is based on DEFAULT OR SORTED recipe LIST
    // components are generated accordingly
    function setUpAdvancedSearchView(ingredientsList, appliancesList, ustensilsList){

        // console.log('ingredientsList, appliancesList, ustensilsList===', ingredientsList, appliancesList, ustensilsList);
        let categoriesContent = [ingredientsList, appliancesList, ustensilsList];
        
        // generate advanced search : button + menu CONTAINER for each category
        categoriesContent.forEach(categoryContent => {

            // generate li item element for each item of each category
            let collapsingMenuUl = document.createElement('ul');

            categoryContent.forEach(el => {
                
                let listELement = new MenuListItem(el.name);
                // let listELement = generateMenuListItem(el);
            
                collapsingMenuUl.appendChild(listELement);
            });

            // generate menu container for each category
            let catComponent = new CollapsingMenu('name');
            // document.appendChild(collapsingMenuUl);
            root.appendChild(catComponent);
        });

        
        // populate each menu container with category list items
    }

    // how each menu list item is generated
    function generateMenuListItem(item) {
        let newEl = document.createElement('li');
        let newElAnchor = document.createElement('a');
        let elContent = document.createTextNode(item.name);
        newElAnchor.appendChild(elContent);

        newEl.appendChild(newElAnchor);
        return newEl;
    }
    

/*     function getCategoryCurrentElements(category) {
        let categoryName = `${category}`;
        console.log(categoryName);
        let currentElementsOfCategory = [];

        // retrieve each category current elements 
        recipesList.forEach(recipe => {
            if ( typeof(recipe.categoryName) === Array ) {
                currentElementsOfCategory.push(recipe.categoryName)
            }
            currentElementsOfCategory.push(recipe.categoryName);
        });
        console.log('currentElementsOfCategory==', currentElementsOfCategory);
        return currentElementsOfCategory;
    } */

    return {};
    


}());
