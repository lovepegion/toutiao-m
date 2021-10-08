import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant' // 弹出框组件
import store from '@/store/'

Vue.use(VueRouter)

const routes = [
  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    meta: { requiresAuth: false }
  },
  // 注册页
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/Register.vue'),
    meta: { requiresAuth: false },
    children: [
      // 输入验证码页
      {
        path: '/captcha/register',
        name: 'captcha',
        component: () => import('@/views/register/views/Captcha.vue'),
        meta: { requiresAuth: false }
      },
      // 输入昵称页面
      {
        path: '/nickname/register',
        name: 'nickname',
        component: () => import('@/views//register/views/Nickname.vue'),
        meta: { requiresAuth: false }
      }
    ]
  },
  // 首页home
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Home.vue'),
    meta: { requiresAuth: false }
  },
  // 电台
  {
    path: '/radio',
    name: 'radio',
    component: () => import('@/views/radio/Radio.vue'),
    meta: { requiresAuth: false }
  },
  // 视频
  {
    path: '/vedio',
    name: 'vedio',
    component: () => import('@/views/vedio/Vedio.vue'),
    meta: { requiresAuth: false }
  },
  // 我的
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my/My.vue'),
    meta: { requiresAuth: false }
  },
  // 搜索
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/Search.vue'),
    meta: { requiresAuth: false }
  },
  // 用户信息页
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('@/views/userProfile/'),
    meta: { requiresAuth: false }
  },
  // 评论
  {
    name: 'comment',
    path: '/comment/:type/:id',
    component: () => import('@/views/comment/Comment.vue'),
    props: true
  },
  // 视频播放
  {
    name: 'vplay',
    path: '/vplay/:type/:vid/:uid/:title',
    component: () => import('@/views/vedioplay/VedioPlay.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user) {
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问,确认登录吗？'
    })
      .then(() => { // on confirm
        router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      })
      .catch(() => { // on cancel
        next(false) // 中断导航，停留在原页面
      })
  } else {
    next()
  }
})

export default router
