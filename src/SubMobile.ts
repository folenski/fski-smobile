/**
 * @property {HTMLElement} element
 * @property {{target: string, active:string, menu: string, subMenu: string}} options
 */

type OPT = {
  target?: string;
  actif: string;
  menu: string;
  subMenu: string;
};

export default class SubMobile {
  private _element?: HTMLElement | null;
  private _elMobile?: HTMLElement | null;
  private _menudown?: HTMLElement | null;
  private _options: OPT = SubMobile.defOptions;

  public static defOptions: OPT = {
    actif: "active",
    menu: "mobile",
    subMenu: "subnav"
  };

  /**
   * @param {HTMLElement} el, l'élement
   * @param {OPT} opt
   */
  constructor(el: HTMLElement, opt: OPT) {
    this._options = { ...SubMobile.defOptions, ...opt };
    if (!this._options.target) return;

    // le menu mobile
    this._elMobile = document.querySelector(`.${this._options.menu}`);
    if (!this._elMobile) return;

    // on selectionne le parent de l'element data-menudown
    this._element = el.parentElement;
    if (!this._element) return;

    // on recherche si il y a une div subnav dans le lien car il nécessaire de la déplacer
    const subnav = this._element.querySelector(`.${this._options.subMenu}`);
    if (subnav) {
      const newnav = subnav.parentNode?.removeChild(subnav);
      if (newnav)
        this._elMobile.insertBefore(newnav, this._elMobile.firstChild);
    }

    this._menudown = document.getElementById(this._options.target);

    // on pose le click si le sous-menu est trouvé
    if (!this._menudown) {
      console.error(
        `SubMobile : Erreur id  -${this._options.target}- non trouvé`
      );
      return;
    }
    el.addEventListener("click", this.onClick);
    this._menudown.style.transition = "opacity 1s ease-out";
    this._menudown.style.display = "none";
  }

  // permet de reset les sous menus au préalable
  resetSMenu = (): void => {
    if (!this._elMobile) return;

    // on retire la classe active aux autres elements du menu
    Array.from(
      this._elMobile.querySelectorAll(`.${this._options.actif}`),
      (element) => {
        if (element !== this._element)
          element.classList.remove(this._options.actif);
      }
    );

    // on retire la classe active aux autres elements du menu
    Array.from(
      this._elMobile.querySelectorAll(`.${this._options.subMenu}`),
      (element) => {
        if (element instanceof HTMLElement) {
          if (element.id !== this._options.target)
            element.style.display = "none";
        }
      }
    );
  };

  onClick = (e: Event): void => {
    e.preventDefault();

    if (!this._element || !this._menudown) return;

    this.resetSMenu();

    this._element.classList.toggle(this._options.actif);
    if (this._menudown.style.display == "none") {
      this._menudown.style.display = "block";
      this._menudown.style.opacity = "0";
      setTimeout(() => {
        if (this._menudown) this._menudown.style.opacity = "1";
      }, 1);
    } else this._menudown.style.display = "none";
  };

  /**
   * Permet de gerer la logique d'un menu mobile avec des sous-menus
   *
   * @param {*} OPT, les options de la classe
   * @returns
   */
  static async bind(options: OPT = SubMobile.defOptions) {
    return Array.from(document.querySelectorAll("[data-menudown]")).map(
      (el) => {
        if (!(el instanceof HTMLElement) || !el.dataset.menudown)
          return undefined;

        if (el.dataset.menudown.startsWith("{"))
          options = { ...options, ...JSON.parse(el.dataset.menudown) };
        else options = { ...options, target: el.dataset.menudown };

        return new SubMobile(el, options);
      }
    );
  }
}
