import Vue from 'vue'
import MdlButton from '../../mdl/Button'
import marked from 'marked'
import url from 'file!./md/ButtonPage.md'

Vue.component('button-page', function (resolve, reject) {
  Vue.http({url: url, method: 'GET'}).then(function (response) {
    resolve({
      template: '<div class="demo-page">' + marked(response.data) + '</div>',
      components: {
        MdlButton
      }
    })
  }, function (response) {
    reject(response)
  })
})
