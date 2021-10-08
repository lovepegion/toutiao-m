<template>
  <div class="hotsinger-container">
    <!-- 0按字母搜索 -->
    <HotSingersWordsearch @getInitial="searchData.initial=$event"></HotSingersWordsearch>
    <!-- 1按地区搜索 -->
    <HotSingersAreasearch @getArea="searchData.area=$event"></HotSingersAreasearch>
    <!-- 2按type搜索 -->
    <HotSingersTypesearch @getType="searchData.type=$event"></HotSingersTypesearch>
    <!-- 3搜索按钮 -->
    <div class="search-button-wrap">
      <van-button type="primary" @click="onSearch">搜索</van-button>
    </div>
    <!-- 4搜索展示区 -->
    <transition name="resultwrap">
      <HotSingersResults
        v-if="isSearchingShow"
        class="result-wrap"
        :searchData="searchData"
      ></HotSingersResults>
    </transition>
  </div>
</template>

<script>
import HotSingersResults from './components/HotSingersResults.vue'
import HotSingersWordsearch from './components/HotSingersWordsearch.vue'
import HotSingersAreasearch from './components/HotSingersAreasearch.vue'
import HotSingersTypesearch from './components/HotSingersTypesearch.vue'
export default {
  name: 'HotSingers',
  components: { HotSingersResults, HotSingersWordsearch, HotSingersAreasearch, HotSingersTypesearch },
  data () {
    return {
      areaActive: 0,
      typeActive: 0,
      isSearchingShow: false, // 是否展示所属结果区域
      searchData: { // 传给子组件用于向服务器获取数据
        initial: -1,
        area: -1,
        type: -1
      }
    }
  },
  computed: {
    alphabet () { // 生成字母表数组
      const tempArray = []
      for (let i = 0; i < 27; i++) {
        tempArray.push(String.fromCharCode(64 + i))
      }
      return tempArray
    }
  },
  methods: {
    onSearch () {
      if (this.isSearchingShow === false) this.isSearchingShow = true
      else {
        this.isSearchingShow = false
        setTimeout(() => {
          this.$nextTick(() => {
            this.isSearchingShow = true
          })
        }, 800)
      }
    }
  },
  mounted () {
    this.onSearch()
  }
}
</script>

<style scoped lang="less">
.search-button-wrap {
  position: fixed;
  right: 15px;
  top: 178px;
}
.result-wrap {
  position: relative;
  height: 375px;
  margin: 0 5px;
}
.resultwrap-enter, .resultwrap-leave-to {
  bottom: -375px;
}
.resultwrap-enter-active, .resultwrap-leave-active {
  transition: 0.5s;
}
.resultwrap-enter-to, .resultwrap-leave {
  bottom: 0;
}
</style>
