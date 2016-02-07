<template>
  <div
    v-el:container
    class="mdl-menu__container is-upgraded"
    :class="{'is-visible': visible}"
    :style="{width: width, height: height, left: left, right: right, bottom: bottom, top: top}">
    <div
      v-el:outline
      class="mdl-menu__outline"
      :class="{'mdl-menu--bottom-left': bottomLeft, 'mdl-menu--bottom-right': bottomRight, 'mdl-menu--top-right': topRight, 'mdl-menu--top-left': topLeft, 'mdl-menu--unaligned': unaligned}"
      :style="{width: width, height: height}">
    </div>
    <ul
      v-el:element
      class="mdl-menu mdl-js-menu"
      :class="{'mdl-js-ripple-effect': ripple, 'mdl-js-ripple-effect--ignore-events': ripple, 'mdl-menu--bottom-left': bottomLeft, 'mdl-menu--bottom-right': bottomRight, 'mdl-menu--top-right': topRight, 'mdl-menu--top-left': topLeft, 'mdl-menu--unaligned': unaligned, 'is-animating': animating}"
      :style="{clip: clip}">

      <md-menu-item v-for="item in menu"
        v-ref:items
        tabindex="-1"
        :ripple.once="ripple"
        v-on:keydown="handleItemKeyboardEvent"
        v-on:click="handleItemClick">

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
  CONTAINER: 'mdl-menu__container',
  OUTLINE: 'mdl-menu__outline',
  ITEM: 'mdl-menu__item',
  ITEM_RIPPLE_CONTAINER: 'mdl-menu__item-ripple-container',
  RIPPLE_EFFECT: 'mdl-js-ripple-effect',
  RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
  RIPPLE: 'mdl-ripple',
  // Statuses
  IS_UPGRADED: 'is-upgraded',
  IS_VISIBLE: 'is-visible',
  IS_ANIMATING: 'is-animating',
  // Alignment options
  BOTTOM_LEFT: 'mdl-menu--bottom-left',  // This is the default.
  BOTTOM_RIGHT: 'mdl-menu--bottom-right',
  TOP_LEFT: 'mdl-menu--top-left',
  TOP_RIGHT: 'mdl-menu--top-right',
  UNALIGNED: 'mdl-menu--unaligned'
}

