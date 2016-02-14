<template>
  <div class="mdl-slider__container">
    <input class="mdl-slider mdl-js-slider is-upgraded" type="range"
      :min.once="min"
      :max.once="max"
      v-model="value"
      number>
    <div class="mdl-slider__background-flex">
      <div class="mdl-slider__background-lower"></div>
      <div class="mdl-slider__background-upper"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true,
      twoWay: true
    }
  },
  ready () {
    if (this.max <= this.min) {
      console.warn('[Vue Materialized]', 'Min must be less than Max')
    }
  }
}
</script>
