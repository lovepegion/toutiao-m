<template>
  <div ref="resultMv">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <van-grid :column-num="2">
          <MvItem v-for="(subItem, subIndex) in item"
          :key="subIndex"
          :cover="subItem.cover"
          :playCount="subItem.playCount"
          :duration="subItem.duration"
          :singerName="subItem.artistName"
          :singerPhoto="subItem.cover"
          :mvName="subItem.name"
          :uid="subItem.artists[0].id"
          :vid="subItem.id"
          />
        </van-grid>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import MvItem from '@/components/MvItem.vue'
import { getSearchResult } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchResultMv',
  components: { MvItem },
  props: ['searchText'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: 0,
      scrollTop: 0
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getSearchResult({
        keywords: this.searchText,
        type: 1004,
        limit: 10,
        offset: this.offset
      })
      console.log('mv', data)
      for (let i = 0; i < data.result.mvs.length / 2; i++) {
        this.list.push(data.result.mvs.slice(2 * i, 2 * (i + 1)))
      }
      this.loading = false
      if (data.result.mvs) {
        this.offset += 10
      } else {
        this.finished = true
      }
    }
  },
  mounted () {
    const mvList = this.$refs.resultMv
    mvList.onscroll = debounce(() => { // 监听滚动事件，debounce防抖
      this.scrollTop = mvList.scrollTop
    }, 50)
  },
  activated () { // 从缓存中激活时,保持之前的滚动条
    this.$refs.resultMv.scrollTop = this.scrollTop
  }
}
</script>

<style scoped lang="less">

</style>
