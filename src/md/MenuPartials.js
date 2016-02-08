import Vue from 'vue'

Vue.partial(
  'menu-inner',
  `<div
  v-el:outline
  class="mdl-menu__outline"
  :class="{'mdl-menu--bottom-left': bottomLeft, 'mdl-menu--bottom-right': bottomRight, 'mdl-menu--top-right': topRight, 'mdl-menu--top-left': topLeft, 'mdl-menu--unaligned': unaligned}"
  :style="{width: width + 'px', height: height + 'px'}">
</div>
<ul
  v-el:element
  class="mdl-menu mdl-js-menu"
  tabindex="-1"
  v-on:keydown="handleForKeyboardEvent_"
  :class="{'mdl-js-ripple-effect': ripple, 'mdl-js-ripple-effect--ignore-events': ripple, 'mdl-menu--bottom-left': bottomLeft, 'mdl-menu--bottom-right': bottomRight, 'mdl-menu--top-right': topRight, 'mdl-menu--top-left': topLeft, 'mdl-menu--unaligned': unaligned}"
  :style="{clip: clip}">

  <md-menu-item v-for="item in menu"
    v-ref:items
    tabindex="-1"
    :ripple.once="ripple"
    v-on:keydown="handleItemKeyboardEvent_"
    v-on:click="handleItemClick_">

    <partial :name="itemPartial"></partial>
  </md-menu-item>
</ul>`
)

Vue.partial(
  'menu-if',
  `<div
  v-if="show"
  v-el:container
  transition="menu"
  class="mdl-menu__container is-upgraded"
  :style="{width: width + 'px', height: height + 'px', left: left, right: right, bottom: bottom, top: top}">
  <partial name="menu-inner"></partial>
</div>`
)

Vue.partial(
  'menu-show',
  `<div
  v-show="show"
  v-el:container
  transition="menu"
  class="mdl-menu__container is-upgraded"
  :style="{width: width + 'px', height: height + 'px', left: left, right: right, bottom: bottom, top: top}">
  <partial name="menu-inner"></partial>
</div>`
)

Vue.partial(
  'simple-menu-item',
  `<span>{{item.title}}</span>`
)
