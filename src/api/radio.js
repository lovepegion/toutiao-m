/**
 * 电台相关请求模块
 */
import request from '@/utils/request'

/**
  * 获取热门电台
  */
export const getHotRadios = () => {
  return request({
    method: 'GET',
    url: '/dj/hot'
  })
}

/**
  * 获取电台分类
  */
export const getRadioSorts = () => {
  return request({
    method: 'GET',
    url: '/dj/catelist'
  })
}

/**
  * 获取电台分类下的电台
  */
export const getSortProgram = type => {
  return request({
    method: 'GET',
    url: `/dj/recommend/type?type=${type}`
  })
}

/**
  * 获取电台详情
  */
export const getProgramDetail = rid => {
  return request({
    method: 'GET',
    url: `/dj/detail?rid=${rid}`
  })
}

/**
  * 获取电台节目
  */
export const getPrograms = rid => {
  return request({
    method: 'GET',
    url: `/dj/program?rid=${rid}`
  })
}
