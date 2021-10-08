<template>
  <div class="search-container">
    <!-- 搜索栏,van-search外面套action这样才能在手机输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow=false"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult
      v-if="isResultShow"
      :searchText="searchText"
    ></SearchResult>
    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></SearchSuggestion>
    <!-- 历史记录 -->
    <SearchHistory
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
      @updateHistories="searchHistories=$event"
    ></SearchHistory>
  </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion'
import SearchHistory from './components/SearchHistory'
import SearchResult from './components/SearchResult'
import { setItem, getItem } from '@/utils/storage'
// import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'Search',
  components: { SearchSuggestion, SearchHistory, SearchResult },
  data () {
    return {
      searchText: '', // 搜索框内容
      isResultShow: false, // 控制搜索结果显示
      searchHistories: [] // 搜索历史记录
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories () {
      setItem('searchHistories', this.searchHistories)
    }
  },
  methods: {
    onSearch (searchText) {
      this.searchText = searchText
      const index = this.searchHistories.indexOf(searchText)
      if (index > -1) { // 删除重复项
        this.searchHistories.splice(index, 1)
      }

      // 记录搜索历史
      this.searchHistories.unshift(searchText)

      // 如果用户登录，后端自动存储历史记录
      // 未登录，本地存储,下面代码可以直接用watch监视
      // setItem('searchHistories', this.searchHistories)

      // 展示搜索结果
      this.isResultShow = true
    },
    onCancel () {
      console.log('onCancel事件')
    },
    async loadSearchHistories () {
      // 将线上历史记录和本地历史记录合并到一起
      const searchHistories = getItem('searchHistories') || []
      // 因为线上接口不能删除单个历史记录，这里就先不用线上的历史记录
      /* if (this.user) {
        const { data } = await getSearchHistories()
        console.log(data)
        searchHistories = [...new Set([...searchHistories, ...data.data.keywords])] // 利用集合实现数组合并去重
      } */
      this.searchHistories = searchHistories
    }
  },
  mounted () {
    this.$store.commit('addCachePages', 'Search') // 缓存Search组件
  },
  created () {
    this.loadSearchHistories()
  }
}
</script>

<style scoped lang="less">

</style>
