<template>
  <md-layout-drawer class="demo-drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
    <header class="demo-drawer-header">
      <img src="../images/user.jpg" class="demo-avatar">
      <div class="demo-avatar-dropdown">
        <span>hello@example.com</span>
        <div class="mdl-layout-spacer"></div>
        <md-button id="accbtn" ripple icon>
          <i class="material-icons" role="presentation">arrow_drop_down</i>
          <span class="visuallyhidden">Accounts</span>
        </md-button>
        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
          <li class="mdl-menu__item">hello@example.com</li>
          <li class="mdl-menu__item">info@example.com</li>
          <li class="mdl-menu__item"><i class="material-icons">add</i>Add another account...</li>
        </ul>
      </div>
    </header>
    <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
      <a class="mdl-navigation__link" v-link="{path: '/home'}">Home</a>
      <a class="mdl-navigation__link" v-link="{path: '/badge'}">Badges</a>
      <a class="mdl-navigation__link" v-link="{path: '/button'}">Buttons</a>
      <a class="mdl-navigation__link" v-link="{path: '/card'}">** Cards</a>
      <a class="mdl-navigation__link" v-link="{path: '/dialog'}">** Dialogs</a>
      <a class="mdl-navigation__link" v-link="{path: '/layout'}">Layout</a>
      <a class="mdl-navigation__link" v-link="{path: '/list'}">** Lists</a>
      <a class="mdl-navigation__link" v-link="{path: '/loading'}">** Loading</a>
      <a class="mdl-navigation__link" v-link="{path: '/progress'}">Progress bar</a>
      <a class="mdl-navigation__link" v-link="{path: '/menu'}">Menus</a>
      <a class="mdl-navigation__link" v-link="{path: '/slider'}">** Sliders</a>
      <a class="mdl-navigation__link" v-link="{path: '/snackbar'}">** Snackbar</a>
      <a class="mdl-navigation__link" v-link="{path: '/toggle'}">** Toggles</a>
      <a class="mdl-navigation__link" v-link="{path: '/checkbox'}">Checkboxes</a>
      <a class="mdl-navigation__link" v-link="{path: '/table'}">** Tables</a>
      <a class="mdl-navigation__link" v-link="{path: '/textfield'}">** Text fields</a>
      <a class="mdl-navigation__link" v-link="{path: '/tooltip'}">** Tooltips</a>
      <div class="mdl-layout-spacer"></div>
      <a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span class="visuallyhidden">Help</span></a>
    </nav>
  </md-layout-drawer>
</template>

<script>
import MdButton from '../md/Button'
import MdLayoutDrawer from '../md/layout/Drawer'
import MdLayoutTitle from '../md/layout/Title'
import MdLayoutSpacer from '../md/layout/Spacer'

export default {
  components: {
    MdButton,
    MdLayoutDrawer,
    MdLayoutTitle,
    MdLayoutSpacer
  }
}
</script>
