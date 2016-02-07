import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAsyncData from 'vue-async-data'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueAsyncData)
Vue.use(VueResource)

import App from './App'
import Home from './app/content/Home'
import './app/content/BadgePage'
import './app/content/ButtonPage'
import './app/content/ProgressPage'
import './app/content/CheckboxPage'
import './app/content/MenuPage'

/* eslint-disable no-new */
var AppWrapper = Vue.extend({
  components: { App }
})

var router = new VueRouter()
router.map({
  '/home': {
    component: Home
  },
  '/badge': {
    component: Vue.component('badge-page')
  },
  '/button': {
    component: Vue.component('button-page')
  },
  '/checkbox': {
    component: Vue.component('checkbox-page')
  },
  '/progress': {
    component: Vue.component('progress-page')
  },
  'menu': {
    component: Vue.component('menu-page')
  }
})

router.start(AppWrapper, '#app')
