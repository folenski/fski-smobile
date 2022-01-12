(() => {
  // dist/SubMobile.js
  var SubMobile = class {
    constructor(el, opt) {
      var _a;
      this._options = SubMobile.defOptions;
      this.resetSMenu = () => {
        if (!this._elMobile)
          return;
        Array.from(this._elMobile.querySelectorAll(`.${this._options.actif}`), (element) => {
          if (element !== this._element)
            element.classList.remove(this._options.actif);
        });
        Array.from(this._elMobile.querySelectorAll(`.${this._options.subMenu}`), (element) => {
          if (element instanceof HTMLElement) {
            if (element.id !== this._options.target)
              element.style.display = "none";
          }
        });
      };
      this.onClick = (e) => {
        e.preventDefault();
        if (!this._element || !this._menudown)
          return;
        this.resetSMenu();
        this._element.classList.toggle(this._options.actif);
        if (this._menudown.style.display == "none") {
          this._menudown.style.display = "block";
          this._menudown.style.opacity = "0";
          setTimeout(() => {
            if (this._menudown)
              this._menudown.style.opacity = "1";
          }, 1);
        } else
          this._menudown.style.display = "none";
      };
      this._options = Object.assign(Object.assign({}, SubMobile.defOptions), opt);
      if (!this._options.target)
        return;
      this._elMobile = document.querySelector(`.${this._options.menu}`);
      if (!this._elMobile)
        return;
      this._element = el.parentElement;
      if (!this._element)
        return;
      const subnav = this._element.querySelector(`.${this._options.subMenu}`);
      if (subnav) {
        const newnav = (_a = subnav.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(subnav);
        if (newnav)
          this._elMobile.insertBefore(newnav, this._elMobile.firstChild);
      }
      this._menudown = document.getElementById(this._options.target);
      if (!this._menudown) {
        console.error(`SubMobile : Erreur id  -${this._options.target}- non trouv\xE9`);
        return;
      }
      el.addEventListener("click", this.onClick);
      this._menudown.style.transition = "opacity 1s ease-out";
      this._menudown.style.display = "none";
    }
    static async bind(options = SubMobile.defOptions) {
      return Array.from(document.querySelectorAll("[data-menudown]")).map((el) => {
        if (!(el instanceof HTMLElement) || !el.dataset.menudown)
          return void 0;
        if (el.dataset.menudown.startsWith("{"))
          options = Object.assign(Object.assign({}, options), JSON.parse(el.dataset.menudown));
        else
          options = Object.assign(Object.assign({}, options), { target: el.dataset.menudown });
        return new SubMobile(el, options);
      });
    }
  };
  SubMobile.defOptions = {
    actif: "active",
    menu: "mobile",
    subMenu: "subnav"
  };

  // tests/test-app.js
  SubMobile.bind({ actif: "active" });
})();
