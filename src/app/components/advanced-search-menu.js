/* ================================================== */
/* TEMPLATE FOR A SEARCH MENU : button + collapsible menu body  */
/* ================================================== */
import {MenuListItem} from '../components/menu-listItem';
import {RecipeModule} from '../modules/recipes';

export class CollapsingMenu extends HTMLElement{
    constructor(categoryName, categoryElements){
        super();
        this.innerHTML = `
            
            <div class="menu-header close" id="menu-header-close-${categoryName}" isActive="false">
                <button class="btn"
                        id="btn-${categoryName}" 
                        type="button" 
                        aria-expanded="false"
                        aria-controls="${categoryName}">${categoryName}
                </button>
                <i id="caret-down" class="fas fa-angle-down"></i>
            </div>

            <div class="menu-header open" id="menu-header-open-${categoryName}" isActive="true">
                <input id="searchInto-${categoryName}" class="searchInput" placeholder="rechercher un ${categoryName}">
                <i id="caret-up" class="fas fa-angle-up"></i>
            </div>

            <div class="collapse multi-collapse category-menu" id="menu-${categoryName}" isOpen="false">
                <div class="card card-body">
                    <ul id="${categoryName}-list" class="list flex-column">
                    </ul>
                </div>
                <div id="${categoryName}-input-suggestions">
                    <ul id="${categoryName}-suggestions-list" class="suggestions-list">
                    </ul>
                </div>
            </div>
        `;

        this.setAttribute('isActive', 'false'); // default component state
        this.setAttribute('id', 'collapsing-'+ categoryName); // default component state
        let currentSibling = this;
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
            listELement.addEventListener('click', function(event){ selectItemInList(event); }, false);
            categoryUl.appendChild(listELement);
        });

        // default : suggestions = not visible
        const suggestionsWrapper = this.querySelector('#'+categoryName+'-input-suggestions');
        suggestionsWrapper.style.display = 'none';
        
        let menuHeaderClose = this.querySelector('#menu-header-close-' + categoryName);
        let menuHeaderOpen = this.querySelector('#menu-header-open-' + categoryName);
        menuHeaderOpen.style.display = 'none'; // defaut =  not displayed
        let menuToOpen = this.querySelector('#menu-'+ categoryName);

        let caretUp = this.querySelector('#caret-up');
        
        let currentTags = [];

        // COLLAPSING MENUS METHODS ================================================================
        // By default, click event = on whole menu Header to OPEN ONLY
        // ( cannot use a TOGGLE method here, for open/close events are passed through different elements
        menuHeaderClose.addEventListener('click', function(event){ menuOpen(event),{ once: true }; }, false);
        
        function menuOpen(event) {
            menuHeaderClose = event.currentTarget; // element that handles event
            event.stopPropagation();
            
            RecipeModule.checkWhosOpen(); // checks if any other menu is open already

            currentSibling.removeAttribute('isActive', 'false'); 
            currentSibling.setAttribute('isActive', 'true');// mark collapsing menu as active (for module to avoid multiple openings)
            
            menuHeaderClose.style.display = 'none';
            menuHeaderOpen.style.display = 'flex';

            menuToOpen.style.display = 'flex'; // show list

            caretUp.addEventListener('click',function(event){ menuClose(event), { once: true }; }, false);    

            parentAdvancedSearchWrapper.classList.replace('col-6', 'col-12'); // parent expands to give space to menu
            currentSibling.classList.replace('col', 'col-6'); // menu width expands
        }

        function menuClose(event) {
            caretUp = event.currentTarget; // element that handles event
            event.stopPropagation();

            menuHeaderOpen.style.display = 'none';
            menuHeaderClose.style.display = 'flex';

            menuToOpen.style.display = 'none'; // hide list
            currentSibling.removeAttribute('isActive', 'true');
            
            parentAdvancedSearchWrapper.classList.replace('col-12', 'col-6'); // parent shrinks back
            currentSibling.classList.replace('col-6', 'col'); // menu width shrinks back
            
            currentSibling.setAttribute('isActive', 'false');
        }


        // HANDLE SEARCH OF ADVANCED SEARCH ==================================================
        let searchInputField = this.querySelector('#searchInto-'+ categoryName);
        let searchTerm = '';
        let inputFieldTouched = false;
        
        // handle manual typing in input field : activated at first keystroke
        searchInputField.addEventListener('input', function(event){ handleManualInput(event); }, false);

        // press ENTER to confirm selected list item or typed in word to search
        searchInputField.addEventListener('keydown', function(event){ handleSelectItemInput(event); }, false);

        // handle select item in list : send it into input field
        function selectItemInList(event) {
            let word = event.target.innerText; // text inside <p> element where event occurs
            let inputField = document.querySelector('#searchInto-'+ categoryName);
            inputField.value = word; // make selected word the current search word of input field
        }

        function handleSelectItemInput(event) {
            searchTerm = event.target.value;
            searchInputField = event.target;
            // retrieve current category from input id  ( ex '#searchInto-ingredients')
            let currentCategoryName = searchInputField.getAttribute('id');
            currentCategoryName = currentCategoryName.slice(11, currentCategoryName.length);
            // console.log('currentCategoryName', currentCategoryName);
            inputFieldTouched = true;
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
                // launch search for term in current results
                RecipeModule.processAdvancedSearch(searchTerm, currentCategoryName);
            }
        }

        function handleManualInput(event) {
            searchTerm = event.target.value;
            searchInputField = event.target;
            let currentCategoryName = searchInputField.getAttribute('id');
            if (searchTerm.length > 3) {
                processManualInputSearchIntoCurrentList(searchTerm, currentCategoryName);
            }
            // process input as it enters field = init match search
            inputFieldTouched = true;
            handleManualSearchReset();
        }

        function processManualInputSearchIntoCurrentList(searchTerm, currentCategoryName) {

            // retrieve current items of category
            let currentItems = [];
            let parentList = document.querySelector('#ingredients-list');
            // let parentList = document.querySelector('#' + currentCategoryName +'-list');
            let currentList = parentList.querySelectorAll('a');
            currentList.forEach( anchorTag => { currentItems.push(anchorTag.innerText); });
            console.log('currentItems==',currentItems);
            
            let currentSuggestions = currentItems.filter(item => { item.toLowerCase().includes(searchTerm.toLowerCase()); });

            console.log('currentSuggestions==', currentSuggestions);
            displayCurrentSuggestions(currentSuggestions) ;         
        }

        function displayCurrentSuggestions(currentSuggestions) {
            // first, hide the whole current list
            categoryUl.style.visibility = 'hidden';

            // suggestions wrapper becomes visible
            suggestionsWrapper.style.display = 'flex';

            // populate each menu container with category list items - DEFAULT VIEW : all recipes categories
            currentSuggestions.forEach(el => {
                // generate li item element for each item of each category
                let listELement = new MenuListItem(el);
                // add select event on each item
                listELement.addEventListener('click', function(event){ selectItemInList(event); }, false);
                suggestionsWrapper.appendChild(listELement);
            });


        }


        // case where user deletes chars until field = empty or deletes the whole searchterm
        // when input has been touched + searchterm is empty + focus still on input
        function handleManualSearchReset(){
            if ( inputFieldTouched && !searchTerm && searchInputField == document.activeElement ){
                console.log('NEW SEARCH PENDING');
                RecipeModule.resetSearch();
                RecipeModule.resetSuggestions();
            }
        }







        // keep track of tags to prevent displaying the same one more than once
        // AND is used by search method that needs an up-to-date array of tags
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

