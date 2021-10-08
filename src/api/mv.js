/**
 * 歌单相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取网易出品推荐推荐mv
 */
export const getHotMvs = query => {
  return request({
    method: 'GET',
    url: `/mv/exclusive/rcmd?limit=${query.limit}&offset=${query.offset}`
  })
}

/**
 * 获取mv分类搜索
 */
export const getSortMvs = query => {
  return request({
    method: 'GET',
    url: `/mv/all?limit=${query.limit}&offset=${query.offset}&area=${query.area}&type=${query.type}&order=${query.order}`
  })
}

/**
 * 获取mv播放地址
 */
export const getMvUrl = id => {
  return request({
    method: 'GET',
    url: `/mv/url?id=${id}`
  })
}

/**
 * 获取mv点赞、转发、评论
 */
export const getMvInfo = mvid => {
  return request({
    method: 'GET',
    url: `/mv/detail/info?mvid=${mvid}`
  })
}
