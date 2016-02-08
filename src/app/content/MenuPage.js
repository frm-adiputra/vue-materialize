import Vue from 'vue'
import MdMenu from '../../md/Menu'
import MdButton from '../../md/Button'
import '../../md/MenuPartials'
import marked from 'marked'
import url from 'file!./md/MenuPage.md'

Vue.component('menu-page', function (resolve, reject) {
  Vue.http({url: url, method: 'GET'}).then(function (response) {
    resolve({
      template: '<div class="demo-page">' + marked(response.data) + '</div>',
      components: {
        MdMenu,
        MdButton
      },
      data () {
        return {
          mymenu: [
            {title: 'Cut'},
            {title: 'Copy'},
            {title: 'Paste'}
          ],
          mymenuVisible: false
        }
      },
      methods: {
        toggleMenu () {
          this.mymenuVisible = !this.mymenuVisible
        }
      }
    })
  }, function (response) {
    reject(response)
  })
})
