# Checkbox

## Bindings

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--8-col mdl-cell--top mdl-cell--middle" :style='{textAlign: "start"}'>
    <md-checkbox id="jack" value="Jack" :checked.sync="checkedNames" ripple>Jack</md-checkbox>
    <md-checkbox id="john" value="John" :checked.sync="checkedNames" ripple>John</md-checkbox>
    <md-checkbox id="mike" value="Mike" :checked.sync="checkedNames" ripple>Mike</md-checkbox>
    <span>Checked names: </span><span v-text="checkedNames | json"></span>
  </div>
</div>
<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--8-col mdl-cell--top mdl-cell--middle" :style='{textAlign: "start"}'>
    <md-checkbox id="jack" value="Jack" :checked.sync="checkedNames" ripple>Jack</md-checkbox>
    <md-checkbox id="john" value="John" :checked.sync="checkedNames" ripple>John</md-checkbox>
    <md-checkbox id="mike" value="Mike" :checked.sync="checkedNames" ripple>Mike</md-checkbox>
    <span>Checked names: </span><span v-text="checkedNames | json"></span>
  </div>
</div>

```html
<!-- Bindings -->
<div id="app">
  <md-checkbox id="jack" value="Jack" :checked.sync="checkedNames" ripple>Jack</md-checkbox>
  <md-checkbox id="john" value="John" :checked.sync="checkedNames" ripple>John</md-checkbox>
  <md-checkbox id="mike" value="Mike" :checked.sync="checkedNames" ripple>Mike</md-checkbox>
  <span>Checked names: </span><span v-text="checkedNames | json"></span>
</div>

<!-- Vue instance -->
<script>
  new Vue({
    el: '#app',
    data: {
      checkedNames: ['Mike']
    }
  })
</script>
```

## Variations

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <md-checkbox id="checkbox-1" ripple :checked.sync='cb1'>Checkbox</md-checkbox>
    <p class="mdl-typography--caption-color-contrast">Check on</p>
  </div>

  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <md-checkbox id="checkbox-2" :checked.sync='cb1' ripple>Checkbox</md-checkbox>
    <p class="mdl-typography--caption-color-contrast">Check off</p>
  </div>
</div>

```html
<!-- Bindings -->
<div id="app">
  <md-checkbox id="checkbox-1" ripple :checked.sync='cb1'>Checkbox</md-checkbox>
  <md-checkbox id="checkbox-2" ripple>Checkbox</md-checkbox>
</div>

<!-- Vue instance -->
<script>
  new Vue({
    el: '#app',
    data: {
      cb1: true
    }
  })
</script>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <md-checkbox id="checkbox-3" ripple :checked.sync='cb1'>Checkbox</md-checkbox>
    <p class="mdl-typography--caption-color-contrast">Disabled check on</p>
  </div>

  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <md-checkbox id="checkbox-4" ripple disabled>Checkbox</md-checkbox>
    <p class="mdl-typography--caption-color-contrast">Disabled check off</p>
  </div>
</div>

```html
<!-- Bindings -->
<div id="app">
  <md-checkbox id="checkbox-3" ripple :checked.sync='cb1' disabled>Checkbox</md-checkbox>
  <md-checkbox id="checkbox-4" ripple disabled>Checkbox</md-checkbox>
</div>

<!-- Vue instance -->
<script>
  new Vue({
    el: '#app',
    data: {
      cb1: true
    }
  })
</script>
```

## Configuration props

- `id`: Provide id for elements (**required**)
- `value`: Value of the checkbox
- `checked`: Checkbox checked conditin
- `ripple`: Applies ripple click effect
- `disabled`: Disable checkbox
