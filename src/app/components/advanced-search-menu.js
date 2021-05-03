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
                        <i id="caret-down" class="fas fa-angle-down"></i>
                </button>
            </div>
            <div class="collapse multi-collapse category-menu" id="menu-${categoryName}" isOpen="false">
                <div class="card card-body">
                    <ul id="${categoryName}-list" class="list flex-column">
                    </ul>
                </div>
            </div>
        `;

        // parent wrapper ('section .adv-search-wrapper') containing all 3 collapsing menus must be 
        // of width col-6 when menus are closed (50% parent) => each menu : col
        // of width col-12 if a menu is open (100% parent) => open menu: col-6 / others: col-2 ( + empty col-2)
        const parentAdvancedSearchWrapper = document.querySelector('.adv-search-wrapper');
        this.setAttribute('class', 'col'); // each menu : col


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

        let btn = this.querySelector('button');
        let btnCategoryName = btn.textContent;
        let caretDown = this.querySelector('#caret-down');
        let caretUp = document.createElement('i');
        caretUp.setAttribute('class', 'fas fa-angle-up');
        caretUp.setAttribute('id', 'caret-up');

        
        // set up input field that replaces category name inside btn when menu = open
        let searchInputField = document.createElement('input');
        searchInputField.setAttribute('id', 'searchInto-'+ categoryName);
        searchInputField.setAttribute('class', 'searchInput');
        searchInputField.setAttribute('placeholder', 'rechercher un ' + categoryName );
        
        const allMenus = this.querySelectorAll('#menu-' + categoryName);


        // By default, click event = on whole menu Header to OPEN ONLY
        // ( cannot use a TOGGLE method here, for open/close events are passed through different elements
        menuHeader.addEventListener('click', function(event){ menuOpen(event); }, false);
        let menuIsOpen = false;
        
        function menuOpen(event) {
            menuHeader = event.currentTarget;
            event.stopPropagation();
            console.log('event.currentTarget when OPENING - 1 ======',event.currentTarget); // element that handles event
            
            let isMenuActive = menuHeader.getAttribute('isActive');
            
            if (isMenuActive === 'false' ) {

                    menuHeader.removeEventListener('click',function(event){ menuOpen(event); }, false);
                    menuHeader.removeAttribute('isActive', 'false');
                    menuHeader.setAttribute('isActive', 'true');

                    menuToOpen.style.display = 'flex'; // show list
                    // replace btn > caret right away (open > close)
                    caretDown.replaceWith(caretUp);
                    caretUp.addEventListener('click',function(event){ menuClose(event); }, false);


                    // add click on category name btn for activating field input
                    btn.addEventListener('click', function(event){ activateInputField(event), false; }); // add click on btn to ACTIVATE INPUT FIELD
                    btnCategoryName = 'rechercher un ' + btnCategoryName; // modify btn text


            }
            else { return; }
        }

        // this event occurs when a menu is open, and its category name btn is clicked : btn then becomes an input field
        function activateInputField(event){
            let isMenuActive = menuHeader.getAttribute('isActive');
            if (isMenuActive === 'true' ) {
                btn = event.currentTarget;
                event.stopPropagation();

                btn.style.display = 'none';
                menuHeader.appendChild(searchInputField); // add input field

                menuHeader.appendChild(caretUp); // + caret ( for the other one went away with btn)
                caretUp.addEventListener('click',function(event){ menuClose(event); }, false);
            }
        }


        function menuClose(event) {
            event.stopPropagation();
            caretUp = event.currentTarget;
            console.log('event.currentTarget when CLOSING - 2======',event.currentTarget); // element that handles event

            let isMenuActive = menuHeader.getAttribute('isActive');

            if (isMenuActive === 'true' ) {

                // remove click on btn to ACTIVATE INPUT FIELD  
                btn.removeEventListener('click', function(){ activateInputField(), false; });

                menuToOpen.style.display = 'none'; // hide list
                menuHeader.removeAttribute('isActive', 'true');
                menuHeader.setAttribute('isActive', 'false');

                // replace btn > caret right away (up -> down)
                caretUp.replaceWith(caretDown); 
                
                // remove input field
                if (menuHeader.contains(searchInputField)) {menuHeader.removeChild(searchInputField);}
                // put back category name
                btnCategoryName = btnCategoryName + categoryName;
                
                // put back event on menu header
                menuHeader.addEventListener('click',function(event){ menuOpen(event); }, false);
                

            } else { return; }
        }


        function setMenuIsOpenEvents() {
            // remove initial event from menu header
            // menuHeader.removeEventListener('click',function(event){ openMenu(event); }, false);
            menuHeader.removeEventListener('click',function(){ toggleMenu(); }, false);
            
            // replace btn > caret right away (open > close)
            btn.replaceChild(caretUp, caretDown);
            // add click on caret UP to CLOSE MENU ≠ caret DOWN does NOT have the event for OPENING (which is on parent div)
            // caretUp.addEventListener('click', function(event){ closeMenu(event); }, false);
            caretUp.addEventListener('click', function(){ toggleMenu(); }, false);

            // add click on category name btn for activating field input
            btn.addEventListener('click', function(event){ activateInputField(event), false; }); // add click on btn to ACTIVATE INPUT FIELD
            btnCategoryName = 'rechercher un ' + btnCategoryName; // modify btn text

            // DOM ELEMENTS CHANGES
            parentAdvancedSearchWrapper.classList.replace('col-6', 'col-12'); // parent expands to give space to menu
            let collapsingMenu = menuHeader.parentNode; // = this whole component
            collapsingMenu.classList.replace('col', 'col-6'); // menu width expands
            
            menuHeader.setAttribute('isActive', 'true');
            
            // SHOW list
            menuToOpen.style.display = 'flex'; // show list
            menuToOpen.setAttribute('isOpen', 'true');
        }


        function setMenuIsClosedEvents() {

            // replace btn > caret right away (close > open)
            caretUp.replaceWith(caretDown);
            
            // remove click on btn to ACTIVATE INPUT FIELD  
            btn.removeEventListener('click', function(){ activateInputField(), false; });
            
            // open menu event is back on menu header
            if (menuHeader.contains(searchInputField)) {menuHeader.removeChild(searchInputField);}
            // menuHeader.addEventListener('click',function(event){ openMenu(event); }, false); // put back initial event on menu header
            menuHeader.addEventListener('click',function(){ toggleMenu(); }, false); // put back initial event on menu header
            menuHeader.removeAttribute('isActive', 'true');
            menuHeader.setAttribute('isActive', 'false');
            

            // DOM ELEMENTS CHANGES
            let menuList = document.getElementById('menu-'+ categoryName);
            menuList.style.display = 'none';

            parentAdvancedSearchWrapper.classList.replace('col-12', 'col-16'); // parent shrinks back
            let collapsingMenu = menuHeader.parentNode; // = this whole component
            collapsingMenu.classList.replace('col-6', 'col'); // menu width shrinks back
            
            btn.setAttribute('aria-expanded', 'false');
            btnCategoryName = btnCategoryName + categoryName; // put back category name
            menuToOpen.setAttribute('isOpen', 'false');
        }


        function openMenu(event){

            console.log('MENU OPENING!');

            menuIsOpen = true;
            menuHeader = event.currentTarget; // element that handles event

            menuHeader.removeEventListener('click',function(event){ openMenu(event); }, false); // remove initial event from menu header

            // replace btn caret right away (open > close)
            btn.replaceChild(caretUp, caretDown);
            caretUp.addEventListener('click', function(event){ closeMenu(event); }, false); // click on caret UP to CLOSE MENU ≠ caret DOWN does NOT have the event for OPENING ( which is on parent div)
            btn.addEventListener('click', function(event){ activateInputField(event), false; }); // add click on btn to ACTIVATE INPUT FIELD
    
            parentAdvancedSearchWrapper.classList.replace('col-6', 'col-12'); // parent expands to give space to menu
            let collapsingMenu = menuHeader.parentNode; // = this whole component
            collapsingMenu.classList.replace('col', 'col-6'); // menu width expands
            
            menuHeader.setAttribute('isActive', 'true');
            
            // set up menu DEFAULT STATE when first opened
            menuToOpen.style.display = 'flex'; // show list
            menuToOpen.setAttribute('isOpen', 'true');
            btnCategoryName = 'rechercher un ' + btnCategoryName; // modify btn text
        }

        function closeMenu(event){

            menuIsOpen = false;
            console.log('MENU CLOSING!');

            event.stopPropagation();
            caretUp = event.target; // element on which event occurs
            let caretParentBtn = caretUp.parentNode;

            caretParentBtn.replaceChild(caretDown, caretUp); 
            btn.removeEventListener('click', function(){ activateInputField(event), false; }); // remove click on btn to ACTIVATE INPUT FIELD 
            menuHeader.addEventListener('click',function(event){ openMenu(event); }, false); // put back initial event on menu header

            caretUp.removeEventListener('click', function(event){ closeMenu(event); }, false); // remove click event close on caret

            menuHeader.removeAttribute('isActive', 'true');
            menuHeader.setAttribute('isActive', 'false');
            if (menuHeader.hasChildNodes(searchInputField)) {menuHeader.removeChild(searchInputField);}

            let menuList = document.getElementById('menu-'+ categoryName);
            menuList.style.display = 'none';

            parentAdvancedSearchWrapper.classList.replace('col-12', 'col-16'); // parent shrinks back
            let collapsingMenu = menuHeader.parentNode; // = this whole component
            collapsingMenu.classList.replace('col-6', 'col'); // menu width shrinks back
            
            btn.setAttribute('aria-expanded', 'false');
            btnCategoryName = btnCategoryName + categoryName; // put back category name
            menuToOpen.setAttribute('isOpen', 'false');
        }
        
   


        // check : only one menu can be open at the time - otherwise close it before opening one
        function checkWhosOpen(){
            allMenus.forEach(menu => { 
                let isOpen = menu.getAttribute('isActive');
                //let idOfOpenMenu = isOpen.getAttribute('id');

                if ( isOpen ) { 
                    // return idOfOpenMenu;
                    // closeMenu(idOfOpenMenu);
                } else { return;  }
            });
        }


        let searchTerm = '';
        searchInputField.addEventListener('input', function(event){
            searchTerm = event.target.value;
            processSearchInput(searchTerm);
        });


        function processSearchInput(searchTerm){
            console.log('searchTerm==', searchTerm);
        }

    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('collapsing-menu-component', CollapsingMenu);

