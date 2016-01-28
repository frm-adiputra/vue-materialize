<template>
  <mdl-layout-header slot="header" class="demo-header mdl-color--grey-100 mdl-color-text--grey-600">
    <mdl-layout-header-row>
      <mdl-layout-title>Home</mdl-layout-title>
      <mdl-layout-spacer></mdl-layout-spacer>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
        <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder">
          <input class="mdl-textfield__input" type="text" id="search">
          <label class="mdl-textfield__label" for="search">Enter your query...</label>
        </div>
      </div>
      <mdl-button ripple icon id="hdrbtn">
        <i class="material-icons">more_vert</i>
      </mdl-button>
      <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
        <li class="mdl-menu__item">About</li>
        <li class="mdl-menu__item">Contact</li>
        <li class="mdl-menu__item">Legal information</li>
      </ul>
    </mdl-layout-header-row>
  </mdl-layout-header>
</template>

<script>
import MdlButton from '../mdl/Button'
import MdlLayoutHeader from '../mdl/layout/Header'
import MdlLayoutHeaderRow from '../mdl/layout/HeaderRow'
import MdlLayoutTitle from '../mdl/layout/Title'
import MdlLayoutSpacer from '../mdl/layout/Spacer'

export default {
  components: {
    MdlButton,
    MdlLayoutHeader,
    MdlLayoutHeaderRow,
    MdlLayoutTitle,
    MdlLayoutSpacer
  }
}
</script>
