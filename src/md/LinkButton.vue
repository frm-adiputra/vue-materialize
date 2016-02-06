<template>
  <a
    class="mdl-button mdl-js-button"
    :class="{'mdl-button--icon': icon, 'mdl-button--accent': accent, 'mdl-button--primary': primary, 'mdl-button--mini-fab': miniFab, 'mdl-button--fab': fab || miniFab, 'mdl-button--raised': raised, 'mdl-button--colored': colored, 'mdl-js-ripple-effect': ripple}"
    :disabled="disabled"
    v-on:mouseup="blur"
    v-on:mouseleave="blur">

    <slot></slot>
    <md-ripple v-if="ripple" class="mdl-button__ripple-container">
    </md-ripple>
  </a>
</template>

<script>
// This is identical to md-button, except that it uses <a> element
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
  methods: {
    blur (event) {
      this.$el.blur()
    }
  },
  ready () {
  }
}
</script>
