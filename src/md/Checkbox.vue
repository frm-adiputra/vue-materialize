<template>
  <label class='mdl-checkbox mdl-js-checkbox' :for.once='id' :class='{"mdl-js-ripple-effect": ripple, "is-disabled": disabled, "is-checked": checked}' :style='{textAlign: "start"}'>
    <input type="checkbox" class='mdl-checkbox__input' :id.once='id' :value='value' v-model='checked' :disabled="disabled">
    <span class='mdl-checkbox__label'><slot></slot></span>
  </label>
</template>

<script>
import componentHandler from 'componentHandler'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    value: {},
    checked: {
      twoWay: true
    },
    ripple: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  ready () {
    componentHandler.upgradeElement(this.$el)
  }
}
</script>
