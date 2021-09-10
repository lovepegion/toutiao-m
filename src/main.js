import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 自动设置REM基准值(html根字体大小)
import 'amfe-flexible'

// 加载vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 加载全局样式,放到最后覆盖第三方样式
import './style/index.less'

// 全局时间过滤器
import '@/utils/dayjs'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
