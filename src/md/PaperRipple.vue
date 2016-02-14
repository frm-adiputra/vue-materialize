<template>
  <div class="paper-ripple"
    :class="{'paper-ripple--animating': animating}"
    @keydown.enter="_onEnterKeydown"
    @keydown.space="_onSpaceKeydown"
    @keyup.space="_onSpaceKeyup">

    <div v-el:background class="paper-ripple__background"></div>
    <div v-el:waves class="paper-ripple__waves">
      <paper-ripple-wave v-ref:ripples v-for="index in rippleCount"
        :center.once="center"
        :recenters.once="recenters"
        :initial-opacity.once="initialOpacity"
        :opacity-decay-velocity.once="opacityDecayVelocity">
      </paper-ripple-wave>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

let RIPPLE_MAX_RADIUS = 300

let Utility = {
  distance (x1, y1, x2, y2) {
    let xDelta = (x1 - x2)
    let yDelta = (y1 - y2)
    return Math.sqrt(xDelta * xDelta + yDelta * yDelta)
  },

  now: window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now
}

/**
 * @param {HTMLElement} element
 * @constructor
 */
function ElementMetrics (element) {
  this.element = element
  this.width = this.boundingRect.width
  this.height = this.boundingRect.height

  this.size = Math.max(this.width, this.height)
}

ElementMetrics.prototype = {
  get boundingRect () {
    return this.element.getBoundingClientRect()
  },

  furthestCornerDistanceFrom: function (x, y) {
    let topLeft = Utility.distance(x, y, 0, 0)
    let topRight = Utility.distance(x, y, this.width, 0)
    let bottomLeft = Utility.distance(x, y, 0, this.height)
    let bottomRight = Utility.distance(x, y, this.width, this.height)

    return Math.max(topLeft, topRight, bottomLeft, bottomRight)
  }
}

