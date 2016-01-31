import Vue from 'vue'
import '../../md/Progress'
import marked from 'marked'
import url from 'file!./md/ProgressPage.md'

Vue.component('progress-page', function (resolve, reject) {
  Vue.http({url: url, method: 'GET'}).then(function (response) {
    resolve({
      template: '<div class="demo-page">' + marked(response.data) + '</div>',
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
