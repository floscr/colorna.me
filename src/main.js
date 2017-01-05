import Vue from 'vue'
import App from 'src/App'

// Google Analytics
import VueAnalytics, { loadScript } from 'vue-anaylics'
Vue.use(VueAnalytics)
loadScript('UA-89852478-1')

// Main App init and at to dom
new Vue({
  el: '#app',
  render: h => h(App),
})
