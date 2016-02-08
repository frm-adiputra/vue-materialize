# MENUS

Lists of clickable actions.

<div class="mdl-grid">
  <md-button id="demo-menu-lower-left" v-on:click="toggleMenu" icon ripple>
    <i class="material-icons">more_vert</i>
  </md-button>

  <div>{{mymenuVisible}}</div>

  <md-menu :menu.once="mymenu" :show.sync="mymenuVisible" for="demo-menu-lower-left" ripple item-partial="simple-menu-item">
  </md-menu>
</div>

```html
<md-button id="demo-menu-lower-left" icon>
  <i class="material-icons">more_vert</i>
</md-button>

<md-menu menu="mymenu" for="demo-menu-lower-left" ripple item-partial="simple-menu-item">
</md-menu>
```
