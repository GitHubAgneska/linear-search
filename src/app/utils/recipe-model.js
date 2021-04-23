export class Recipe {
    constructor(id, name, servings, ingredients, time, description, appliance, ustensils){
        this.id = id;
        this.name = name;
        this.servings = servings;
        this.ingredients = ingredients;
        this.time = time;
        this.description = description;
        this.appliance = appliance;
        this.ustensils = ustensils;
    }
}

export class Ingredient {
    constructor(ingredient, quantity, unit) {
        this.ingredient = ingredient;
        this.quantity = quantity;
        this.unit = unit;
    }
}