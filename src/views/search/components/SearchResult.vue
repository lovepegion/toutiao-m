<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
  </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      // 1.获取数据
      const { data } = await getSearchResult({
        page: this.page, // 页码
        per_page: this.per_page, // 每页大小
        q: this.searchText // 搜索关键字
      })
      console.log(data)
      // 2.存储数据
      const { results } = data.data
      this.list.push(...results)
      // 3.关闭本次loading
      this.loading = false
      // 4.判断是否还有数据,滚动到底自动触发
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
