# BUTTONS

Variations on Material Design buttons.


<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button fab colored><i class="material-icons">add</i></button>
    <p class="mdl-typography--caption-color-contrast">Colored FAB</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button ripple fab colored><i class="material-icons">add</i></button>
    <p class="mdl-typography--caption-color-contrast">With ripple</p>
  </div>

</div>
```html
<!-- Colored FAB button -->
<button v-md-button fab colored>
  <i class="material-icons">add</i>
</button>

<!-- Colored FAB button with ripple -->
<button v-md-button ripple fab colored>
  <i class="material-icons">add</i>
</button>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button fab>
      <i class="material-icons">add</i>
    </button>
    <p class="mdl-typography--caption-color-contrast">Plain FAB</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button fab ripple>
      <i class="material-icons">add</i>
    </button>
    <p class="mdl-typography--caption-color-contrast">With ripple</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button fab disabled>
      <i class="material-icons">add</i>
    </button>
    <p class="mdl-typography--caption-color-contrast">Disabled</p>
  </div>
</div>

```html
<!-- FAB button -->
<button v-md-button fab>
  <i class="material-icons">add</i>
</button>

<!-- FAB button with ripple -->
<button v-md-button fab ripple>
  <i class="material-icons">add</i>
</button>

<!-- Disabled FAB button -->
<button v-md-button fab disabled>
  <i class="material-icons">add</i>
</button>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button raised>
      Button
    </button>
    <p class="mdl-typography--caption-color-contrast">Raised button</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button raised ripple>
      Button
    </button>
    <p class="mdl-typography--caption-color-contrast">With ripple</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button raised disabled>
      Button
    </button>
    <p class="mdl-typography--caption-color-contrast">Disabled</p>
  </div>
</div>

```html
<!-- Raised button -->
<button v-md-button raised>
  Button
</button>

<!-- Raised button with ripple -->
<button v-md-button raised ripple>
  Button
</button>

<!-- Raised disabled button-->
<button v-md-button raised disabled>
  Button
</button>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button raised colored>
      Button
    </button>
    <p class="mdl-typography--caption-color-contrast">Colored button</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button raised accent>
      Button
    </button>
    <p class="mdl-typography--caption-color-contrast">Accent colored</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button raised accent ripple>
      Button
    </button>
    <p class="mdl-typography--caption-color-contrast">With ripple</p>
  </div>
</div>

```html
<!-- Colored raised button -->
<button v-md-button raised colored>
  Button
</button>

<!-- Accent-colored raised button -->
<button v-md-button raised accent>
  Button
</button>

<!-- Accent-colored raised button with ripple -->
<button v-md-button raised accent ripple>
  Button
</button>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button>
      Button
    </button>
    <p class="mdl-typography--caption-color-contrast">Flat button</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button ripple>
      Button
    </button>
    <p class="mdl-typography--caption-color-contrast">With ripple</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button disabled>
      Button
    </button>
    <p class="mdl-typography--caption-color-contrast">Disabled</p>
  </div>
</div>

```html
<!-- Flat button -->
<button v-md-button>
  Button
</button>

<!-- Flat button with ripple -->
<button v-md-button ripple>
  Button
</button>

<!-- Disabled flat button -->
<button v-md-button disabled>
  Button
</button>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button primary>
      Button
    </button>
    <p class="mdl-typography--caption-color-contrast">Primary colored flat</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button accent>
      Button
    </button>
    <p class="mdl-typography--caption-color-contrast">Accent colored flat</p>
  </div>
</div>

```html
<!-- Primary-colored flat button -->
<button v-md-button primary>
  Button
</button>

<!-- Accent-colored flat button -->
<button v-md-button accent>
  Button
</button>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button icon>
      <i class="material-icons">mood</i>
    </button>
    <p class="mdl-typography--caption-color-contrast">Icon button</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button icon colored>
      <i class="material-icons">mood</i>
    </button>
    <p class="mdl-typography--caption-color-contrast">Colored</p>
  </div>
</div>

```html
<!-- Icon button -->
<button v-md-button icon>
  <i class="material-icons">mood</i>
</button>

<!-- Colored icon button -->
<button v-md-button icon colored>
  <i class="material-icons">mood</i>
</button>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button fab mini-fab>
      <i class="material-icons">add</i>
    </button>
    <p class="mdl-typography--caption-color-contrast">Mini FAB</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <button v-md-button fab mini-fab colored>
      <i class="material-icons">add</i>
    </button>
    <p class="mdl-typography--caption-color-contrast">Colored</p>
  </div>
</div>

```html
<!-- Mini FAB button -->
<button v-md-button fab mini-fab>
  <i class="material-icons">add</i>
</button>

<!-- Colored mini FAB button -->
<button v-md-button fab mini-fab colored>
  <i class="material-icons">add</i>
</button>
```

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <a v-md-button fab colored><i class="material-icons">add</i></a>
    <p class="mdl-typography--caption-color-contrast">Colored FAB link button</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
    <a v-md-button ripple fab colored><i class="material-icons">add</i></a>
    <p class="mdl-typography--caption-color-contrast">With ripple</p>
  </div>

</div>
```html
<!-- Colored FAB link button -->
<a v-md-button fab colored>
  <i class="material-icons">add</i>
</a>

<!-- Colored FAB link button with ripple -->
<a v-md-button ripple fab colored>
  <i class="material-icons">add</i>
</a>
```

## Props
- `raised`: Applies _raised_ display effect  
  Mutually exclusive with _fab_, _mini-fab_, and _icon_
- `fab`: Applies _fab_ (circular) display effect  
  Mutually exclusive with _raised_, _mini-fab_, and _icon_
- `mini-fab`: Applies _mini-fab_ (small fab circular) display effect  
  Mutually exclusive with _raised_, _fab_, and _icon_
- `icon`: Applies _icon_ (small plain circular) display effect  
  Mutually exclusive with _raised_, _fab_, and _mini-fab_
- `colored`: Applies _colored_ display effect  
  Colors are defined in `material.min.css`
- `primary`: Applies _primary_ color display effect  
  Colors are defined in `material.min.css`
- `accent`: Applies _accent_ color display effect  
  Colors are defined in `material.min.css`
- `ripple`: Applies _ripple_ click effect  
  May be used in combination with any other classes
- `disabled`: Disables button  
  May be used with any button version
