import Vue from 'vue'
import PaperRipple from '../../md/PaperRipple'
import marked from 'marked'
import url from 'file!./PaperRipplePage.md'

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
