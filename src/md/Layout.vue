<template>
  <div class="mdl-layout mdl-js-layout">
    <slot name="header"></slot>
    <slot name="drawer"></slot>
    <slot></slot>
  </div>
</template>

<script>
// var componentHandler = require('componentHandler')

export default {
  methods: {
    hasHeader () {
      return (this.$el.querySelector('[slot=header]') != null)
    },
    hasDrawer () {
      return (this.$el.querySelector('[slot=drawer]') != null)
    }
  },
  ready () {
    // componentHandler.upgradeElement(this.$el)
  }
}
</script>