let PaperRippleWave = Vue.extend({
  template:
`<div v-el:wave-container class="wave__container">
  <div v-el:wave class="wave"></div>
</div>`,

  props: {
    center: {
      type: Boolean
    },
    recenters: {
      type: Boolean
    },
    initialOpacity: {
      type: Number
    },
    opacityDecayVelocity: {
      type: Number
    }
  },

  data () {
    return {
      maxRadius: 0,
      mouseDownStart: 0,
      mouseUpStart: 0,
      xStart: 0,
      yStart: 0,
      xEnd: 0,
      yEnd: 0,
      slideDistance: 0
    }
  },

  methods: {
    resetInteractionState: function () {
      this.maxRadius = 0
      this.mouseDownStart = 0
      this.mouseUpStart = 0

      this.xStart = 0
      this.yStart = 0
      this.xEnd = 0
      this.yEnd = 0
      this.slideDistance = 0

      this.containerMetrics = new ElementMetrics(this.$el)
    },

    draw: function () {
      let scale
      let dx
      let dy

      this.$els.wave.style.opacity = this.opacity

      scale = this.radius / (this.containerMetrics.size / 2)
      dx = this.xNow - (this.containerMetrics.width / 2)
      dy = this.yNow - (this.containerMetrics.height / 2)

      // 2d transform for safari because of border-radius and overflow:hidden clipping bug.
      // https://bugs.webkit.org/show_bug.cgi?id=98538
      this.$els.waveContainer.style.webkitTransform = 'translate(' + dx + 'px, ' + dy + 'px)'
      this.$els.waveContainer.style.transform = 'translate3d(' + dx + 'px, ' + dy + 'px, 0)'
      this.$els.wave.style.webkitTransform = 'scale(' + scale + ',' + scale + ')'
      this.$els.wave.style.transform = 'scale3d(' + scale + ',' + scale + ',1)'
    },

    /** @param {Event=} event */
    downAction: function (event) {
      let xCenter = this.containerMetrics.width / 2
      let yCenter = this.containerMetrics.height / 2

      this.resetInteractionState()
      this.mouseDownStart = Utility.now()

      if (this.center) {
        this.xStart = xCenter
        this.yStart = yCenter
        this.slideDistance = Utility.distance(
          this.xStart, this.yStart, this.xEnd, this.yEnd
        )
      } else {
        this.xStart = event
            ? (event.detail.x || event.clientX) - this.containerMetrics.boundingRect.left
            : this.containerMetrics.width / 2
        this.yStart = event
            ? (event.detail.y || event.clientY) - this.containerMetrics.boundingRect.top
            : this.containerMetrics.height / 2
      }

      if (this.recenters) {
        this.xEnd = xCenter
        this.yEnd = yCenter
        this.slideDistance = Utility.distance(
          this.xStart, this.yStart, this.xEnd, this.yEnd
        )
      }

      this.maxRadius = this.containerMetrics.furthestCornerDistanceFrom(
        this.xStart,
        this.yStart
      )

      this.$els.waveContainer.style.top =
        (this.containerMetrics.height - this.containerMetrics.size) / 2 + 'px'
      this.$els.waveContainer.style.left =
        (this.containerMetrics.width - this.containerMetrics.size) / 2 + 'px'

      this.$els.waveContainer.style.width = this.containerMetrics.size + 'px'
      this.$els.waveContainer.style.height = this.containerMetrics.size + 'px'
    },

    /** @param {Event=} event */
    upAction: function (event) {
      if (!this.isMouseDown) {
        return
      }

      this.mouseUpStart = Utility.now()
    }
  },

  created () {
    Object.defineProperty(this, 'mouseDownElapsed', { get: function () {
      let elapsed

      if (!this.mouseDownStart) {
        return 0
      }

      elapsed = Utility.now() - this.mouseDownStart

      if (this.mouseUpStart) {
        elapsed -= this.mouseUpElapsed
      }

      return elapsed
    }})

    Object.defineProperty(this, 'mouseUpElapsed', { get: function () {
      return this.mouseUpStart ? Utility.now() - this.mouseUpStart : 0
    }})

    Object.defineProperty(this, 'mouseDownElapsedSeconds', { get: function () {
      return this.mouseDownElapsed / 1000
    }})

    Object.defineProperty(this, 'mouseUpElapsedSeconds', { get: function () {
      return this.mouseUpElapsed / 1000
    }})

    Object.defineProperty(this, 'mouseInteractionSeconds', { get: function () {
      return this.mouseDownElapsedSeconds + this.mouseUpElapsedSeconds
    }})

    Object.defineProperty(this, 'radius', { get: function () {
      let width2 = this.containerMetrics.width * this.containerMetrics.width
      let height2 = this.containerMetrics.height * this.containerMetrics.height
      let waveRadius = Math.min(
        Math.sqrt(width2 + height2),
        RIPPLE_MAX_RADIUS
      ) * 1.1 + 5

      let duration = 1.1 - 0.2 * (waveRadius / RIPPLE_MAX_RADIUS)
      let timeNow = this.mouseInteractionSeconds / duration
      let size = waveRadius * (1 - Math.pow(80, -timeNow))

      return Math.abs(size)
    }})

    Object.defineProperty(this, 'opacity', { get: function () {
      if (!this.mouseUpStart) {
        return this.initialOpacity
      }

      return Math.max(
        0,
        this.initialOpacity - this.mouseUpElapsedSeconds * this.opacityDecayVelocity
      )
    }})

    Object.defineProperty(this, 'outerOpacity', { get: function () {
      // Linear increase in background opacity, capped at the opacity
      // of the wavefront (waveOpacity).
      let outerOpacity = this.mouseUpElapsedSeconds * 0.3
      let waveOpacity = this.opacity

      return Math.max(
        0,
        Math.min(outerOpacity, waveOpacity)
      )
    }})

    Object.defineProperty(this, 'isOpacityFullyDecayed', { get: function () {
      return this.opacity < 0.01 && this.radius >= Math.min(this.maxRadius, RIPPLE_MAX_RADIUS)
    }})

    Object.defineProperty(this, 'isRestingAtMaxRadius', { get: function () {
      return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, RIPPLE_MAX_RADIUS)
    }})

    Object.defineProperty(this, 'isAnimationComplete', { get: function () {
      return this.mouseUpStart ? this.isOpacityFullyDecayed : this.isRestingAtMaxRadius
    }})

    Object.defineProperty(this, 'translationFraction', { get: function () {
      return Math.min(
        1,
        this.radius / this.containerMetrics.size * 2 / Math.sqrt(2)
      )
    }})

    Object.defineProperty(this, 'xNow', { get: function () {
      if (this.xEnd) {
        return this.xStart + this.translationFraction * (this.xEnd - this.xStart)
      }

      return this.xStart
    }})

    Object.defineProperty(this, 'yNow', { get: function () {
      if (this.yEnd) {
        return this.yStart + this.translationFraction * (this.yEnd - this.yStart)
      }

      return this.yStart
    }})

    Object.defineProperty(this, 'isMouseDown', { get: function () {
      return this.mouseDownStart && !this.mouseUpStart
    }})
  },

  ready () {
    this.color = window.getComputedStyle(this.$el).color
    this.$els.wave.style.backgroundColor = this.color
    this.resetInteractionState()
  }
})

