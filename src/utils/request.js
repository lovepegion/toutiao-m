import axios from 'axios'

// 创建request实例
const request = axios.create({
  baseURL: 'http://g2xy4e.natappfree.cc/',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.request.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default request
