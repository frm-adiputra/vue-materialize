import Vue from 'vue'
import componentHandler from 'componentHandler'

Vue.component('md-progress', {
  template: `<div class="mdl-progress mdl-js-progress" :class='{ "mdl-progress__indeterminate": indeterminate }'></div>`,
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
      default: 0,
      validator (value) {
        return value >= 0 && value <= 100
      }
    }
  },
  watch: {
    progress: function (val, oldVal) {
      if (this.indeterminate) {
        return
      }
      this.$el.MaterialProgress.setProgress(val)
    },
    buffer: function (val, oldVal) {
      if (this.indeterminate) {
        return
      }
      this.$el.MaterialProgress.setBuffer(val)
    }
  },
  ready () {
    componentHandler.upgradeElement(this.$el)

    if (this.indeterminate) {
      return
    }

    this.$el.MaterialProgress.setProgress(this.progress)
    this.$el.MaterialProgress.setBuffer(this.buffer)
  }
})
