# fski-smobile

## Fonctionnalité

- Permet de gérer les sous-menu d'un menu mobile

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

Activation en javascript
```js
import { SubMobile } from "fski-smobile";
SubMobile.bind();
```
Exemple d'activation en html : la class subnav doit avoir un id lié avec un l'attribut data-menudown.

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