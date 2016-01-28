<template>
  <button :disabled="disabled" class="mdl-button mdl-js-button" :class="{'mdl-button--icon': icon, 'mdl-button--accent': accent, 'mdl-button--primary': primary, 'mdl-button--mini-fab': miniFab, 'mdl-button--fab': fab || miniFab, 'mdl-button--raised': raised, 'mdl-button--colored': colored, 'mdl-js-ripple-effect': ripple}">
    <slot></slot>
  </button>
</template>

<script>
var componentHandler = require('componentHandler')

export default {
  props: {
    accent: Boolean,
    colored: Boolean,
    disabled: Boolean,
    fab: Boolean,
    icon: Boolean,
    miniFab: Boolean,
    primary: Boolean,
    raised: Boolean,
    ripple: Boolean
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  ready () {
    componentHandler.upgradeElement(this.$el)
  }
}
</script>
