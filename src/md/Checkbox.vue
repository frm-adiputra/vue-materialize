<template>
  <label class="mdl-checkbox mdl-js-checkbox is-upgraded"
    :for.once="id"
    v-on:mouseup="onMouseUp"
    :class='{"mdl-js-ripple-effect": ripple, "is-focused": focused, "is-disabled": disabled, "is-checked": inputChecked}'>

    <input
      type="checkbox"
      class="mdl-checkbox__input"
      v-el:input
      v-model="checked"
      v-on:focus="onFocus"
      v-on:blur="onBlur"
      :id.once="id"
      :value="value"
      :disabled="disabled">

    <span class="mdl-checkbox__label"><slot></slot></span>
    <span class="mdl-checkbox__focus-helper"></span>
    <span class="mdl-checkbox__box-outline">
      <span class="mdl-checkbox__tick-outline"></span>
    </span>

    <span v-if="ripple" class="mdl-checkbox__ripple-container mdl-js-ripple-effect mdl-ripple--center">
      <span class="mdl-ripple is-animating" style="width: 103.823px; height: 103.823px; transform: translate(-50%, -50%) translate(18px, 18px);"></span>
    </span>
  </label>
</template>

<script>
let TINY_TIMEOUT = 0.001

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
  data () {
    return {
      focused: false,
      inputChecked: false
    }
  },
  methods: {
    onChange (event) {
    },
    onFocus (event) {
      this.focused = true
    },
    onBlur (event) {
      this.focused = false
    },
    onMouseUp (event) {
      this.blur()
    },
    blur () {
      window.setTimeout(function () {
        this.$els.input.blur()
      }.bind(this), /** @type {number} */ (TINY_TIMEOUT))
    }
  },
  watch: {
    checked () {
      this.inputChecked = this.$els.input.checked
    }
  },
  ready () {
    this.inputChecked = this.$els.input.checked
  }
}
</script>
