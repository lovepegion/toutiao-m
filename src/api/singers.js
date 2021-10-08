/**
 * 歌手相关请求模块
 */
import request from '@/utils/request'

/**
  * 获取每日推荐歌曲
  */
export const getSingersSearch = query => {
  return request({
    method: 'GET',
    url: `/artist/list?limit=${query.limit}&offset=${query.offset}&type=${query.type}&area=${query.area}&initial=${query.initial}`
  })
}

/**
  * 获取歌手详情
  */
export const getSingerDetail = id => {
  return request({
    method: 'GET',
    url: `/artist/detail?id=${id}`
  })
}

/**
  * 获取歌手单曲50首
  */
export const getSingerSongs = id => {
  return request({
    method: 'GET',
    url: `/artists?id=${id}`
  })
}

/**
  * 获取歌手全部歌曲
  */
export const getAllSongs = query => {
  return request({
    method: 'GET',
    url: `/artist/songs?id=${query.id}&order=${query.order}&limit=${query.limit}&offset=${query.offset}`
  })
}

/**
  * 获取歌手专辑
  */
export const getSingerAlbums = query => {
  return request({
    method: 'GET',
    url: `/artist/album?id=${query.id}&limit=${query.limit}&offset=${query.offset}`
  })
}

/**
  * 获取歌手mv
  */
export const getSingerMVs = id => {
  return request({
    method: 'GET',
    url: `/artist/mv?id=${id}`
  })
}
