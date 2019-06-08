import Vue from 'vue'
import App from './App.vue'
// import routes from './routes'
import Buefy from 'buefy'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.component('VueSlider', VueSlider)

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  // routes,
  render: h => h(App),
}).$mount('#app')
