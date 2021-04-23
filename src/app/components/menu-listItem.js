/* ================================================== */
/* TEMPLATE FOR A SEARCH MENU LIST ITEM  */
/* ================================================== */

export class MenuListItem extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `

            <li>
                <a>test</a>
            </li>
        `;
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('menu-list-item-component', MenuListItem);

