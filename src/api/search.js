/**
 * 搜索请求相关模块
 */
import request from '@/utils/request'

/**
  * 获取搜索联想建议
  */
export const getSearchSuggestions = query => {
  let suggestionUrl = ''
  if (query.type) suggestionUrl = `/search/suggest?keywords=${query.keywords}&type=${query.type}`
  else suggestionUrl = `/search/suggest?keywords=${query.keywords}`
  return request({
    method: 'GET',
    url: suggestionUrl
  })
}

/**
  * 获取搜索结果
  */
export const getSearchResult = query => {
  console.log('searchquery', query)
  return request({
    method: 'GET',
    url: `/search?keywords=${query.keywords}&type=${query.type}&limit=${query.limit}&offset=${query.offset}`
  })
}

/**
  * 获取用户搜索历史
  */
export const getSearchHistories = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
