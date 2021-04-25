/* ================================================== */
/* TEMPLATE FOR A SEARCH MENU : button + collapsible menu body  */
/* ================================================== */
export class CollapsingMenu extends HTMLElement{
    constructor(category){
        super();
        
        this.innerHTML = `

            <button class="btn" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#${category}"
                    aria-expanded="false"
                    aria-controls="${category}">${category}
                
                <i class="fas fa-angle-down"></i>
            </button>
            <div class="collapse multi-collapse" id="${category}">
                <div class="card card-body">
                    <ul id="list">
                    </ul>
                </div>
            </div>
        `;
    }
    // populate ul list
    // let listElement = this.innerHTML.querySelector('#list');

}
// register custom element in the built-in CustomElementRegistry object
customElements.define('collapsing-menu-component', CollapsingMenu);

