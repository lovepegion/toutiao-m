/**
 * 单曲相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取单个歌曲链接
 */
export const getUrl = (id) => {
  return request({
    method: 'GET',
    url: `/song/url?id=${id}`
  })
}

/**
 * 获取歌曲详情
 */
export const getSongDetail = ids => {
  const idsString = ids.join(',')
  return request({
    method: 'GET',
    url: `/song/detail?ids=${idsString}`
  })
}

/**
 * 获取歌曲评论
 */
export const getSongComments = query => {
  return request({
    method: 'GET',
    url: `/comment/music?id=${query.id}&limit=${query.limit}&offset=${query.offset}`
  })
}
