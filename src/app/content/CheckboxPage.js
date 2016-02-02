import Vue from 'vue'
import MdCheckbox from '../../md/Checkbox'
import marked from 'marked'
import url from 'file!./md/CheckboxPage.md'

Vue.component('checkbox-page', function (resolve, reject) {
  Vue.http({url: url, method: 'GET'}).then(function (response) {
    resolve({
      template: '<div class="demo-page">' + marked(response.data) + '</div>',
      components: {
        MdCheckbox
      },
      data () {
        return {
          checkedNames: ['John'],
          cb1: true
        }
      }
    })
  }, function (response) {
    reject(response)
  })
})
