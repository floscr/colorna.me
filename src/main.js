// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from 'src/store'
import App from 'src/App'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store
  render: h => h(App)
})
