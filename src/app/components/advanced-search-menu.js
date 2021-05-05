/* ================================================== */
/* TEMPLATE FOR A SEARCH MENU : button + collapsible menu body  */
/* ================================================== */
import {MenuListItem} from '../components/menu-listItem';
import {RecipeModule} from '../modules/recipes';
import {processAdvancedSearch} from '../utils/search-algo';

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
        
        // populate each menu container with category list items - DEFAULT VIEW : all recipes categories
        categoryElements.forEach(el => {
            // generate li item element for each item of each category
            let listELement = new MenuListItem(el);
            // add select event on each item
            listELement.addEventListener('click', function(event){selectItemInList(event); }, false);
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
        let currentTags = [];

        // COLLAPSING MENUS METHODS ================================================================
        // By default, click event = on whole menu Header to OPEN ONLY
        // ( cannot use a TOGGLE method here, for open/close events are passed through different elements
        menuHeader.addEventListener('click', function(event){ menuOpen(event); }, false);
        
        function menuOpen(event) {
            menuHeader = event.currentTarget; // element that handles event
            event.stopPropagation();
            console.log('event.currentTarget when OPENING - 1 ======',event.currentTarget); // element that handles event
            let isMenuActive = menuHeader.getAttribute('isActive');
            
            //  eventually remove remaining elements
            if (btn.contains(searchInputField)) { searchInputField.replaceWith(caretDown);}
            if (menuHeader.contains(caretUp)) { menuHeader.removeChild(caretUp);}


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

                    parentAdvancedSearchWrapper.classList.replace('col-6', 'col-12'); // parent expands to give space to menu
                    let collapsingMenu = menuHeader.parentNode; // = this whole component
                    collapsingMenu.classList.replace('col', 'col-6'); // menu width expands
            }
            else { return; }
        }

        // this event occurs when a menu is open, and its category name btn is clicked : btn then is replaced by an input field
        function activateInputField(event){
            let isMenuActive = menuHeader.getAttribute('isActive');
            if (isMenuActive === 'true' ) {
                btn = event.currentTarget;
                event.stopPropagation();

                btn.style.display = 'none';
                menuHeader.appendChild(searchInputField); // add input field

                menuHeader.appendChild(caretUp); // + caret ( for the other one went away with btn)
                caretUp.addEventListener('click',function(event){ menuClose(event); }, false);
            } else { return; }
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
                
                // remove input field  + eventually remaining elements
                if (menuHeader.contains(searchInputField)) {menuHeader.removeChild(searchInputField);}
                if (btn.contains(caretUp)) { caretUp.replaceWith(caretDown);}
                if (btn.contains(searchInputField)) {btn.removeChild(searchInputField);}
                // put back btn with category name
                btn.style.display = 'flex';
                btnCategoryName = btnCategoryName + categoryName;
                btn.appendChild(caretDown);
                
                // put back event on menu header
                menuHeader.addEventListener('click',function(event){ menuOpen(event); }, false);

                parentAdvancedSearchWrapper.classList.replace('col-12', 'col-16'); // parent shrinks back
                let collapsingMenu = menuHeader.parentNode; // = this whole component
                collapsingMenu.classList.replace('col-6', 'col'); // menu width shrinks back
                
            } else { return; }
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


        // HANDLE SEARCH OF ADVANCED SEARCH ==================================================
        let searchTerm = '';

        // handle select item in list : send it into input field
        function selectItemInList(event) {
            let word = event.target.innerText; // text inside <p> element where event occurs
            // activate field input 'artificially' via btn
            btn.click(event); 
            let inputField = document.querySelector('#searchInto-'+ categoryName);
            inputField.value = word; // make selected word the current search word of input field
        }


        // when user has selected an item in category or typed it in in INPUT FIELD 
        searchInputField.addEventListener('keydown', function(event){
            searchTerm = event.target.value;
            searchInputField = event.target;

            // retrieve current category from input id  ( ex '#searchInto-ingredients')
            let currentCategoryName = searchInputField.getAttribute('id');
            currentCategoryName = currentCategoryName.slice(11, currentCategoryName.length);
            console.log('currentCategoryName', currentCategoryName);

            // init suggestions from list ( = search in existing items of CURRENT CATEGORY)
            if ( searchTerm.length >= 3 ) { // launch search from 3 chars to make suggestions
                console.log('searchTerm is 3 chars long');
                processAdvancedSearch(searchTerm, currentCategoryName); // launch search for term in current results
            }

            // and then CONFIRM CHOICE by pressing ENTER:
            if ( event.key === 'Enter') {
                // a new tag for search word is generated above menus
                // ( check first if exists already )
                let currentTags = getTagsList();
                if ( !currentTags.includes(searchTerm) ) {
                    let searchItemTag = createTag(searchTerm);
                    initTagsWrapper();
                    let tagsWrapper = document.querySelector('#tagsWrapper');
                    tagsWrapper.appendChild(searchItemTag);
                    setTagsList(searchTerm);
                }
            }
        });

        // keep track of tags to prevent displaying the same one more than once
        let setTagsList = function(tag) { currentTags.push(tag); };
        let getTagsList = function() { return currentTags; };

        // handle suggestions for manual typing


        // create WRAPPER FOR TAGS to come : happens ONCE with 1st list item selection or typed word
        function initTagsWrapper() {
            if (!parentAdvancedSearchWrapper.contains(document.querySelector('#tagsWrapper'))) {
                let tagsWrapper = document.createElement('div');
                tagsWrapper.setAttribute('id', 'tagsWrapper');
                tagsWrapper.setAttribute('class', 'tagsWrapper');
                parentAdvancedSearchWrapper.prepend(tagsWrapper); // insert in 1st position
            }
            else { return; }
        }

        // create new tag
        function createTag(searchTerm) { 
            let searchItemTag = document.createElement('div');
            searchItemTag.setAttribute('class', 'searchTag');
            searchItemTag.setAttribute('id', 'searchTag-' + searchTerm );
            let tagCloseIcon = document.createElement('i');
            tagCloseIcon.setAttribute('class', 'fa fa-times-circle-o');
            tagCloseIcon.setAttribute('id', 'close-'+ searchTerm);
            let tagText = document.createTextNode(searchTerm);
            searchItemTag.appendChild(tagText);
            searchItemTag.appendChild(tagCloseIcon);
            tagCloseIcon.addEventListener('click', function(event) { removeTag(event);}, false);
            return searchItemTag;
        }

        // delete tag (via icon)
        function removeTag(event) {
            event.stopPropagation();
            let closeIcon = document.querySelector('#close-'+ searchTerm);
            closeIcon = event.currentTarget;
            let tagToRemove = closeIcon.parentNode;
            let tagsWrapper = document.querySelector('#tagsWrapper');
            tagsWrapper.removeChild(tagToRemove);
        }
    }
}

// register custom element in the built-in CustomElementRegistry object
customElements.define('collapsing-menu-component', CollapsingMenu);

