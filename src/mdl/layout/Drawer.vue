<template>
  <header class="mdl-layout__drawer">
    <slot></slot>
  </header>
</template>

<script>
var componentHandler = require('componentHandler')

export default {
  ready () {
    componentHandler.upgradeElement(this.$el)
  }
}
</script>
