<template>
  <div
    v-show="show"
    v-el:container
    transition="menu"
    class="mdl-menu__container is-upgraded"
    :class="{'is-visible': visible}"
    :style="{width: width + 'px', height: height + 'px', left: left, right: right, bottom: bottom, top: top}">
    <div
      v-el:outline
      class="mdl-menu__outline"
      :class="{'mdl-menu--bottom-left': bottomLeft, 'mdl-menu--bottom-right': bottomRight, 'mdl-menu--top-right': topRight, 'mdl-menu--top-left': topLeft, 'mdl-menu--unaligned': unaligned}"
      :style="{width: width + 'px', height: height + 'px'}">
    </div>
    <ul
      v-el:element
      class="mdl-menu mdl-js-menu"
      tabindex="-1"
      v-on:keydown="handleForKeyboardEvent_"
      :class="{'mdl-js-ripple-effect': ripple, 'mdl-js-ripple-effect--ignore-events': ripple, 'mdl-menu--bottom-left': bottomLeft, 'mdl-menu--bottom-right': bottomRight, 'mdl-menu--top-right': topRight, 'mdl-menu--top-left': topLeft, 'mdl-menu--unaligned': unaligned, 'is-animating': animating}"
      :style="{clip: clip}">

      <md-menu-item v-for="item in menu"
        v-ref:items
        tabindex="-1"
        :ripple.once="ripple"
        v-on:keydown="handleItemKeyboardEvent_"
        v-on:click="handleItemClick_">

        <partial :name="itemPartial"></partial>
      </md-menu-item>
    </ul>
  </div>
</template>

<script>
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
      beforeEnter () {
        this.adjustPosition_()
      },
      enter (el, done) {
        let removeAnimationEndListener = (evt) => {
          this.$el.removeEventListener('transitionend', removeAnimationEndListener)
          this.$el.removeEventListener('webkitTransitionEnd', removeAnimationEndListener)
          this.animating = false
          this.$els.element.focus()
          done()
        }

        this.$el.addEventListener('transitionend', removeAnimationEndListener)
        this.$el.addEventListener('webkitTransitionEnd', removeAnimationEndListener)

        this.adjustSize_()
        this.applyItemDelay_()

        this.animating = true
        this.$els.outline.style.transform = ''
        this.clip = 'rect(0 ' + this.width + 'px ' + this.height + 'px 0)'
        this.visible = true
      },
      enterCancelled (el) {

      },
      beforeLeave () {
        this.removeItemDelay_()
        this.adjustSize_()
      },
      leave (el, done) {
        this.animating = true
        this.$els.outline.style.transform = 'scale(0)'
        this.applyClip_()

        let removeAnimationEndListener = (evt) => {
          this.$el.removeEventListener('transitionend', removeAnimationEndListener)
          this.$el.removeEventListener('webkitTransitionEnd', removeAnimationEndListener)
          this.animating = false
          this.visible = false
          done()
        }

        this.$el.addEventListener('transitionend', removeAnimationEndListener)
        this.$el.addEventListener('webkitTransitionEnd', removeAnimationEndListener)
      },
      leaveCancelled (el) {

      }
    }
  },

  props: {
    ripple: Boolean,
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
      visible: false,
      animating: false,
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

        if (items && items.length > 0 && this.visible) {
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

        if (items && items.length > 0 && this.visible) {
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
          this.show = false
          this.closing_ = false
        }.bind(this), /** @type {number} */ (constants.CLOSE_TIMEOUT))
      }
    },

    adjustPosition_ () {
      if (this.$els.element && this.forElement_) {
        let rect = this.forElement_.getBoundingClientRect()
        let forRect = this.forElement_.parentElement.getBoundingClientRect()

        if (this.unaligned) {
          // Do not position the menu automatically. Requires the developer to
          // manually specify position.
        } else if (this.bottomRight) {
          this.left = null
          this.right = (forRect.right - rect.right) + 'px'
          this.top = this.forElement_.offsetTop + this.forElement_.offsetHeight + 'px'
          this.bottom = null
        } else if (this.topLeft) {
          this.left = this.forElement_.offsetLeft + 'px'
          this.right = null
          this.top = null
          this.bottom = (forRect.bottom - rect.top) + 'px'
        } else if (this.topRight) {
          this.left = null
          this.right = (forRect.right - rect.right) + 'px'
          this.top = null
          this.bottom = (forRect.bottom - rect.top) + 'px'
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

    /**
     * Displays the menu.
     *
     * @public
     */
    show (evt) {
      // let height = this.$els.element.getBoundingClientRect().height
      // let width = this.$els.element.getBoundingClientRect().width
      //
      // // Apply the inner element's size to the container and outline.
      // this.width = width + 'px'
      // this.height = height + 'px'

      // let transitionDuration = constants.TRANSITION_DURATION_SECONDS *
      //     constants.TRANSITION_DURATION_FRACTION
      //
      // // Calculate transition delays for individual menu items, so that they fade
      // // in one at a time.
      // let items = this.$refs.items
      // for (let i = 0; i < items.length; i++) {
      //   let itemDelay = null
      //   if (this.topLeft || this.topRight) {
      //     itemDelay = ((height - items[i].$el.offsetTop - items[i].$el.offsetHeight) /
      //         height * transitionDuration) + 's'
      //   } else {
      //     itemDelay = (items[i].$el.offsetTop / height * transitionDuration) + 's'
      //   }
      //   items[i].$el.style.transitionDelay = itemDelay
      // }

      // // Apply the initial clip to the text before we start animating.
      // this.applyClip_(height, width)
      //
      // // Wait for the next frame, turn on animation, and apply the final clip.
      // // Also make it visible. This triggers the transitions.
      // window.requestAnimationFrame(() => {
      //   this.animating = true
      //   this.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)'
      //   this.visible = true
      // })

      // // Clean up after the animation is complete.
      // this.addAnimationEndListener_()

      // Add a click listener to the document, to close the menu.
      let callback = (e) => {
        // Check to see if the document is processing the same event that
        // displayed the menu in the first place. If so, do nothing.
        // Also check to see if the menu is in the process of closing itself, and
        // do nothing in that case.
        // Also check if the clicked element is a menu item
        // if so, do nothing.
        if (e !== evt && !this.closing_ && e.target.parentNode !== this.$els.element) {
          document.removeEventListener('click', callback)
          this.hide()
        }
      }
      document.addEventListener('click', callback)
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
