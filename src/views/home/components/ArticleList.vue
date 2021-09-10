<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        ></ArticleItem>
        <!-- <van-cell v-for="(article, index) in articles" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/ArticleItem/'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isRefreshLoading: false, // 控制下拉刷新
      refreshSuccessText: ''
    }
  },
  methods: {
    async onLoad () {
      // 1. 请求数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        timestamp: this.timestamp || Date.now(), //
        with_top: 1 // 进入页面第一次请求时，是否包含置顶文章，1是，0否
      })

      // 2.把数据放到article数组中
      const { results } = data.data
      this.articles.push(...results) // 得到的results是数组

      // 3.设置本次加载状态结束，它才可以判断是否进行下次加载，否则一直停在这
      this.loading = false

      // 4.数据全部加载完成,控制上拉加载更多
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      // 1.请求数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(), // 下拉刷新请求最新的数据
        with_top: 1
      })
      // 2.将数据放到数据列表顶部
      const { results } = data.data
      this.articles.unshift(...results)
      // 3.关闭刷新状态
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}
</style>
