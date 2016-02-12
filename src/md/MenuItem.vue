<template>
  <li class="mdl-menu__item" :class="{'mdl-js-ripple-effect': ripple}">
    <slot></slot>

    <md-ripple v-if="ripple" class="mdl-menu__item-ripple-container">
    </md-ripple>
  </li>
</template>

<script>
import './Ripple'

export default {
  props: {
    ripple: Boolean,
    item: {}
  }
}
</script>
