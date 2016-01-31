import Vue from 'vue'

let BADGE_CLASS = 'mdl-badge'
let NO_BG_CLASS = 'mdl-badge--no-background'
let OVERLAP_CLASS = 'mdl-badge--overlap'

Vue.directive('md-badge', {
  params: ['no-background', 'overlap'],
  bind () {
  },
  update (value) {
    if (!value || value == null) {
      this.el.classList.remove(BADGE_CLASS)
      this.el.setAttribute('data-badge', null)
    } else {
      this.el.classList.add(BADGE_CLASS)
      this.el.setAttribute('data-badge', value)

      if (this.params.noBackground) {
        this.el.classList.add(NO_BG_CLASS)
      } else {
        this.el.classList.remove(NO_BG_CLASS)
      }

      if (this.params.overlap) {
        this.el.classList.add(OVERLAP_CLASS)
      } else {
        this.el.classList.remove(OVERLAP_CLASS)
      }
    }
  }
})
