/**
 * dayjs配置相关
 */
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 加载中文语言包
import relativeTime from 'dayjs/plugin/relativeTime' // 加载相对时间

dayjs.extend(relativeTime) // 配置使用相对时间
dayjs.locale('zh-cn') // 配置中文语言包

Vue.filter('relativeTime', value => { // 全局过滤器
  return dayjs(value).from(dayjs())
})

Vue.filter('dateTime', (value, format = 'YYYY-MM-DD HH:mm:ss') => { // 全局过滤器
  return dayjs(value).format(format)
})
