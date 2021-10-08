<template>
  <div class="article-list" ref="articleList">
    <!-- 0中间展示区用下拉刷新包裹 -->
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @load="onLoad"
      @refresh="onRefresh"
    >
      <!-- 0_1中间展示列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <!-- 0_1_1列表中的每一项 -->
        <DailyRecommandItem
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
          @getCurrentPlayItem="changeSong(article)"
        ></DailyRecommandItem>
        <!-- <van-cell v-for="(article, index) in articles" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getDailyRecommands } from '@/api/article'
import DailyRecommandItem from './components/DailyRecommandItem.vue'
import { debounce } from 'lodash'

export default {
  name: 'DailyRecommand',
  components: { DailyRecommandItem },
  data () {
    return {
      articles: [], // 全部推荐歌曲
      loading: false,
      finished: false,
      isRefreshLoading: false, // 控制下拉刷新
      refreshSuccessText: '',
      scrollTop: 0 // 滚动条距离顶部的距离，因为切换时，要保持这个距离不变
    }
  },
  methods: {
    // 获取推荐歌曲
    async onLoad () {
      // 1. 请求数据
      try {
        const { data } = await getDailyRecommands()
        console.log(data)
        // 2.把数据放到article数组中
        const results = data.data.slice(0, 20) // 返回了100条数据，只要前10条
        this.articles.push(...results) // 得到的results是数组
        // 3.设置本次加载状态结束，它才可以判断是否进行下次加载，否则一直停在这
        this.loading = false
        // 4.数据全部加载完成,控制上拉加载更多
        if (results.length) {
          this.finished = true
        }
      } catch (err) {
        console.log('获取推荐歌曲失败', err)
      }
    },
    // 下拉刷新推荐歌曲
    async onRefresh () {
      // 1.请求数据
      const { data } = await getDailyRecommands()
      // 2.将数据放到数据列表顶部
      const results = data.data.slice(0, 10) // 返回了100条数据，只要前10条
      this.articles.unshift(...results)
      // 3.关闭刷新状态
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  },
  mounted () {
    this.onLoad() // 加载推荐歌曲
    const articleList = this.$refs.articleList
    articleList.onscroll = debounce(() => { // 监听滚动事件，debounce防抖
      this.scrollTop = articleList.scrollTop
    }, 50)
  },
  activated () { // 从缓存中激活时,保持之前的滚动条
    this.$refs.articleList.scrollTop = this.scrollTop
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
