/* ================================================== */
/* TEMPLATE FOR A SEARCH MENU : button + collapsible menu body  */
/* ================================================== */
import {MenuListItem} from '../components/menu-listItem';

export class CollapsingMenu extends HTMLElement{
    constructor(categoryName, categoryElements){
        super();

        this.innerHTML = `
            
            <div class="menu-header" id="menu-header-${categoryName}">
                <button class="btn" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#${categoryName}"
                        aria-expanded="false"
                        aria-controls="${categoryName}">${categoryName}
                    <i class="fas fa-angle-down"></i>
                </button>
            </div>
            <div class="collapse multi-collapse category-menu" id="menu-${categoryName}">
                <div class="card card-body">
                    <ul id="${categoryName}-list" class="list">
                    </ul>
                </div>
            </div>
        `;

        if (categoryName === 'ingredients') {
            this.setAttribute('class', 'col-6');
        } else { this.setAttribute('class', 'col-3'); }

        // get UL container for category items 
        const categoryUl = this.querySelector('#' + categoryName + '-list');
        
        // populate each menu container with category list items
        categoryElements.forEach(el => {
            // generate li item element for each item of each category
            let listELement = new MenuListItem(el);
            categoryUl.appendChild(listELement);
        });

        let menuHeader = this.querySelector('#menu-header-' + categoryName);
        let menuToOpen = this.querySelector('#menu-'+ categoryName);

        // toggle menu
        let btn = this.querySelector('button');
        let btnCategoryName = btn.textContent;
        let caretIcon = this.querySelector('i');

        // check - only one menu is open at the time
        const allMenus = this.querySelectorAll('#menu-' + categoryName);

        // set up input field that replaces category name inside btn when menu = open
        let searchInputField = document.createElement('input');
        searchInputField.setAttribute('id', 'searchInto-'+ categoryName);
        searchInputField.setAttribute('class', 'searchInput');
        searchInputField.setAttribute('placeholder', 'rechercher un ' + categoryName );

        btn.addEventListener('click', function(event){

            
            if ( menuToOpen.getAttribute('isOpen') === 'false' ) {
                menuToOpen.style.display = 'block';

                // menuHeader.removeChild(btn);
                btn.style.display = 'none';
                menuHeader.appendChild(searchInputField); // add input field
                menuToOpen.setAttribute('isOpen', 'true');
                menuHeader.setAttribute('isActive', 'true');

                /* btn.removeAttribute('aria-expanded', 'false');
                btn.setAttribute('aria-expanded', 'true');
                btnCategoryName = ''; // remove category name*/
                
            } else {
                menuToOpen.style.display = 'none';
                btn.style.display = 'block';
                
                if ( menuHeader.contains(searchInputField) ) { menuHeader.removeChild(searchInputField);  }// remove input field
                
                // btn.removeAttribute('aria-expanded','true' );
                btn.setAttribute('aria-expanded', 'false');
                btnCategoryName = btnCategoryName + categoryName; // add category name
                menuToOpen.setAttribute('isOpen', 'false');
                menuHeader.removeAttribute('isActive', 'true');
            }
        });
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('collapsing-menu-component', CollapsingMenu);

