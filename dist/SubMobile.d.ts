/**
 * @property {HTMLElement} element
 * @property {{target: string, active:string, menu: string, subMenu: string}} options
 */
declare type OPT = {
    target?: string;
    actif: string;
    menu: string;
    subMenu: string;
};
export default class SubMobile {
    private _element?;
    private _elMobile?;
    private _menudown?;
    private _options;
    static defOptions: OPT;
    /**
     * @param {HTMLElement} el, l'élement
     * @param {OPT} opt
     */
    constructor(el: HTMLElement, opt: OPT);
    resetSMenu: () => void;
    onClick: (e: Event) => void;
    /**
     * Permet de gerer la logique d'un menu mobile avec des sous-menus
     *
     * @param {*} OPT, les options de la classe
     * @returns
     */
    static bind(options?: OPT): Promise<(SubMobile | undefined)[]>;
}
export {};
