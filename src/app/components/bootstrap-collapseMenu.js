/* ================================================== */
/* TEMPLATE FOR A SEARCH MENU : button + collapsible menu body  */
/* ================================================== */

export class CollapsingMenu extends HTMLElement{
    constructor(categoryName){
        super();

        // this.setAttribute('data', categoryElements);

        this.innerHTML = `

            <button class="btn" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#${categoryName}"
                    aria-expanded="false"
                    aria-controls="${categoryName}">${categoryName}
                
                <i class="fas fa-angle-down"></i>
            </button>
            <div class="collapse multi-collapse" id="${categoryName}">
                <div class="card card-body">
                    <ul id="${categoryName}-list">
                    </ul>
                </div>
            </div>
        `;
    }

}
// register custom element in the built-in CustomElementRegistry object
customElements.define('collapsing-menu-component', CollapsingMenu);

