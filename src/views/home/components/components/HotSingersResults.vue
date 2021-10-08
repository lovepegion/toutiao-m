<template>
  <div class="results-wrap">
    <!-- 0搜索结果列表 -->
    <van-grid :column-num="5" class="result-grid">
      <van-grid-item v-for="artist in artists" :key="artist.id" @click="onPopup(artist)">
        <van-icon slot="icon" size="40px" :name="artist.img1v1Url" />
        <div slot="text" class="text-slot">{{artist.name}}</div>
      </van-grid-item>
    </van-grid>
    <!-- 1分页按钮 -->
    <van-pagination
      v-model="currentPage"
      :total-items="125"
      :show-page-size="6"
      force-ellipses
      class="page-wrap"
      @change="onPageChange"
    >
      <template #prev-text><van-icon name="arrow-left" /></template>
      <template #next-text><van-icon name="arrow" /></template>
    </van-pagination>
    <!-- 2歌手详情弹出框 -->
    <van-popup
      v-model="isPopupShow"
      get-container="#popup"
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 顶部返回栏 -->
      <van-icon name="arrow-left" class="t2_leftarrow" color="#dddddd" size="50" @click="onBack"></van-icon>
      <HotSingersResultsItem :currentArtist="currentSinger" v-if="isPopupShow"></HotSingersResultsItem>
    </van-popup>
  </div>
</template>

<script>
import { getSingersSearch } from '@/api/singers.js'
import HotSingersResultsItem from './components/HotSingersResultsItem.vue'
export default {
  name: 'HotSingersResults',
  components: { HotSingersResultsItem },
  props: ['searchData'],
  data () {
    return {
      isPopupShow: false, // 控制歌手详情弹出框
      currentSinger: '', // 当前选中歌手
      currentPage: 1, // 搜索结果的当前页码
      queryData: { // 发送给服务器的数据
        limit: 20,
        offset: 0,
        ...this.searchData
      },
      artists: [] // 搜索结果
    }
  },
  methods: {
    // 获取搜索结果
    async loadSingersSearch () {
      const { data } = await getSingersSearch(this.queryData)
      console.log(data)
      this.artists = data.artists
    },
    // 点击搜索结果分页
    onPageChange () {
      this.queryData.offset = (this.currentPage - 1) * 20
      this.loadSingersSearch()
    },
    // 点击歌手弹出框
    onPopup (artist) {
      this.isPopupShow = true
      this.currentSinger = artist
      this.$store.commit('setPlayerBottom', 0)
    },
    // 退出歌手详情弹出框
    onBack () {
      this.isPopupShow = false
      this.$store.commit('setPlayerBottom', '1.2rem')
    }
  },
  mounted () {
    this.loadSingersSearch() // 加载搜索结果
  }
}
</script>

<style scoped lang="less">
.results-wrap {
  .text-slot {
    height: 19px;
    width: 60px;
    font-size: 14px;
    overflow: hidden;
  }
  /deep/.van-grid {
    .van-grid-item {
      .van-grid-item__content {
        padding: 10px 0 5px;
      }
    }
  }
}
.page-wrap {
  margin-top: 6px;
}
// 2弹出框
.t2_leftarrow {
  position: fixed;
  z-index: 2228;
}
</style>
