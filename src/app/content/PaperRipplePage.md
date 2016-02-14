# PaperRipple

## Default ripple effect

Note, it's important that the parent container of the ripple be relative position, otherwise the ripple will emanate outside of the desired container.

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <div style="width: 100px; height: 100px; border: 1px solid black; position:relative;">
      <paper-ripple></paper-ripple>
    </div>
  </div>
</div>

```html
<div style="border:1px solid black;position:relative;">
  <paper-ripple></paper-ripple>
</div>
```

## Custom behavior

`paper-ripple` listens to "mousedown" and "mouseup" events so it would display ripple effect when touches on it. You can also defeat the default behavior and manually route the down and up actions to the ripple element. Note that it is important if you call `downAction()` you will have to make sure to call `upAction()` so that paper-ripple would end the animation loop.

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <div style="width: 100px; height: 100px; border: 1px solid black; position:relative;">
      <paper-ripple v-ref:ripple noink></paper-ripple>
    </div>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button @click="downAction">Down</button>
    <button @click="upAction">Up</button>
  </div>
</div>

```html
<div id="app">
  <div style="border:1px solid black;position:relative;">
    <!-- use noink attributes to disable the ripple effect -->
    <paper-ripple v-ref:ripple noink></paper-ripple>
  </div>

  <div>
    <!-- create action that call downAction and upAction -->
    <button @click="downAction">Down</button>
    <button @click="upAction">Up</button>
  </div>
</div>

<script>
  new Vue({
    el: '#app',
    methods: {
      downAction (event) {
        // Call the ripple downAction
        this.$refs.ripple.downAction()
      },
      upAction (event) {
        // Call the ripple upAction
        this.$refs.ripple.upAction()
      }
    }
  })
</script>
```

## Ripple effect variations

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <div style="width: 100px; height: 100px; border: 1px solid black; position:relative;">
      <paper-ripple style="color:red;"></paper-ripple>
    </div>
  </div>
</div>

```html
<!-- custom ripple color -->
<div style="border:1px solid black;position:relative;">
  <paper-ripple style="color:red;"></paper-ripple>
</div>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <div style="width: 100px; height: 100px; border: 1px solid black; position:relative;">
      <paper-ripple recenters></paper-ripple>
    </div>
  </div>
</div>

```html
<!-- the ripple grow toward the center of its container -->
<div style="border:1px solid black;position:relative;">
  <paper-ripple recenters></paper-ripple>
</div>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <div style="width: 100px; height: 100px; border: 1px solid black; position:relative;">
      <paper-ripple center></paper-ripple>
    </div>
  </div>
</div>

```html
<!-- center the ripple inside its container -->
<div style="border:1px solid black;position:relative;">
  <paper-ripple center></paper-ripple>
</div>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <div style="width: 100px; height: 100px; border: 1px solid black; position:relative;">
      <paper-ripple circle></paper-ripple>
    </div>
  </div>
</div>

```html
<!-- make the rippling effect within a circle -->
<div style="border:1px solid black;position:relative;">
  <paper-ripple circle></paper-ripple>
</div>
```
