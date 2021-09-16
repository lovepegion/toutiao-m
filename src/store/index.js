import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY),
    // user: JSON.parse(localStorage.getItem('user'))
    cachePages: ['LayoutIndex'] // 组件间切换时需要缓存的页面
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(USER_KEY, data) // 持久化，因为页面刷新vue会重新加载
    },
    // 登录后添加需要缓存页面
    addCachePages (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    // 退出时清空缓存
    removeCachePages (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== 1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
