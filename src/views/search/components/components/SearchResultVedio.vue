<template>
  <div ref="resultVedio">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" :key="index">
        <VedioListItem
          v-if="item.playUrl"
          :key="index"
          :userId="item.creator[0].userId"
          :userName="item.creator[0].userName"
          :vedioTitle="item.title"
          :playUrl="item.playUrl"
          :playCount="item.playTime"
          :duration="item.durationms"
          :scrollTop="scrollTop"
          :vid="item.vid"
        ></VedioListItem>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import { getVedioUrl } from '@/api/vedio.js'
import VedioListItem from '@/components/VedioListItem.vue'
import { debounce } from 'lodash'
export default {
  name: 'SearchResultVedio',
  components: { VedioListItem },
  props: ['searchText'],
  data () {
    return {
      list: [], // 搜索歌手结果列表
      loading: false,
      finished: false,
      offset: 0,
      scrollTop: 0 // 滚动条距离顶部距离
    }
  },
  methods: {
    async onLoad () {
      // 1.获取vedios详情
      const { data } = await getSearchResult({
        keywords: this.searchText, // 搜索关键字
        type: 1014, // 搜索展示类型
        limit: 10, // 每次list请求展示信息数
        offset: this.offset // 偏移量
      })
      // 获取vedio播放地址,并将地址就存储在vedios中
      const vedios = data.result.videos
      for (let i = 0; i < vedios.length; i++) {
        const { data: urlData } = await getVedioUrl(vedios[i].vid)
        if (urlData.urls.length) vedios[i].playUrl = urlData.urls[0].url
        else vedios[i].playUrl = ''
      }
      // // 2.存储数据
      this.list.push(...vedios)
      // 3.关闭本次loading
      this.loading = false
      // 4.判断是否还有数据,滚动到底自动触发
      if (vedios.length) {
        this.offset += 10
      } else {
        this.finished = true
      }
    }
  },
  mounted () {
    const vedioList = this.$refs.resultVedio
    vedioList.onscroll = debounce(() => { // 监听滚动事件，debounce防抖
      this.scrollTop = vedioList.scrollTop
    }, 50)
  },
  activated () { // 从缓存中激活时,保持之前的滚动条
    this.$refs.resultVedio.scrollTop = this.scrollTop
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
