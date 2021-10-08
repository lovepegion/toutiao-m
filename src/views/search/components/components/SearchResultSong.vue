<template>
  <div class="SearchResultSong-wrap" ref="resultSong">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <MusicItem
        v-for="(track, index) in list"
        :key="index"
        :trackIndex="index"
        :trackName="track.name"
        :artistName="track.artists[0].name"
        :albumName="track.album.name"
        :trackId="track.id"
      ></MusicItem>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import MusicItem from '@/components/MusicItem.vue'
import { debounce } from 'lodash'
export default {
  name: 'SearchResultSong',
  components: { MusicItem },
  props: ['searchText'],
  data () {
    return {
      list: [], // 搜索的歌曲结果
      loading: false,
      finished: false,
      offset: 0, // 搜索结果偏移量
      scrollTop: 0 // 滚动条距离顶部距离
    }
  },
  methods: {
    async onLoad () {
      // 1.获取数据
      const { data } = await getSearchResult({
        keywords: this.searchText, // 搜索关键字
        type: 1, // 搜索展示类型
        limit: 2, // 每次list请求展示信息数
        offset: this.offset // 偏移量
      })
      // 2.存储数据
      const results = data.result.songs
      this.list.push(results[0], results[1])
      // 3.关闭本次loading
      this.loading = false
      // 4.判断是否还有数据,滚动到底自动触发
      if (results) {
        this.offset += 2
      } else {
        this.finished = true
      }
    }
  },
  mounted () {
    const songList = this.$refs.resultSong
    songList.onscroll = debounce(() => { // 监听滚动事件，debounce防抖
      this.scrollTop = songList.scrollTop
    }, 50)
  },
  activated () { // 从缓存中激活时,保持之前的滚动条
    this.$refs.resultSong.scrollTop = this.scrollTop
  }
}
</script>

<style scoped lang="less">
// .SearchResultSong-wrap {
//   position: fixed;
//   left: 0;
//   right: 0;
//   top: 54px;
//   bottom: 0;
//   overflow-y: auto;
// }
</style>
