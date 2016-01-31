# Progress Bar

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <p style="text-align: left;">progress <input v-model="progress1" number></p>
    <p style="text-align: left;">buffer <input v-model="buffer1" number></p>
    <md-progress :progress="progress1" :buffer="buffer1"></md-progress>
    <p class="mdl-typography--caption-color-contrast">Progress bar</p>
  </div>
</div>

```html
<!-- Adjust progress width -->
<style>
  .demo-progress {
    width: 50vw;
    max-width: 260px;
  }
</style>

<!-- Bindings -->
<div id="app">
  <md-progress :progress="prog" :buffer="buff"></md-progress>
</div>

<!-- Vue instance -->
<script>
  new Vue({
    el: '#app',
    data: {
      prog: 40,
      buff: 80
    }
  })
</script>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <md-progress indeterminate style="width: 50vw; max-width: 260px;"></md-progress>
    <p class="mdl-typography--caption-color-contrast">Indeterminate</p>
  </div>
</div>

```html
<!-- Adjust progress width -->
<style>
  .demo-progress {
    width: 50vw;
    max-width: 260px;
  }
</style>

<!-- Indeterminate progress -->
<md-progress indeterminate class="demo-progress"></md-progress>
```

## Configuration props

- `progress`: Current progress of the progress bar
- `buffer`: Current buffer of the progress bar (for buffering progress bar)
- `indeterminate`: Indeterminate progress bar (`progress` and `buffer` are ignored)
