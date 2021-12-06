# fski-smobile

## Fonctionnalités

- Permet de gèrer les sous-mobiles dans le cadre d'un menu mobile
- Le style css pour un menu 

## Nagivateurs testés

Chrome | Firefox| Edge | 
--- | --- | --- | 
Latest ✔ | Latest ✔ |  Latest ✔ | 

## Installation

Using npm:

```bash
$ npm install fski-smobile
```

## Example

Activation en js 
```js
import { SubMobile } from "fski-SubMobile";

SubMobile.bind();
```
Html

```html
    <div class="mobile">
      <!-- déclaration du sous-menu -->
        <div id="tag_menu_1" class="subnav">
          ...
        </div>
      <!-- menu princile -->

        <div class="nav">
        <div class="bloc-icon">
          <a href="#" data-menudown="tag_menu_1">  <!-- reférence vers ke sous-menu-->
            <img src="img/follow_the_signs-24px.svg" />
          </a>
        </div>
```

## Resources

## License
[MIT](LICENSE)