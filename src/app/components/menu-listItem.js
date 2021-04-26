/* ================================================== */
/* TEMPLATE FOR A SEARCH MENU LIST ITEM  */
/* ================================================== */

export class MenuListItem extends HTMLElement {
    constructor(name) {
        super();

        this.innerHTML = `

            <li>
                <a>${name}</a>
            </li>
        `;
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('menu-list-item-component', MenuListItem);

