
/* ================================================== */
/* BASE TEMPLATE CONTEXT FOR HEADER */
/* ================================================== */

export class HeaderBaseTemplate extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = 
        `
        <div id="header-wrapper" class="header-wrapper">
            <header class="header" role="banner" id="header">
                <div id="header__logo-wrapper" class="header__logo-wrapper" tabindex="0">
                    <a href="" aria-label="Les petits plats homepage"><img src="./assets/icons/toque.png" alt="Les petits plats logo"></a>
                    <h1>Les petits plats</h1>
                </div>
            </header>
        </div>
        `;

        // KEYBOARD NAV SUPPORT
        const logoDiv = this.querySelector('#header__logo-wrapper');
        logoDiv.addEventListener('focus', function(event){
            let logo = event.target;
            if (logo == document.activeElement) {
                logo.addEventListener('keydown', function(event){
                    // on logo press enter =>  = click() child a
                    if ( event.keyCode === 13 ) {
                        logo.firstElementChild.click();}
                }, false);
            }
        }, false);
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('header-template-component', HeaderBaseTemplate);
