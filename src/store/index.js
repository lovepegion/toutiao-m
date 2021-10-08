import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: {
      phone: '',
      captcha: '',
      password: '',
      nickname: '',
      token: getItem('token') || ''
    },
    profile: getItem('profile') || null,
    playerBottom: 0, // 播放器底部控制，只有在layout界面时，距离底部距离是50
    currentPlayItems: [], // 当前播放的音乐
    // user: JSON.parse(localStorage.getItem('user'))
    cachePages: ['LayoutIndex'] // 组件间切换时需要缓存的页面
  },
  mutations: {
    setCurrentPlayItems (state, data) { // 设置当前播放的音乐
      state.currentPlayItems = data
    },
    setPlayerBottom (state, data) { // 设置当前播放器距离底部的距离
      state.playerBottom = data
    },
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
