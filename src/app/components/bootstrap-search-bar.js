/* ================================================== */
/* TEMPLATE FOR MAIN SEARCHBAR */
/* ================================================== */

export class SearchBar extends HTMLElement {
    constructor() {
        super();
        let placeholder = 'Rechercher un ingrédient, appareil, ustensiles ou une recette';
        this.innerHTML = 
            `<div class="input-group d-inline m-0">
                <div class="form-outline">
                    <input type="search" id="form1" class="form-control rounded" placeholder=${placeholder} aria-label="Search" aria-describedby="search-addon"/>
                    <label class="form-label visuallyHidden" for="form1">Search</label>
                    <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-search"></i>
                    </span>
                </div>
            </div>`;
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('searchbar-component', SearchBar);