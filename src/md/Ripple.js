import Vue from 'vue'

let constant = {
  INITIAL_SCALE: 'scale(0.0001, 0.0001)',
  INITIAL_SIZE: '1px',
  INITIAL_OPACITY: '0.4',
  FINAL_OPACITY: '0',
  FINAL_SCALE: ''
}

let cssClasses = {
  RIPPLE_PARENT: 'mdl-js-ripple-effect',
  RIPPLE_CENTER: 'mdl-ripple--center',
  RIPPLE_EFFECT_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
  RIPPLE: 'mdl-ripple',
  IS_ANIMATING: 'is-animating',
  IS_VISIBLE: 'is-visible'
}

let getClosestParentWithClass = function (elem, className) {
  // Get closest match
  for (elem = elem.parentNode; elem && elem !== document; elem = elem.parentNode) {
    if (elem.classList.contains(className)) {
      return elem
    }
  }

  return false
}

class RippleAnimation {
  constructor (el, parentEl, recentering) {
    this.el = el
    this.parentEl = parentEl
    this.frameCount = 0
    this.rippleSize = 0
    this.x = 0
    this.y = 0
    this.ignoringMouseDown = false
    this.recentering = recentering
  }
  setXY (x, y) {
    this.x = x
    this.y = y
  }
  setStyles (start) {
    let transformString
    let scale
    let offset = 'translate(' + this.x + 'px, ' + this.y + 'px)'

    if (start) {
      scale = constant.INITIAL_SCALE
    } else {
      scale = constant.FINAL_SCALE
      if (this.recentering) {
        offset = 'translate(' + this.boundWidth / 2 + 'px, ' +
          this.boundHeight / 2 + 'px)'
      }
    }

    transformString = 'translate(-50%, -50%) ' + offset + scale

    this.el.style.webkitTransform = transformString
    this.el.style.msTransform = transformString
    this.el.style.transform = transformString

    if (start) {
      this.el.classList.remove(cssClasses.IS_ANIMATING)
    } else {
      this.el.classList.add(cssClasses.IS_ANIMATING)
    }
  }
  animFrameHandler () {
    if (this.frameCount-- > 0) {
      window.requestAnimationFrame(this.animFrameHandler.bind(this))
    } else {
      this.setStyles(false)
    }
  }
  downHandler (event) {
    this.el.style.color = 'red'
    // return
    if (!this.el.style.width && !this.el.style.height) {
      let rect = this.parentEl.getBoundingClientRect()
      this.boundHeight = rect.height
      this.boundWidth = rect.width
      this.rippleSize = Math.sqrt(rect.width * rect.width +
          rect.height * rect.height) * 2 + 2
      this.el.style.width = this.rippleSize + 'px'
      this.el.style.height = this.rippleSize + 'px'
      this.el.style.color = 'red'
    }

    this.el.classList.add(cssClasses.IS_VISIBLE)

    if (event.type === 'mousedown' && this.ignoringMouseDown) {
      this.ignoringMouseDown = false
    } else {
      if (event.type === 'touchstart') {
        this.ignoringMouseDown = true
      }
      let frameCount = this.frameCount
      if (frameCount > 0) {
        return
      }
      this.frameCount = 1
      let bound = event.currentTarget.getBoundingClientRect()
      let x
      let y
      // Check if we are handling a keyboard click.
      if (event.clientX === 0 && event.clientY === 0) {
        x = Math.round(bound.width / 2)
        y = Math.round(bound.height / 2)
      } else {
        let clientX = event.clientX ? event.clientX : event.touches[0].clientX
        let clientY = event.clientY ? event.clientY : event.touches[0].clientY
        x = Math.round(clientX - bound.left)
        y = Math.round(clientY - bound.top)
      }
      this.setXY(x, y)
      this.setStyles(true)
      window.requestAnimationFrame(this.animFrameHandler.bind(this))
    }
  }
  upHandler (event) {
    // Don't fire for the artificial "mouseup" generated by a double-click.
    if (event && event.detail !== 2) {
      // Allow a repaint to occur before removing this class, so the animation
      // shows for tap events, which seem to trigger a mouseup too soon after
      // mousedown.
      window.setTimeout(() => {
        this.el.classList.remove(cssClasses.IS_VISIBLE)
      }, 0)
    }
  }
}

Vue.component('md-ripple', {
  template: `<span
    class="mdl-checkbox__ripple-container mdl-js-ripple-effect mdl-ripple--center">
    <span v-el:ripple class="mdl-ripple"></span>
  </span>`,
  created () {
    this.anim_ = null
  },
  ready () {
    let rippleParent = getClosestParentWithClass(this.$el, cssClasses.RIPPLE_PARENT)
    if (!rippleParent) {
      console.log('Please add class' + cssClasses.RIPPLE_PARENT + ' to the parent element of ripple')
      return
    }

    this.anim_ = new RippleAnimation(
      this.$els.ripple,
      rippleParent,
      rippleParent.classList.contains(cssClasses.RIPPLE_CENTER)
    )

    if (!rippleParent.classList.contains(cssClasses.RIPPLE_EFFECT_IGNORE_EVENTS)) {
      let boundDownHandler = this.anim_.downHandler.bind(this.anim_)
      rippleParent.addEventListener('mousedown', boundDownHandler)
      rippleParent.addEventListener('touchstart', boundDownHandler)

      let boundUpHandler = this.anim_.upHandler.bind(this.anim_)
      rippleParent.addEventListener('mouseup', boundUpHandler)
      rippleParent.addEventListener('mouseleave', boundUpHandler)
      rippleParent.addEventListener('touchend', boundUpHandler)
      rippleParent.addEventListener('blur', boundUpHandler)
    }
  }
})