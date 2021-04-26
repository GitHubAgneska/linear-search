/* ================================================== */
/* TEMPLATE FOR A SEARCH MENU : button + collapsible menu body  */
/* ================================================== */
import {MenuListItem} from '../components/menu-listItem';

export class CollapsingMenu extends HTMLElement{
    constructor(categoryName, categoryElements){
        super();

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

        const categoryUl = this.querySelector('#' + categoryName + '-list');
        
        // populate each menu container with category list items
        categoryElements.forEach(el => {
            // generate li item element for each item of each category
            let listELement = new MenuListItem(el);
        
            categoryUl.appendChild(listELement);
        });
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('collapsing-menu-component', CollapsingMenu);

