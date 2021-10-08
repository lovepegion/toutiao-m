<template>
  <div class="mv-container">
    <!-- 1搜索区 -->
    <div class="t1_wrap">
      <!-- 1_1按地区搜索 -->
      <Mvareasearch @getArea="searchData.area=$event"></Mvareasearch>
      <!-- 1_2按类型搜索 -->
      <Mvtypesearch @getType="searchData.type=$event"></Mvtypesearch>
      <!-- 1_3搜索排序 -->
      <Mvsortorder @getOrder="searchData.order=$event"></Mvsortorder>
      <!-- 1_4搜索按钮 -->
      <div class="t1_4_wrap">
        <van-button type="primary" @click="onSearch">搜索</van-button>
      </div>
    </div>
    <!-- 2推荐的mv -->
    <div v-if="!isSearching">
      <!-- 2_1标题栏 -->
      <Mvhotbar></Mvhotbar>
      <!-- 2_2推荐列表 -->
      <div class="t2_2_wrap">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onHotMvs"
        >
          <van-cell v-for="(mvs, indx) in hotMvs" :key="indx">
            <div slot="title">
              <van-grid :column-num="2" icon-size="150" :border="false">
                <MvItem
                  v-for="(mv, index) in mvs"
                  :key="index"
                  :index="index"
                  :cover="mv.cover"
                  :playCount="mv.playCount"
                  :duration="mv.duration"
                  :mvName="mv.name"
                  :singerName="mv.artistName"
                  :singerPhoto="''"
                  :uid="mv.artists[0].id"
                  :vid="mv.id"
                ></MvItem>
              </van-grid>
            </div>
          </van-cell>
        </van-list>
      </div>
    </div>
    <!-- 3搜索获取的mv -->
    <div class="t3_wrap" v-if="isSearching">
      <!-- 3_1标题栏 -->
      <Mvsearchresultbar
        @close="isSearching=false"
        :resultData="resultData"
        class="t3_1_title"
      ></Mvsearchresultbar>
      <!-- 3_2搜索结果列表 -->
      <div class="t3_2_wrap" v-if="sortRemain">
        <van-list
          v-model="sortLoading"
          :finished="sortFinished"
          finished-text="没有更多了"
          @load="onSortMvs"
        >
          <van-cell v-for="(mvs, indx) in resultMvs" :key="indx">
            <div slot="title">
              <van-grid :column-num="2" icon-size="150" :border="false">
                <MvItem
                  v-for="(mv, index) in mvs"
                  :key="index"
                  :index="index"
                  :cover="mv.cover"
                  :playCount="mv.playCount"
                  :duration="mv.duration"
                  :mvName="mv.name"
                  :singerName="mv.artistName"
                  :singerPhoto="''"
                  :uid="mv.artists[0].id"
                  :vid="mv.id"
                ></MvItem>
              </van-grid>
            </div>
          </van-cell>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import Mvareasearch from './components/Mvareasearch.vue'
import Mvtypesearch from './components/Mvtypesearch.vue'
import Mvsortorder from './components/Mvsortorder.vue'
import Mvhotbar from './components/Mvhotbar.vue'
import MvItem from '@/components/MvItem.vue'
import Mvsearchresultbar from './components/Mvsearchresultbar.vue'
import { getHotMvs, getSortMvs } from '@/api/mv.js'
export default {
  name: 'Mv',
  components: { Mvareasearch, Mvtypesearch, Mvsortorder, Mvhotbar, MvItem, Mvsearchresultbar },
  data () {
    return {
      loading: false, // 推荐列表的loading状态
      finished: false, // 是否全部加载
      limit: 10, // 一次获取推荐mv的数量
      offset: 0, // 获取推荐数据的偏移量
      hotMvs: [], // 推荐的mv数据，两个一组，便于展示
      isSearching: false, // 是否展示搜索结果
      sortRemain: true, // 控制搜索结果列表，按下搜索键时让列表清空，并从新加载
      sortLoading: false, // 搜索结果列表的loading状态
      sortFinished: false, // 搜索结果是否全部加载
      searchData: { // 存储搜索条件
        area: '全部',
        type: '全部',
        order: '全部',
        limit: 10,
        offset: 0
      },
      resultData: { // searchData的副本，点击搜索按钮后，才传给搜索标题栏显示新的搜索条件，而不是自己动态改变
        area: '全部',
        type: '全部',
        order: '全部'
      },
      resultMvs: [] // 搜索结果的mv列表
    }
  },
  methods: {
    // 加载函数，用于初始加载和上拉加载更多
    async onHotMvs () {
      const { data } = await getHotMvs({ // 获取数据
        limit: this.limit,
        offset: this.offset * this.limit
      })
      const datalist = data.data

      for (let i = 0; i < datalist.length / 2; i++) { // 将数据每两个一组存储到data中
        this.hotMvs.push(datalist.slice(2 * i, 2 * (i + 1)))
      }

      this.offset++ // 偏移量加1，为上拉获取更多做准备

      this.loading = false // 加载状态结束

      if (!datalist.length) { // 数据全部加载完成
        this.finished = true
      }
    },
    onSearch () {
      this.isSearching = true // 显示搜索结果区域
      this.resultMvs = [] // 清空之前的搜索结果
      this.sortRemain = false
      this.$nextTick(() => {
        this.sortRemain = true
      })
      // 改变标题显示的搜索条件
      this.resultData.area = this.searchData.area // 不能直接将searchData赋值给resultData这样会赋值响应性,自动变化
      this.resultData.type = this.searchData.type
      this.resultData.order = this.searchData.order
    },
    async onSortMvs () {
      console.log('onSortMvs')
      const { data } = await getSortMvs(this.searchData)
      const datalist = data.data
      console.log('search', datalist)

      for (let i = 0; i < datalist.length / 2; i++) { // 将数据每两个一组存储到data中
        this.resultMvs.push(datalist.slice(2 * i, 2 * (i + 1)))
      }

      this.searchData.offset += 10 // 偏移量加1，为上拉获取更多做准备

      this.sortLoading = false // 加载状态结束

      if (!datalist.length) { // 数据全部加载完成
        this.sortFinished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
// 1搜索区
.t1_wrap{
  position: relative;
  /deep/.van-tab {
    padding: 0 0 0 5px !important;
  }
  // 1_4搜索按钮
  .t1_4_wrap {
    margin-right: 15px;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
// 2推荐的mv
.t2_2_wrap { // 列表区需要固定
    position: fixed;
    top: 260px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}
// 3搜索获取的mv
.t3_wrap {
  position: fixed;
  top: 215px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
  .t3_1_title {
    position: fixed;
    z-index: 1;
  }
  // 3_2搜索结果列表
  .t3_2_wrap {
    margin-top: 40px;
  }
}
.t3trans-enter, .t3trans-leave-to { // transition过渡
  top: 670px;
}
.t3trans-enter-active, .t3trans-leave-active {
  transition: 0.5s;
}
.t3trans-enter-to, .t3trans-leave {
  top: 175px;
}
</style>
