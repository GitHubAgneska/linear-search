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
            <div class="collapse multi-collapse category-menu" id="menu-${categoryName}">
                <div class="card card-body">
                    <ul id="${categoryName}-list" class="list">
                    </ul>
                </div>
            </div>
        `;

        // get UL container for category items 
        const categoryUl = this.querySelector('#' + categoryName + '-list');
        
        // populate each menu container with category list items
        categoryElements.forEach(el => {
            // generate li item element for each item of each category
            let listELement = new MenuListItem(el);
            categoryUl.appendChild(listELement);
        });

        // toggle menu
        let btn = this.querySelector('button');
        let btnCategoryName = btn.textContent;

        const toggleMenuBtn = this.querySelector('i');
        let menuToOpen = this.querySelector('#menu-'+ categoryName);

        // check - only one menu is open at the time
        const allMenus = this.querySelectorAll('#menu-' + categoryName);

        // set up input field that replaces category name inside btn when menu = open
        let searchInputField = document.createElement('input');
        searchInputField.setAttribute('id', 'searchInto-'+ categoryName);
        searchInputField.setAttribute('placeholder', 'rechercher un ' + categoryName );

        toggleMenuBtn.addEventListener('click', function(event){

            btn = event.target;

            if ( menuToOpen.getAttribute('isOpen') === 'false' ) {
                menuToOpen.style.display = 'block';
                btn.removeAttribute('aria-expanded', 'false');
                btn.setAttribute('aria-expanded', 'true');
                btnCategoryName = ''; // remove category name
                btn.appendChild(searchInputField); // add input field
                menuToOpen.setAttribute('isOpen', 'true');

            } else {
                menuToOpen.style.display = 'none';
                btn.removeAttribute('aria-expanded','true' );
                btn.setAttribute('aria-expanded', 'false');
                if ( btn.contains(searchInputField) ) { btn.removeChild(searchInputField);  }// remove input field
               
                btnCategoryName = btnCategoryName + categoryName; // add category name
                menuToOpen.setAttribute('isOpen', 'false');
            }
        });
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('collapsing-menu-component', CollapsingMenu);

