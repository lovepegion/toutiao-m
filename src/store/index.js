import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
    // user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(USER_KEY, data) // 持久化，因为页面刷新vue会重新加载
    }
  },
  actions: {
  },
  modules: {
  }
})
