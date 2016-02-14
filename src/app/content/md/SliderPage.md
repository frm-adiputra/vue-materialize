# SLIDERS

Selecting a value out of a range.

<div class="mdl-grid">
  <div class="demo-cell mdl-cell mdl-cell--4-col mdl-cell--top mdl-cell--middle">
    <md-slider :min="0" :max="100" :value.sync="sliderValue"></md-slider>
    <p class="mdl-typography--caption-color-contrast">Slider</p>
  </div>
  <div class="demo-cell mdl-cell mdl-cell--4-col mdl-cell--top mdl-cell--middle">
    <input v-model="sliderValue" number>
    <p class="mdl-typography--caption-color-contrast">Slider value ({{sliderValue}})</p>
  </div>
</div>
