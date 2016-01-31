# BADGES

Small status descriptors for UI elements.

**Note**: Because of the badge component's small size, the data-badge value should typically contain one to three characters. More than three characters will not cause an error, but some characters may fall outside the badge and thus be difficult or impossible to see. The value of the data-badge attribute is centered in the badge.

## Binding

<div id="badge-demo-binding">
  <span class="material-icons" v-mdl-badge="badgeValue">account_box</span>
  <br />
  <input v-model="badgeValue">
</div>

```html
<div id="app">
  <span class="material-icons" v-mdl-badge="badgeValue">account_box</span>
  <input v-model="badgeValue">
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      badgeValue: 1
    }
  })
</script>
```

## Variations

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <span class="material-icons"  v-mdl-badge.literal="1">account_box</span>
    <p class="mdl-typography--caption-color-contrast">Number</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <span class="material-icons" v-mdl-badge.literal="♥">account_box</span>
    <p class="mdl-typography--caption-color-contrast">Icon</p>
  </div>
</div>

```html
<!-- Number badge on icon -->
<span class="material-icons"  v-mdl-badge.literal="1">account_box</span>

<!-- Icon badge on icon -->
<span class="material-icons" v-mdl-badge.literal="♥">account_box</span>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <span v-mdl-badge.literal="4">Inbox</span>
    <p class="mdl-typography--caption-color-contrast">Number</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <span v-mdl-badge.literal="♥">Mood</span>
    <p class="mdl-typography--caption-color-contrast">Icon</p>
  </div>
</div>

```html
<!-- Number badge -->
<span v-mdl-badge.literal="4">Inbox</span>

<!-- Icon badge -->
<span v-mdl-badge.literal="♥">Mood</span>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <span class="material-icons"  v-mdl-badge.literal="1" no-background>account_box</span>
    <p class="mdl-typography--caption-color-contrast">No background</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <span class="material-icons"  v-mdl-badge.literal="1" overlap>account_box</span>
    <p class="mdl-typography--caption-color-contrast">Overlap</p>
  </div>
</div>

## Configuration props

- `no-background`: Applies open-circle effect to badge  
  (optional)
- `overlap`: Make the badge overlap with its container  
  (optional)
