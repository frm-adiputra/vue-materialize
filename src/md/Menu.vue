<template>
  <partial :name="menuPartial"></partial>
</template>

<script>
import './MenuPartials'
import MdMenuItem from './MenuItem'

let constants = {
  // Total duration of the menu animation.
  TRANSITION_DURATION_SECONDS: 0.3,
  // The fraction of the total duration we want to use for menu item animations.
  TRANSITION_DURATION_FRACTION: 0.8,
  // How long the menu stays open after choosing an option (so the user can see
  // the ripple).
  CLOSE_TIMEOUT: 150
}

let cssClasses = {
  ITEM: 'mdl-menu__item'
}

let keycodes = {
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  UP_ARROW: 38,
  DOWN_ARROW: 40
}

export default {
  components: {
    MdMenuItem
  },

  transitions: {
    'menu': {
      css: false,
      beforeEnter () {
        this.adjustPosition_()
      },
      enter (el, done) {
        let removeAnimationEndListener = (evt) => {
          this.$els.outline.removeEventListener('transitionend', removeAnimationEndListener)
          this.$els.outline.removeEventListener('webkitTransitionEnd', removeAnimationEndListener)

          this.$els.container.classList.remove('is-animating')
          this.$els.element.classList.remove('is-animating')

          this.$els.element.focus()
          done()
        }

        this.$els.outline.addEventListener('transitionend', removeAnimationEndListener)
        this.$els.outline.addEventListener('webkitTransitionEnd', removeAnimationEndListener)

        this.adjustSize_()
        this.applyItemDelay_()

        this.$els.container.classList.add('is-animating')
        this.$els.element.classList.add('is-animating')

        this.clip = 'rect(0 ' + this.width + 'px ' + this.height + 'px 0)'

        this.$els.container.classList.add('is-visible')
      },
      enterCancelled (el) {

      },
      afterEnter (el) {
        this.addExternalClickHandler_()
      },
      beforeLeave () {
        this.removeItemDelay_()
        this.adjustSize_()
      },
      leave (el, done) {
        this.$els.container.classList.remove('is-visible')

        this.$els.container.classList.add('is-animating')
        this.$els.element.classList.add('is-animating')

        this.applyClip_()

        let removeAnimationEndListener = (evt) => {
          this.$els.outline.removeEventListener('transitionend', removeAnimationEndListener)
          this.$els.outline.removeEventListener('webkitTransitionEnd', removeAnimationEndListener)

          this.$els.container.classList.remove('is-animating')
          this.$els.element.classList.remove('is-animating')

          done()
        }

        this.$els.outline.addEventListener('transitionend', removeAnimationEndListener)
        this.$els.outline.addEventListener('webkitTransitionEnd', removeAnimationEndListener)
      },
      leaveCancelled (el) {

      },
      afterLeave (el) {
        this.removeExternalClickHandler_()
      }
    }
  },

  props: {
    ripple: Boolean,
    // if set to true, menu will use v-if instead of v-show
    useIf: Boolean,
    menu: {
      type: Array
    },
    show: {
      type: Boolean,
      twoWay: true,
      required: true
    },
    itemPartial: String,
    pos: String,
    for: String
  },

  data () {
    return {
      width: null,
      height: null,
      left: null,
      right: null,
      top: null,
      bottom: null,
      clip: null
    }
  },

  computed: {
    menuPartial () {
      if (this.useIf) {
        return 'menu-if'
      }
      return 'menu-show'
    },
    unaligned () {
      return this.pos === 'unaligned'
    },
    bottomLeft () {
      return (!this.pos || this.pos === 'bottom-left')
    },
    bottomRight () {
      return this.pos === 'bottom-right'
    },
    topLeft () {
      return this.pos === 'top-left'
    },
    topRight () {
      return this.pos === 'top-right'
    }
  },

  methods: {
    /**
     * Handles a keyboard event on the "for" element.
     *
     * @param {Event} evt The event that fired.
     * @private
     */
    handleForKeyboardEvent_ (evt) {
      if (this.$els.element && this.$els.container && this.forElement_) {
        let items = this.$els.element.querySelectorAll('.' + cssClasses.ITEM + ':not([disabled])')

        if (items && items.length > 0 && this.show) {
          if (evt.keyCode === keycodes.UP_ARROW) {
            evt.preventDefault()
            items[items.length - 1].focus()
          } else if (evt.keyCode === keycodes.DOWN_ARROW) {
            evt.preventDefault()
            items[0].focus()
          } else if (evt.keyCode === keycodes.ESCAPE) {
            evt.preventDefault()
            this.show = false
          }
        }
      }
    },

    /**
     * Handles a keyboard event on an item.
     *
     * @param {Event} evt The event that fired.
     * @private
     */
    handleItemKeyboardEvent_ (evt) {
      if (this.$els.element && this.$els.container) {
        let items = this.$els.element.querySelectorAll('.' + cssClasses.ITEM +
          ':not([disabled])')

        if (items && items.length > 0 && this.show) {
          let currentIndex = Array.prototype.slice.call(items).indexOf(evt.target)

          if (evt.keyCode === keycodes.UP_ARROW) {
            evt.preventDefault()
            evt.stopPropagation()

            if (currentIndex > 0) {
              items[currentIndex - 1].focus()
            } else {
              items[items.length - 1].focus()
            }
          } else if (evt.keyCode === keycodes.DOWN_ARROW) {
            evt.preventDefault()
            evt.stopPropagation()

            if (items.length > currentIndex + 1) {
              items[currentIndex + 1].focus()
            } else {
              items[0].focus()
            }
          } else if (evt.keyCode === keycodes.SPACE ||
                evt.keyCode === keycodes.ENTER) {
            evt.preventDefault()
            evt.stopPropagation()

            // Send mousedown and mouseup to trigger ripple.
            let e = new MouseEvent('mousedown')
            evt.target.dispatchEvent(e)
            e = new MouseEvent('mouseup')
            evt.target.dispatchEvent(e)
            // Send click.
            evt.target.click()
          } else if (evt.keyCode === keycodes.ESCAPE) {
            evt.preventDefault()
            evt.stopPropagation()
            this.show = false
          }
        }
      }
    },

    /**
     * Handles a click event on an item.
     *
     * @param {Event} evt The event that fired.
     * @private
     */
    handleItemClick_ (evt) {
      if (evt.target.hasAttribute('disabled')) {
        evt.stopPropagation()
      } else {
        // Wait some time before closing menu, so the user can see the ripple.
        this.closing_ = true
        window.setTimeout(function (evt) {
          this.closing_ = false
          this.show = false
        }.bind(this), /** @type {number} */ (constants.CLOSE_TIMEOUT))
      }
    },

    adjustPosition_ () {
      if (this.$els.element && this.forElement_) {

        if (this.unaligned) {
          // Do not position the menu automatically. Requires the developer to
          // manually specify position.
        } else if (this.bottomRight) {
          this.left = null
          this.right = (this.forElement_.offsetParent.offsetWidth - this.forElement_.offsetLeft - this.forElement_.offsetWidth) + 'px'
          this.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px'
          this.bottom = null
        } else if (this.topLeft) {
          this.left = this.forElement_.offsetLeft + 'px'
          this.right = null
          this.top = null
          this.bottom = (this.forElement_.offsetParent.offsetHeight - this.forElement_.offsetTop) + 'px'
        } else if (this.topRight) {
          this.left = null
          this.right = (this.forElement_.offsetParent.offsetWidth - this.forElement_.offsetLeft - this.forElement_.offsetWidth) + 'px'
          this.top = null
          this.bottom = (this.forElement_.offsetParent.offsetHeight - this.forElement_.offsetTop) + 'px'
        } else { // this.bottomLeft
          this.left = this.forElement_.offsetLeft + 'px'
          this.right = null
          this.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px'
          this.bottom = null
        }
      }
    },

    adjustSize_ () {
      let rect = this.$els.element.getBoundingClientRect()
      this.height = rect.height
      this.width = rect.width
    },

    applyItemDelay_ () {
      let transitionDuration = constants.TRANSITION_DURATION_SECONDS *
          constants.TRANSITION_DURATION_FRACTION

      // Calculate transition delays for individual menu items, so that they fade
      // in one at a time.
      let items = this.$refs.items
      for (let i = 0; i < items.length; i++) {
        let itemDelay = null
        if (this.topLeft || this.topRight) {
          itemDelay = ((this.height - items[i].$el.offsetTop - items[i].$el.offsetHeight) /
              this.height * transitionDuration) + 's'
        } else {
          itemDelay = (items[i].$el.offsetTop / this.height * transitionDuration) + 's'
        }
        items[i].$el.style.transitionDelay = itemDelay
      }
    },

    removeItemDelay_ () {
      // Remove all transition delays; menu items fade out concurrently.
      let items = this.$refs.items
      for (let i = 0; i < items.length; i++) {
        items[i].$el.style.removeProperty('transition-delay')
      }
    },

    /**
     * Calculates the initial clip (for opening the menu) or final clip (for closing
     * it), and applies it. This allows us to animate from or to the correct point,
     * that is, the point it's aligned to in the "for" element.
     *
     * @private
     */
    applyClip_ () {
      if (this.unaligned) {
        // Do not clip.
        this.clip = ''
      } else if (this.bottomRight) {
        // Clip to the top right corner of the menu.
        this.clip =
            'rect(0 ' + this.width + 'px ' + '0 ' + this.width + 'px)'
      } else if (this.topLeft) {
        // Clip to the bottom left corner of the menu.
        this.clip =
            'rect(' + this.height + 'px 0 ' + this.height + 'px 0)'
      } else if (this.topRight) {
        // Clip to the bottom right corner of the menu.
        this.clip = 'rect(' + this.height + 'px ' + this.width + 'px ' +
            this.height + 'px ' + this.width + 'px)'
      } else { // this.bottomLeft
        // Default: do not clip (same as clipping to the top left corner).
        this.clip = ''
      }
    },

    addExternalClickHandler_ () {
      document.addEventListener('click', this.externalClickHandler_)
    },

    removeExternalClickHandler_ () {
      document.removeEventListener('click', this.externalClickHandler_)
    },

    /**
     * Click listener to the document, to close the menu.
     *
     * @public
     */
    externalClickHandler_ (e) {
      // Check to see if the document is processing the same event that
      // displayed the menu in the first place. If so, do nothing.
      // Also check to see if the menu is in the process of closing itself, and
      // do nothing in that case.
      // Also check if the clicked element is a menu item
      // if so, do nothing.
      if (!this.closing_) {
        this.show = false
      }
    }
  },

  ready () {
    // Find the "for" element and bind events to it
    if (this.for) {
      let forEl = document.getElementById(this.for)
      if (forEl) {
        this.forElement_ = forEl
      }
    }
  }
}
</script>

<style>
.mdl-menu:focus {
  outline: none;
}
</style>
