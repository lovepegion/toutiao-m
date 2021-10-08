/**
 * 视频相关请求模块
 */
import request from '@/utils/request'

/**
  * 获取视频播放地址
  */
export const getVedioUrl = id => {
  return request({
    method: 'GET',
    url: `/video/url?id=${id}`
  })
}

/**
  * 获取视频分类列表
  */
export const getVedioGroup = () => {
  return request({
    method: 'GET',
    url: '/video/group/list'
  })
}

/**
  * 获取视频标签下的视频
  */
export const getGroupVedio = query => {
  return request({
    method: 'GET',
    url: `/video/group?id=${query.id}&offset=${query.offset}`
  })
}

/**
  * 获取视频点赞、转发、评论等
  */
export const getVedioInfo = vid => {
  return request({
    method: 'GET',
    url: `/video/detail/info?vid=${vid}`
  })
}
