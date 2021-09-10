import request from '@/utils/request'
// import store from '@/store/' // 非组件实例中获取store

// 登录/注册
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 黑马头条发送短信验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取当前用户登录信息
 */
export const getCurrentUser = mobile => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: { // 统一在拦截器里面验证token，不用每个请求都写
    //   Authorization: `Bearer ${store.state.user.token}` // 服务器后端要求的写法,bearer是后端自定义的识别符号
    // }
  })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
