/* ================================================== */
/* PAGE TEMPLATE FOR ANY 'MAIN' CONTENT TO BE HOSTED  */
/* ================================================== */

export class BasePageTemplate extends HTMLElement {
    // constructor(pageView){
    constructor(){
        super();

        // generate 'main'
        const main = document.createElement('main');

        this.appendChild(main);

    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('base-page-component', BasePageTemplate);