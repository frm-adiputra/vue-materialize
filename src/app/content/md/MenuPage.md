# MENUS

Lists of clickable actions.

## Popup Position

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--4-col mdl-cell--top mdl-cell--middle">
    <md-button id="demo-menu-bottom-left" v-on:click="toggleMenuBottomLeft" ripple>
      Bottom Left
    </md-button>

    <md-menu :menu.once="mymenu" :show.sync="menuBottomLeft" for="demo-menu-bottom-left" ripple item-partial="simple-menu-item">
    </md-menu>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--4-col mdl-cell--top mdl-cell--middle">
    <md-button id="demo-menu-bottom-right" v-on:click="toggleMenuBottomRight" ripple>
      Bottom Right
    </md-button>

    <md-menu :menu.once="mymenu" :show.sync="menuBottomRight" for="demo-menu-bottom-right" ripple item-partial="simple-menu-item" pos="bottom-right" use-if>
    </md-menu>
  </div>
</div>

```html
<!-- Anchored to bottom left -->
<md-button id="demo-menu-bottom-left" v-on:click="toggleMenuBottomLeft" ripple>
  Bottom Left
</md-button>

<md-menu :menu.once="mymenu" :show.sync="menuBottomLeft"
  for="demo-menu-bottom-left"
  item-partial="simple-menu-item"
  ripple>
</md-menu>

<!-- Anchored to bottom right -->
<md-button id="demo-menu-bottom-right" v-on:click="toggleMenuBottomRight" ripple>
  Bottom Right
</md-button>

<md-menu :menu.once="mymenu" :show.sync="menuBottomRight"
  for="demo-menu-bottom-right"
  item-partial="simple-menu-item" pos="bottom-right"
  ripple>
</md-menu>

<!-- Vue instance -->
<script>
  new Vue({
    el: '#app',
    data () {
      return {
        mymenu: [{title: 'Cut'}, {title: 'Copy'}, {title: 'Paste'}],
        menuBottomLeft: false,
        menuBottomRight: false
      }
    },
    methods: {
      toggleMenuBottomLeft () {
        this.menuBottomLeft = !this.menuBottomLeft
      },
      toggleMenuBottomRight () {
        this.menuBottomRight = !this.menuBottomRight
      }
    }
  })
</script>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--4-col mdl-cell--top mdl-cell--middle">
    <md-button id="demo-menu-top-left" v-on:click="toggleMenuTopLeft" ripple>
      Top Left
    </md-button>

    <md-menu :menu.once="mymenu" :show.sync="menuTopLeft" for="demo-menu-top-left" ripple item-partial="simple-menu-item" pos="top-left">
    </md-menu>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--4-col mdl-cell--top mdl-cell--middle">
    <md-button id="demo-menu-top-right" v-on:click="toggleMenuTopRight" ripple>
      Top Right
    </md-button>

    <md-menu :menu.once="mymenu" :show.sync="menuTopRight" for="demo-menu-top-right" ripple item-partial="simple-menu-item" pos="top-right">
    </md-menu>
  </div>
</div>

```html
<!-- Anchored to top left -->
<md-button id="demo-menu-top-left" v-on:click="toggleMenuTopLeft" ripple>
  Top Left
</md-button>

<md-menu :menu.once="mymenu" :show.sync="menuTopLeft"
  for="demo-menu-top-left"
  item-partial="simple-menu-item"
  ripple>
</md-menu>

<!-- Anchored to top right -->
<md-button id="demo-menu-top-right" v-on:click="toggleMenuTopRight" ripple>
  Top Right
</md-button>

<md-menu :menu.once="mymenu" :show.sync="menuTopRight"
  for="demo-menu-top-right"
  item-partial="simple-menu-item" pos="top-right"
  ripple>
</md-menu>

<!-- Vue instance -->
<script>
  new Vue({
    el: '#app',
    data () {
      return {
        mymenu: [{title: 'Cut'}, {title: 'Copy'}, {title: 'Paste'}],
        menuTopLeft: false,
        menuTopRight: false
      }
    },
    methods: {
      toggleMenuTopLeft () {
        this.menuTopLeft = !this.menuTopLeft
      },
      toggleMenuTopRight () {
        this.menuTopRight = !this.menuTopRight
      }
    }
  })
</script>
```

## Configuration props

- `ripple`: Applies ripple click effect
- `useIf`: Use `v-if` instead of `v-show` for displaying the menu
- `menu`: Array of menu items data
- `show`: Bind to the variable that controls menu popup
- `itemPartial`: Partial to be used for rendering menu item
- `pos`: Anchor position of menu popup
- `for`: Element's id used for anchoring popup
