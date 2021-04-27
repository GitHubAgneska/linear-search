/* ================================================== */
/* RECIPE TEMPLATE  */
/* ================================================== */
export class CardTemplate extends HTMLElement {
    constructor(recipe) {
        super();

        this.setAttribute('class', 'col');
        this.innerHTML = 
            `
            <div class="card recipe-card col">
                <img src="" class="card-img-top" alt="">
                <div class="card-body">
                    <div class="card-header-recipe row">
                        <h5 class="card-title col-8">${recipe.name}</h5>
                        <div class="card-time col-4 row">
                            <i class="far fa-clock col"></i>
                            <h5 class="time col">${recipe.time}min</h5>
                        </div>
                    </div>
                    <div class="recipe-description row">
                        <ul id="ingredients-list" class="col>
                        </ul>
                        <p class="col">${recipe.description}</p>
                    </div>
                </div>
            </div>
            `;

            const ingredientsList = this.querySelector('#ingredients-list');
            const recipeDescr = this.querySelector('#recipe-description');

            recipe.ingredients.forEach(ingredient => {
                let newListItem = document.createElement('li');
                let newListItemContent = document.createTextNode(ingredient.ingredient + ':' + ingredient.quantity +  ingredient.unit || null);
                newListItem.appendChild(newListItemContent);
                ingredientsList.appendChild(newListItem);

            });
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('card-component', CardTemplate);


