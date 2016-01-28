<template>
  <div id="buttonPage">
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
        <mdl-button fab colored><i class="material-icons">add</i></mdl-button>
      </div>
      <div class="mdl-cell mdl-cell--2-col mdl-cell--top mdl-cell--middle">
        <mdl-button ripple fab colored><i class="material-icons">add</i></mdl-button>
      </div>
    </div>
  </div>
</template>

<script>
import MdlButton from '../mdl/Button'

export default {
  components: {
    MdlButton
  }
}
</script>

<style>
</style>