export default {
  components: {
    PaperRippleWave
  },

  props: {
    // If true, ripples will center inside its container.
    center: {
      type: Boolean
    },

    // If true, the ripple will remain in the "down" state until holdDown is
    // set to false again.
    holdDown: {
      type: Boolean
    },

    // The initial opacity set on the wave.
    initialOpacity: {
      type: Number,
      default: 0.25
    },

    // If true, the ripple will not generate a ripple effect via pointer
    // interaction. Calling ripple's imperative api like simulatedRipple will
    // still generate the ripple effect.
    noink: {
      type: Boolean
    },

    // How fast (opacity per second) the wave fades out.
    opacityDecayVelocity: {
      type: Number,
      default: 0.8
    },

    // If true, ripples will exhibit a gravitational pull towards the center of
    // their container as they fade away.
    recenters: {
      type: Boolean
    },

    // If true, this property will cause the implementing element to
    // automatically stop propagation on any handled KeyboardEvents.
    stopKeyboardEventPropagation: {
      type: Boolean
    }
  },

  data () {
    return {
      // True when there are visible ripples animating within the element.
      animating: false,

      // Number of visual ripples.
      rippleCount: 0,

      _animating: false
    }
  },

  computed: {
    backgroundColor () {
      let idx = this.$refs.ripples.length - 1
      if (idx === -1) {
        return null
      }

      let ripple = this.$refs.ripples[idx]
      return ripple.color
    }
  },

  methods: {
    simulatedRipple () {
      this.downAction(null)

      // Please see polymer/polymer#1305
      // this.async(function () {
      //   this.upAction()
      // }, 1)
      this.$nextTick(function () {
        this.upAction()
      })
    },

    /**
     * Provokes a ripple down effect via a UI event,
     * respecting the `noink` property.
     * @param {Event=} event
     */
    uiDownAction (event) {
      if (!this.noink) {
        this.downAction(event)
      }
    },

    /**
     * Provokes a ripple down effect via a UI event,
     * *not* respecting the `noink` property.
     * @param {Event=} event
     */
    downAction (event) {
      if (this.holdDown && this.$refs.ripples.length > 0) {
        return
      }

      this.addRipple()

      this.$nextTick(() => {
        let idx = this.$refs.ripples.length - 1
        let ripple = this.$refs.ripples[idx]
        ripple.downAction(event)

        if (!this._animating) {
          this.animate()
        }
      })
    },

    /**
     * Provokes a ripple up effect via a UI event,
     * respecting the `noink` property.
     * @param {Event=} event
     */
    uiUpAction (event) {
      if (!this.noink) {
        this.upAction(event)
      }
    },

    /**
     * Provokes a ripple up effect via a UI event,
     * *not* respecting the `noink` property.
     * @param {Event=} event
     */
    upAction (event) {
      if (this.holdDown) {
        return
      }

      this.$refs.ripples.forEach(function (ripple) {
        ripple.upAction(event)
      })

      this.animate()
    },

    onAnimationComplete () {
      this._animating = false
      this.$els.background.style.backgroundColor = null
      this.fire('transitionend')
    },

    addRipple () {
      // let ripple = new Ripple(this)

      // Polymer.dom(this.$.waves).appendChild(ripple.waveContainer)
      // this.$els.background.style.backgroundColor = ripple.color
      // this.$refs.ripples.push(ripple)
      this.rippleCount++

      this.animating = true

      // return ripple
    },

    removeRipple (ripple) {
      if (this.rippleCount === 0) {
        return
      }

      this.rippleCount--
      this.$nextTick(() => {
        if (this.rippleCount === 0) {
          this.animating = false
        }
      })

      // let rippleIndex = this.$refs.ripples.indexOf(ripple)
      //
      // if (rippleIndex < 0) {
      //   return
      // }
      //
      // this.$refs.ripples.splice(rippleIndex, 1)
      //
      // ripple.remove()
      //
      // if (!this.$refs.ripples.length) {
      //   this.animating = false
      // }
    },

    animate () {
      let index
      let ripple

      this._animating = true

      for (index = 0; index < this.$refs.ripples.length; ++index) {
        ripple = this.$refs.ripples[index]

        ripple.draw()

        this.$els.background.style.opacity = ripple.outerOpacity

        if (ripple.isOpacityFullyDecayed && !ripple.isRestingAtMaxRadius) {
          this.removeRipple(ripple)
        }
      }

      if (!this.shouldKeepAnimating && this.$refs.ripples.length === 0) {
        this.onAnimationComplete()
      } else {
        window.requestAnimationFrame(this.animate.bind(this))
      }
    },

    _onEnterKeydown () {
      this.uiDownAction()
      this.async(this.uiUpAction, 1)
    },

    _onSpaceKeydown () {
      this.uiDownAction()
    },

    _onSpaceKeyup () {
      this.uiUpAction()
    },

    // note: holdDown does not respect noink since it can be a focus based
    // effect.
    _holdDownChanged (newVal, oldVal) {
      if (oldVal === undefined) {
        return
      }
      if (newVal) {
        this.downAction()
      } else {
        this.upAction()
      }
    }
  },

  created () {
    this._animating = false

    Object.defineProperty(this, 'target', { get: function () {
      return this.$el.parentNode
    }})

    Object.defineProperty(this, 'shouldKeepAnimating', { get: function () {
      for (let index = 0; index < this.$refs.ripples.length; ++index) {
        if (!this.$refs.ripples[index].isAnimationComplete) {
          return true
        }
      }

      return false
    }})
  },

  ready () {
    this.target.addEventListener('mousedown', this.uiDownAction)
    this.target.addEventListener('mouseup', this.uiUpAction)
  },

  beforeDestroy () {
    this.target.removeEventListener('mousedown', this.uiDownAction)
    this.target.removeEventListener('mouseup', this.uiUpAction)
  }
}
</script>

