<template>
  <div ref="resultSinger">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <UserListItem
        v-for="(item, index) in list"
        :key="index"
        :photoUrl="item.avatarUrl"
        :singerName="item.nickname"
      ></UserListItem>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import UserListItem from '@/components/UserListItem.vue'
import { debounce } from 'lodash'
export default {
  name: 'SearchResultUser',
  components: { UserListItem },
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
      // 1.获取数据
      const { data } = await getSearchResult({
        keywords: this.searchText, // 搜索关键字
        type: 1002, // 搜索展示类型
        limit: 20, // 每次list请求展示信息数
        offset: this.offset // 偏移量
      })
      // 2.存储数据
      this.list.push(...data.result.userprofiles)
      // 3.关闭本次loading
      this.loading = false
      // 4.判断是否还有数据,滚动到底自动触发
      if (data.result.artists) {
        this.offset += 20
      } else {
        this.finished = true
      }
    }
  },
  mounted () {
    const singerList = this.$refs.resultSinger
    singerList.onscroll = debounce(() => { // 监听滚动事件，debounce防抖
      this.scrollTop = singerList.scrollTop
    }, 50)
  },
  activated () { // 从缓存中激活时,保持之前的滚动条
    this.$refs.resultSinger.scrollTop = this.scrollTop
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
