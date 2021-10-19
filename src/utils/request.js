import axios from 'axios'

// 创建request实例应用
const request = axios.create({
  baseURL: 'http://120.55.101.210:3000',
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
