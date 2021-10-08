<template>
  <div class="search-result">
    <van-tabs v-model="active" @click="onTag">
      <!-- 0左侧"结果"占位符 -->
      <button disabled slot="nav-left" class="t0-hold">结果</button>
      <!-- 1搜索结果 -->
      <van-tab
        v-for="(resultTag, index) in resultTags" :key="index"
        :title="resultTag.tag"
      >
        <!-- 1_1搜索结果按标签展示 -->
        <keep-alive>
          <component
            class="t1_1-tagcontent"
            :is="currentComponent"
            :searchText="searchText"
          ></component>
        </keep-alive>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import SearchResultSong from './components/SearchResultSong.vue'
import SearchResultAlbum from './components/SearchResultAlbum.vue'
import SearchResultClassify from './components/SearchResultClassify.vue'
import SearchResultLyric from './components/SearchResultLyric.vue'
import SearchResultMv from './components/SearchResultMv.vue'
import SearchResultRadio from './components/SearchResultRadio.vue'
import SearchResultSinger from './components/SearchResultSinger.vue'
import SearchResultUser from './components/SearchResultUser.vue'
import SearchResultVedio from './components/SearchResultVedio.vue'
export default {
  name: 'SearchResult',
  components: { SearchResultSong, SearchResultAlbum, SearchResultClassify, SearchResultLyric, SearchResultMv, SearchResultRadio, SearchResultSinger, SearchResultUser, SearchResultVedio },
  props: ['searchText'],
  data () {
    return {
      resultTags: [
        { tag: '单曲', component: 'SearchResultSong' },
        { tag: '专辑', component: 'SearchResultAlbum' },
        { tag: '歌手', component: 'SearchResultSinger' },
        { tag: '歌单', component: 'SearchResultClassify' },
        { tag: '用户', component: 'SearchResultUser' },
        { tag: 'MV', component: 'SearchResultMv' },
        { tag: '歌词', component: 'SearchResultLyric' },
        { tag: '电台', component: 'SearchResultRadio' },
        { tag: '视频', component: 'SearchResultVedio' }
      ], // 搜索结果标签
      active: 0, // 单签标签索引
      currentComponent: 'SearchResultSong' // 单签展示的搜索结果标签
    }
  },
  methods: {
    onTag (tagIndex) {
      this.currentComponent = this.resultTags[tagIndex].component
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
// 0左侧"结果"占位符
.t0-hold {
  flex-shrink: 0;
  font-size: 14px;
  height: 44px;
  width: 52px;
  border: none;
  background-color: #ccc;
  border-radius: 5px;
}
// 1_1搜索结果按标签展示
.t1_1-tagcontent {
  position: fixed;
  top: 106px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
}
</style>
