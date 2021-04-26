/* ================================================== */
/* TEMPLATE FOR A SEARCH MENU : button + collapsible menu body  */
/* ================================================== */
import {MenuListItem} from '../components/menu-listItem';

export class CollapsingMenu extends HTMLElement{
    constructor(categoryName, categoryElements){
        super();

        this.innerHTML = `
            
            <div class="menu-header" id="menu-header-${categoryName}" isActive="false">
                <button class="btn" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#${categoryName}"
                        aria-expanded="false"
                        aria-controls="${categoryName}">${categoryName}
                        <i class="fas fa-angle-down"></i>
                </button>
            </div>
            <div class="collapse multi-collapse category-menu" id="menu-${categoryName}" isOpen="false">
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


        menuHeader.addEventListener('click', function(event){

            menuHeader = event.currentTarget;
        
            if ( menuHeader.getAttribute('isActive') === 'false' ) {

                btn.style.display = 'none';
                menuToOpen.style.display = 'block';
                menuHeader.appendChild(searchInputField); // add input field
                menuToOpen.setAttribute('isOpen', 'true');
                menuHeader.setAttribute('isActive', 'true');
                
            } else  if ( menuHeader.getAttribute('isActive') === 'true' &&  menuToOpen.getAttribute('isOpen') === 'true'){
                
                menuToOpen.style.display = 'none';
                if ( menuHeader.contains(searchInputField) ) { menuHeader.removeChild(searchInputField);  }// remove input field
                btn.style.display = 'block';
                btn.setAttribute('aria-expanded', 'false');
                btnCategoryName = btnCategoryName + categoryName; // add category name
                menuToOpen.setAttribute('isOpen', 'false');
                menuHeader.removeAttribute('isActive', 'true');
                menuHeader.setAttribute('isActive', 'false');
            }
        }, false);
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('collapsing-menu-component', CollapsingMenu);

