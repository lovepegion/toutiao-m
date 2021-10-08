<template>
  <div ref="resultClassify">
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <ClassifyListItem
      v-for="(item, index) in list"
      :key="index"
      :cover="item.coverImgUrl"
      :classifyName="item.name"
      :classifySize="item.trackCount"
      :creatorName="item.creator.nickname"
      :playCount="item.playCount"
    ></ClassifyListItem>
  </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ClassifyListItem from '@/components/ClassifyListItem.vue'
import { debounce } from 'lodash'
export default {
  name: 'SearchResultClassify',
  components: { ClassifyListItem },
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
      const { data } = await getSearchResult({
        keywords: this.searchText, // 搜索关键字
        type: 1000, // 搜索展示类型
        limit: 30, // 每次list请求展示信息数
        offset: this.offset // 偏移量
      })
      console.log('classify', data)
      this.list.push(...data.result.playlists)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (data.result.playlists) {
        this.offset += 30
      } else {
        this.finished = true
      }
    }
  },
  mounted () {
    const classiyList = this.$refs.resultClassify
    classiyList.onscroll = debounce(() => { // 监听滚动事件，debounce防抖
      this.scrollTop = classiyList.scrollTop
    }, 50)
  },
  activated () { // 从缓存中激活时,保持之前的滚动条
    this.$refs.resultClassify.scrollTop = this.scrollTop
  }
}
</script>

<style scoped lang="less">

</style>