export default {
  components: {
    MdMenuItem
  },

  props: {
    ripple: Boolean,
    menu: {
      type: Array
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
     * Handles a click on the "for" element, by positioning the menu and then
     * toggling it.
     *
     * @param {Event} evt The event that fired.
     * @private
     */
    handleForClick_ (evt) {
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

      this.toggle(evt)
    },

    /**
     * Handles a keyboard event on the "for" element.
     *
     * @param {Event} evt The event that fired.
     * @private
     */
    handleForKeyboardEvent_ (evt) {
      if (this.$els.element && this.$els.container && this.forElement_) {
        let items = this.$els.element.querySelectorAll('.' + cssClasses.ITEM + ':not([disabled])')

        if (items && items.length > 0 &&
            this.$els.container.classList.contains(cssClasses.IS_VISIBLE)) {
          if (evt.keyCode === this.Keycodes_.UP_ARROW) {
            evt.preventDefault()
            items[items.length - 1].focus()
          } else if (evt.keyCode === this.Keycodes_.DOWN_ARROW) {
            evt.preventDefault()
            items[0].focus()
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
    handleItemKeyboardEvent (evt) {
      if (this.$els.element && this.$els.container) {
        let items = this.$els.element.querySelectorAll('.' + cssClasses.ITEM +
          ':not([disabled])')

        if (items && items.length > 0 &&
            this.$els.container.classList.contains(cssClasses.IS_VISIBLE)) {
          let currentIndex = Array.prototype.slice.call(items).indexOf(evt.target)

          if (evt.keyCode === this.Keycodes_.UP_ARROW) {
            evt.preventDefault()
            if (currentIndex > 0) {
              items[currentIndex - 1].focus()
            } else {
              items[items.length - 1].focus()
            }
          } else if (evt.keyCode === this.Keycodes_.DOWN_ARROW) {
            evt.preventDefault()
            if (items.length > currentIndex + 1) {
              items[currentIndex + 1].focus()
            } else {
              items[0].focus()
            }
          } else if (evt.keyCode === this.Keycodes_.SPACE ||
                evt.keyCode === this.Keycodes_.ENTER) {
            evt.preventDefault()
            // Send mousedown and mouseup to trigger ripple.
            let e = new MouseEvent('mousedown')
            evt.target.dispatchEvent(e)
            e = new MouseEvent('mouseup')
            evt.target.dispatchEvent(e)
            // Send click.
            evt.target.click()
          } else if (evt.keyCode === this.Keycodes_.ESCAPE) {
            evt.preventDefault()
            this.hide()
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
    handleItemClick (evt) {
      if (evt.target.hasAttribute('disabled')) {
        evt.stopPropagation()
      } else {
        // Wait some time before closing menu, so the user can see the ripple.
        this.closing_ = true
        window.setTimeout(function (evt) {
          this.hide()
          this.closing_ = false
        }.bind(this), /** @type {number} */ (constants.CLOSE_TIMEOUT))
      }
    },

    /**
     * Calculates the initial clip (for opening the menu) or final clip (for closing
     * it), and applies it. This allows us to animate from or to the correct point,
     * that is, the point it's aligned to in the "for" element.
     *
     * @param {number} height Height of the clip rectangle
     * @param {number} width Width of the clip rectangle
     * @private
     */
    applyClip_ (height, width) {
      if (this.unaligned) {
        // Do not clip.
        this.clip = ''
      } else if (this.bottomRight) {
        // Clip to the top right corner of the menu.
        this.clip =
            'rect(0 ' + width + 'px ' + '0 ' + width + 'px)'
      } else if (this.topLeft) {
        // Clip to the bottom left corner of the menu.
        this.clip =
            'rect(' + height + 'px 0 ' + height + 'px 0)'
      } else if (this.topRight) {
        // Clip to the bottom right corner of the menu.
        this.clip = 'rect(' + height + 'px ' + width + 'px ' +
            height + 'px ' + width + 'px)'
      } else { // this.bottomLeft
        // Default: do not clip (same as clipping to the top left corner).
        this.clip = ''
      }
    },

    /**
     * Cleanup function to remove animation listeners.
     *
     * @param {Event} evt
     * @private
     */

    removeAnimationEndListener_ (evt) {
      this.animating = false
      // evt.target.classList.remove(cssClasses.IS_ANIMATING)
    },

    /**
     * Adds an event listener to clean up after the animation ends.
     *
     * @private
     */
    addAnimationEndListener_ () {
      this.$els.element.addEventListener('transitionend', this.removeAnimationEndListener_)
      this.$els.element.addEventListener('webkitTransitionEnd', this.removeAnimationEndListener_)
    },

    /**
     * Displays the menu.
     *
     * @public
     */
    show (evt) {
      console.log('show')
      let height = this.$els.element.getBoundingClientRect().height
      let width = this.$els.element.getBoundingClientRect().width

      // Apply the inner element's size to the container and outline.
      this.width = width + 'px'
      this.height = height + 'px'

      let transitionDuration = constants.TRANSITION_DURATION_SECONDS *
          constants.TRANSITION_DURATION_FRACTION

      // Calculate transition delays for individual menu items, so that they fade
      // in one at a time.
      let items = this.$refs.items
      for (let i = 0; i < items.length; i++) {
        let itemDelay = null
        if (this.topLeft || this.topRight) {
          itemDelay = ((height - items[i].$el.offsetTop - items[i].$el.offsetHeight) /
              height * transitionDuration) + 's'
        } else {
          itemDelay = (items[i].$el.offsetTop / height * transitionDuration) + 's'
        }
        items[i].$el.style.transitionDelay = itemDelay
      }

      // Apply the initial clip to the text before we start animating.
      this.applyClip_(height, width)

      // Wait for the next frame, turn on animation, and apply the final clip.
      // Also make it visible. This triggers the transitions.
      window.requestAnimationFrame(() => {
        this.animating = true
        this.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)'
        this.visible = true
      })

      // Clean up after the animation is complete.
      this.addAnimationEndListener_()

      // Add a click listener to the document, to close the menu.
      let callback = (e) => {
        // Check to see if the document is processing the same event that
        // displayed the menu in the first place. If so, do nothing.
        // Also check to see if the menu is in the process of closing itself, and
        // do nothing in that case.
        // Also check if the clicked element is a menu item
        // if so, do nothing.
        if (e !== evt && !this.closing_ && e.target.parentNode !== this.$els.element) {
          console.log('from document')
          document.removeEventListener('click', callback)
          this.hide()
        }
      }
      document.addEventListener('click', callback)
    },

    /**
     * Hides the menu.
     *
     * @public
     */
    hide () {
      console.log('hide')
      if (this.$els.element && this.$els.container && this.$els.outline) {
        let items = this.$els.element.querySelectorAll('.' + cssClasses.ITEM)

        // Remove all transition delays; menu items fade out concurrently.
        for (let i = 0; i < items.length; i++) {
          items[i].style.removeProperty('transition-delay')
        }

        // Measure the inner element.
        let rect = this.$els.element.getBoundingClientRect()
        let height = rect.height
        let width = rect.width

        // Turn on animation, and apply the final clip. Also make invisible.
        // This triggers the transitions.
        // this.$els.element.classList.add(cssClasses.IS_ANIMATING)
        this.animating = true
        this.applyClip_(height, width)
        this.visible = false
        // this.$els.container.classList.remove(cssClasses.IS_VISIBLE)

        // Clean up after the animation is complete.
        this.addAnimationEndListener_()
      }
    },

    /**
     * Displays or hides the menu, depending on current state.
     *
     * @public
     */
    toggle (evt) {
      if (!this.visible) {
        this.show(evt)
      } else {
        this.hide()
      }
    }
  },

  ready () {
    // Find the "for" element and bind events to it
    if (this.for) {
      let forEl = document.getElementById(this.for)
      if (forEl) {
        this.forElement_ = forEl
        forEl.addEventListener('click', this.handleForClick_)
        forEl.addEventListener('keydown', this.handleForKeyboardEvent_)
      }
    }

  }
}
</script>
