import Vue from 'vue'
import '../../md/Button'
import marked from 'marked'
import url from 'file!./md/ButtonPage.md'

Vue.component('button-page', function (resolve, reject) {
  Vue.http({url: url, method: 'GET'}).then(function (response) {
    resolve({
      template: '<div class="demo-page">' + marked(response.data) + '</div>'
    })
  }, function (response) {
    reject(response)
  })
})
