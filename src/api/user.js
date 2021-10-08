import request from '@/utils/request'
// import store from '@/store/' // 非组件实例中获取store

// 检查手机是否已经注册
export const checkPhone = phone => {
  return request({
    method: 'GET',
    url: `/cellphone/existence/check?phone=${phone}`
  })
}

// 发送验证码
export const getCaptcha = phone => {
  return request({
    method: 'GET',
    url: `/captcha/sent?phone=${phone}`
  })
}

// 校验验证码是否正确
export const checkCaptcha = query => {
  return request({
    method: 'GET',
    url: `/captcha/verify?phone=${query.phone}&captcha=${query.captcha}`
  })
}

// 请求注册
export const sendRegister = query => {
  return request({
    method: 'GET',
    url: `/register/cellphone?phone=${query.phone}&password=${query.password}&captcha=${query.captcha}&nickname=${query.nickname}`
  })
}

// 登录
export const login = query => {
  return request({
    method: 'GET',
    url: `/login/cellphone?phone=${query.phone}&password=${query.password}`
  })
}

// 退出
export const loginOut = () => {
  return request({
    method: 'GET',
    url: '/logout'
  })
}

// 获取用户详情
export const getUserDetail = uid => {
  return request({
    method: 'GET',
    url: `/user/detail?uid=${uid}`
  })
}

// 获取用户关注列表
export const getUserfollows = uid => {
  return request({
    method: 'GET',
    url: `/user/follows?uid=${uid}`
  })
}

// 发表评论
export const putComment = query => {
  return request({
    method: 'GET',
    url: `/comment?t=${query.t}&type=${query.type}&id=${query.id}&content=${query.content}`
  })
}
