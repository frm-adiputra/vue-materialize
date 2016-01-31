import Vue from 'vue'
import '../../md/Badge'
import marked from 'marked'
import url from 'file!./md/BadgePage.md'

Vue.component('badge-page', function (resolve, reject) {
  Vue.http({url: url, method: 'GET'}).then(function (response) {
    resolve({
      template: '<div class="demo-page">' + marked(response.data) + '</div>',
      data () {
        return {
          badgeValue: 1
        }
      }
    })
  }, function (response) {
    reject(response)
  })
})
