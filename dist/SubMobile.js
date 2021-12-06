/**
 * @property {HTMLElement} element
 * @property {{target: string, active:string, menu: string, subMenu: string}} options
 */
export class SubMobile {
    /**
     * @param {HTMLElement} el, l'élement
     * @param {OPT} opt
     */
    constructor(el, opt) {
        this._options = SubMobile.defOptions;
        // permet de reset les sous menus au préalable
        this.resetSMenu = () => {
            if (!this._elMobile)
                return;
            // on retire la classe active aux autres elements du menu
            Array.from(this._elMobile.querySelectorAll(`.${this._options.actif}`), (element) => {
                if (element !== this._parentElement)
                    element.classList.remove(this._options.actif);
            });
            // on retire la classe active aux autres elements du menu
            Array.from(this._elMobile.querySelectorAll(`.${this._options.subMenu}`), (element) => {
                if (element instanceof HTMLElement) {
                    if (element.id !== this._options.target)
                        element.style.display = "none";
                }
            });
        };
        this.onClick = (e) => {
            e.preventDefault();
            if (!this._parentElement || !this._menudown)
                return;
            this.resetSMenu();
            this._parentElement.classList.toggle(this._options.actif);
            if (this._menudown.style.display == "none") {
                this._menudown.style.display = "block";
                this._menudown.style.opacity = "0";
                setTimeout(() => {
                    if (this._menudown)
                        this._menudown.style.opacity = "1";
                }, 1);
            }
            else
                this._menudown.style.display = "none";
        };
        this._element = el;
        this._options = Object.assign(Object.assign({}, SubMobile.defOptions), opt);
        if (!this._options.target)
            return;
        this._elMobile = document.querySelector(`.${this._options.menu}`);
        this._parentElement = el.parentElement;
        this._menudown = document.getElementById(this._options.target);
        // on pose le click si le sous-menu est trouvé
        if (!this._menudown) {
            console.log(`SubMobile : Erreur id  -${this._options.target}- non trouvé`);
            return;
        }
        el.addEventListener("click", this.onClick);
        this._menudown.style.transition = "opacity 1s ease-out";
        this._menudown.style.display = "none";
    }
    /**
     * Permet de gerer la logique d'un menu mobile
     *
     * @param {*} OPT, les options de la classes
     * @returns
     */
    static async bind(options = SubMobile.defOptions) {
        return Array.from(document.querySelectorAll("[data-menudown]")).map((el) => {
            if (!(el instanceof HTMLElement) || !el.dataset.menudown)
                return undefined;
            if (el.dataset.menudown.startsWith("{"))
                options = Object.assign(Object.assign({}, options), JSON.parse(el.dataset.menudown));
            else
                options = Object.assign(Object.assign({}, options), { target: el.dataset.menudown });
            return new SubMobile(el, options);
        });
    }
}
SubMobile.defOptions = {
    actif: "active",
    menu: "mobile",
    subMenu: "subnav"
};
