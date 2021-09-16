import axios from 'axios'
import store from '@/store/' // 非组件实例中获取store
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router/'

// 请求refreshToken， 不用下面的request实例，是因为它有拦截器，还要用到token
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 创建request实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 文章id是数字，超出了js反味，用jsonbig来处理
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      return data
    }
  }]
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

// 响应拦截器，自动处理token过期问题
request.interceptors.response.use(function (response) {
  // 响应成功的处理，状态码2XX

  return response
}, async function (error) {
  // 响应失败的处理，状态码2XX以上
  const status = error.response.status
  if (status === 400) {
    // 客户端错误，比如参数错误，手机号输错等
    Toast.fail('客户端请求参数异常')
  } else if (status === 401) {
    // token无效
    // 如果没有user或user.token，直接登录
    const { user } = store.state
    if (!user || !user.token) {
      return redirectLogin()
    }
    // 如果有refresh_token，则请求并更新本地的token
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = data.data.token
      store.commit('setUser', user) // 更新本地user数据
      // 从新发送之前失败的请求,error.config是本次请求的相关配置对象
      return request(error.config)
    } catch (err) {
      redirectLogin() // 如果刷新token都失败了，则直接跳转登录页
    }
    // 用新token从新发送失败的请求
  } else if (status === 403) {
    // 没有权限
    Toast.fail('没有操作权限')
  } else if (status >= 500) {
    // 服务端异常
    Toast.fail('服务端异常,请稍后重试')
  }
  return Promise.reject(error)
})

function redirectLogin () {
  router.replace({
    name: 'login',
    query: { // query是查询参数用？分割，会放在url后面
      // currentRoute和我们在组件中获取的this.$route是一个东西,fullPath是路由路径
      // 从未登录页跳转到登录页时，记录下未登录页的路径，从新登录后获取未登录页路径，直接跳转，京东就是这么做的
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
