import Vue from 'vue'
import Vuex from 'vuex'
import { Hello } from 'modules'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  modules: {
    Hello
  }
})

export default store
