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
                    <h5 class="card-title">${recipe.name}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            `;
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('card-component', CardTemplate);


