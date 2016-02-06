import Vue from 'vue'

Vue.component('md-progress', {
  template: `<div class="mdl-progress mdl-js-progress" :class='{ "mdl-progress__indeterminate": indeterminate }'>
  <div v-el:progressbar class="progressbar bar bar1" :style="{width: progress + '%'}"></div>
  <div v-el:bufferbar class="bufferbar bar bar2" :style="{width: buffer + '%'}"></div>
  <div v-el:auxbar class="auxbar bar bar3" :style="{width: auxwidth}"></div>
</div>`,
  props: {
    indeterminate: {
      type: Boolean
    },
    progress: {
      type: Number,
      default: 0,
      validator (value) {
        return value >= 0 && value <= 100
      }
    },
    buffer: {
      type: Number,
      default: 100,
      validator (value) {
        return value >= 0 && value <= 100
      }
    }
  },
  computed: {
    progresswidth () {
      if (this.indeterminate) {
        return '0%'
      }
      return this.progress + '%'
    },
    bufferwidth () {
      if (this.indeterminate) {
        return '100%'
      }
      return this.progress + '%'
    },
    auxwidth () {
      return (100 - this.buffer) + '%'
    }
  },
  ready () {
    if (this.indeterminate) {
      return
    }
  }
})
