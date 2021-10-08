/**
 * 榜单相关请求模块
 */
import request from '@/utils/request'

/**
   * 获取每日推荐歌曲
   */
export const getToplist = () => {
  return request({
    method: 'GET',
    url: '/toplist'
  })
}