<style>
  .paper-ripple {
    display: block;
    position: absolute;
    border-radius: inherit;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,
     * creating a node (with a position:absolute) in the middle of an event
     * handler "interrupts" that event handler (which happens when the
     * ripple is created on demand) */
    pointer-events: none;
  }

  .paper-ripple--animating {
    /* This resolves a rendering issue in Chrome (as of 40) where the
       ripple is not properly clipped by its parent (which may have
       rounded corners). See: http://jsbin.com/temexa/4

       Note: We only apply this style conditionally. Otherwise, the browser
       will create a new compositing layer for every ripple element on the
       page, and that would be bad. */
    -webkit-transform: translate(0, 0);
    transform: translate3d(0, 0, 0);
  }

  .paper-ripple__background,
  .paper-ripple__waves,
  .wave__container,
  .wave {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .paper-ripple__background,
  .wave {
    opacity: 0;
  }

  .paper-ripple__waves,
  .wave {
    overflow: hidden;
  }

  .wave__container,
  .wave {
    border-radius: 50%;
  }

  .paper-ripple--circle .paper-ripple__background,
  .paper-ripple--circle .paper-ripple__waves {
    border-radius: 50%;
  }

  .paper-ripple--circle .wave__container {
    overflow: hidden;
  }
</style>
