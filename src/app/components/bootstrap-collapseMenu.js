/* ================================================== */
/* TEMPLATE FOR A SEARCH MENU : button + collapsible menu body  */
/* ================================================== */
export class CollapsingMenu extends HTMLElement{
    constructor(){
        super();
        
        this.innerHTML = `
            <p class="menu-btn">
                <button class="btn" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target=""
                        aria-expanded="false"
                        aria-controls="">
                    
                    <i class="fas fa-angle-down"></i>
                </button>
            </p>
            <div class="collapse multi-collapse" id="">
                <div class="card card-body">
                    <ul>
                    </ul>
                </div>
            </div>
        `;
    }
}
// register custom element in the built-in CustomElementRegistry object
customElements.define('collapsing-menu-component', CollapsingMenu);

