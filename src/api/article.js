/**
 * 歌单相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取每日推荐歌曲
 */
export const getDailyRecommands = () => {
  return request({
    method: 'GET',
    url: '/top/song?type=0'
  })
}

/**
 * 获取歌单分类
 */
export const getMusicCatlist = () => {
  return request({
    method: 'GET',
    url: '/playlist/catlist'
  })
}

/**
 * 网友推荐歌单
 */
export const getNetRecommands = () => {
  return request({
    method: 'GET',
    url: '/top/playlist'
  })
}

/**
 * 获取歌单详情
 */
export const getClassifyDetail = id => {
  return request({
    method: 'GET',
    url: `/playlist/detail?id=${id}`
  })
}
