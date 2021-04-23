import {Recipe, Ingredient} from './recipe-model';

export function RecipeFactory() {
    this.create = (id, name, ...args) => {
        return new Recipe(id, name, ...args);
    };
}
export function IngredientFactory() {
    this.create = (ingredient, quantity, unit) => {
        return new Ingredient(ingredient, quantity, unit);
    };
}