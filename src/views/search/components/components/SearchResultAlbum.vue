<template>
  <div ref="resultAlbum">
    <van-list
      v-model="loading"
      :finished="albumFinished"
      finished-text="没有更多了"
      @load="albumUpload"
    >
      <AlbumItem
        v-for="(item, index) in artistAlbums"
        :key="index"
        :index="index"
        :albumName="item.name"
        :artistName="item.artist.name"
        :albumCover="item.picUrl"
        :publishTime="item.publishTime"
        :albumSize="item.size"
      ></AlbumItem>
    </van-list>
  </div>
</template>

<script>
import AlbumItem from '@/components/AlbumItem.vue'
import { getSearchResult } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchResultAlbum',
  components: { AlbumItem },
  props: ['searchText'],
  data () {
    return {
      artistAlbums: [], // 歌手专辑
      loading: false, // 控制专辑列表下拉加载
      albumFinished: false, // 控制专辑列表是否全部加载
      albumOffset: 30, // 专辑下拉偏移量
      scrollTop: 0 // 滚动条距离顶部的距离，因为切换时，要保持这个距离不变
    }
  },
  methods: {
    // 获取专辑列表和上拉加载更多
    async albumUpload () {
      const { data } = await getSearchResult({
        keywords: this.searchText, // 搜索关键字
        type: 10, // 搜索展示类型
        limit: 30, // 每次list请求展示信息数
        offset: this.albumOffset // 偏移量
      })
      this.artistAlbums.push(...data.result.albums)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (data.result.albums) {
        this.albumOffset += 30
      } else {
        this.albumFinished = true
      }
    }
  },
  mounted () {
    const albumList = this.$refs.resultAlbum
    albumList.onscroll = debounce(() => { // 监听滚动事件，debounce防抖
      this.scrollTop = albumList.scrollTop
    }, 50)
  },
  activated () { // 从缓存中激活时,保持之前的滚动条
    this.$refs.resultAlbum.scrollTop = this.scrollTop
  }
}
</script>

<style>

</style>
