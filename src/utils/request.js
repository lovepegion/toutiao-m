import axios from 'axios'
import store from '@/store/' // 非组件实例中获取store

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器,发送请求前加入一些逻辑,比如统一设置header的Authorization，就不用每个请求单独设置
request.interceptors.request.use(function (config) { // config是请求本身携带的信息
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config // config一定要返回
}, function (error) {
  return Promise.reject(error)
})

export default request
