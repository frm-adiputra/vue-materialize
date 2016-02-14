import Vue from 'vue'
import PaperRipple from '../../md/PaperRipple'
import marked from 'marked'
import hljs from 'hljs'
import url from 'file!./PaperRipplePage.md'

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

Vue.component('paper-ripple-page', function (resolve, reject) {
  Vue.http({url: url, method: 'GET'}).then(function (response) {
    resolve({
      template: '<div class="demo-page">' + marked(response.data) + '</div>',
      components: {
        PaperRipple
      },
      data () {
        return {
          progress1: 40,
          buffer1: 80
        }
      }
    })
  }, function (response) {
    reject(response)
  })
})
