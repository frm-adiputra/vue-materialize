<template>
  <md-layout-header slot="header" class="demo-header mdl-color--grey-100 mdl-color-text--grey-600">
    <md-layout-header-row>
      <md-layout-title>Home</md-layout-title>
      <md-layout-spacer></md-layout-spacer>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder">
          <input class="mdl-textfield__input" type="text" id="search">
          <label class="mdl-textfield__label" for="search">Enter your query...</label>
        </div>
      </div>
      <button v-md-button ripple icon id="hdrbtn">
        <i class="material-icons">more_vert</i>
      </button>
      <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
        <li class="mdl-menu__item">About</li>
        <li class="mdl-menu__item">Contact</li>
        <li class="mdl-menu__item">Legal information</li>
      </ul>
    </md-layout-header-row>
  </md-layout-header>
</template>

<script>
import '../md/Button'
import MdLayoutHeader from '../md/layout/Header'
import MdLayoutHeaderRow from '../md/layout/HeaderRow'
import MdLayoutTitle from '../md/layout/Title'
import MdLayoutSpacer from '../md/layout/Spacer'

export default {
  components: {
    MdLayoutHeader,
    MdLayoutHeaderRow,
    MdLayoutTitle,
    MdLayoutSpacer
  }
}
</script>
