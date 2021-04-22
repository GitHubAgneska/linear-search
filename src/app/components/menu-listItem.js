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