import Vue from 'vue'
// import componentHandler from 'componentHandler'

let EL_CLASS = 'mdl-button'
let EL_JS_CLASS = 'mdl-js-button'
let ICON_CLASS = 'mdl-button--icon'
let ACCENT_CLASS = 'mdl-button--accent'
let PRIMARY_CLASS = 'mdl-button--primary'
let MINI_FAB_CLASS = 'mdl-button--mini-fab'
let FAB_CLASS = 'mdl-button--fab'
let RAISED_CLASS = 'mdl-button--raised'
let COLORED_CLASS = 'mdl-button--colored'
let RIPPLE_CLASS = 'mdl-js-ripple-effect'

Vue.directive('md-button', {
  params: [
    'icon',
    'accent',
    'primary',
    'mini-fab',
    'fab',
    'raised',
    'colored',
    'ripple'
  ],
  bind () {
    this.el.classList.add(EL_CLASS)
    this.el.classList.add(EL_JS_CLASS)

    if (this.params.icon) {
      this.el.classList.add(ICON_CLASS)
    } else {
      this.el.classList.remove(ICON_CLASS)
    }

    if (this.params.accent) {
      this.el.classList.add(ACCENT_CLASS)
    } else {
      this.el.classList.remove(ACCENT_CLASS)
    }

    if (this.params.primary) {
      this.el.classList.add(PRIMARY_CLASS)
    } else {
      this.el.classList.remove(PRIMARY_CLASS)
    }

    if (this.params.miniFab) {
      this.el.classList.add(MINI_FAB_CLASS)
      this.el.classList.add(FAB_CLASS)
    } else {
      this.el.classList.remove(MINI_FAB_CLASS)
      this.el.classList.remove(FAB_CLASS)
    }

    if (this.params.fab) {
      this.el.classList.add(FAB_CLASS)
    } else {
      this.el.classList.remove(FAB_CLASS)
    }

    if (this.params.raised) {
      this.el.classList.add(RAISED_CLASS)
    } else {
      this.el.classList.remove(RAISED_CLASS)
    }

    if (this.params.colored) {
      this.el.classList.add(COLORED_CLASS)
    } else {
      this.el.classList.remove(COLORED_CLASS)
    }

    if (this.params.ripple) {
      this.el.classList.add(RIPPLE_CLASS)
    } else {
      this.el.classList.remove(RIPPLE_CLASS)
    }

    // componentHandler.upgradeElement(this.el)
  }
})
