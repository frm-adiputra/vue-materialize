import Vue from 'vue'
import MdSlider from '../../md/Slider'
import marked from 'marked'
import url from 'file!./md/SliderPage.md'

Vue.component('slider-page', function (resolve, reject) {
  Vue.http({url: url, method: 'GET'}).then(function (response) {
    resolve({
      template: '<div class="demo-page">' + marked(response.data) + '</div>',
      components: {
        MdSlider
      },
      data () {
        return {
          sliderValue: 40
        }
      }
    })
  }, function (response) {
    reject(response)
  })
})
