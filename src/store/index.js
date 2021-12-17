import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //图片的路径
    imgUrl:require('../assets/img.png')
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tab,
    user
  }
})
