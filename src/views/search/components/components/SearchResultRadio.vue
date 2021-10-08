<template>
  <div ref="resultRadio">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <RadioListItem
        v-for="(item, index) in list"
        :key="index"
        :picUrl="item.picUrl"
        :programCount="item.programCount"
        :playCount="item.playCount"
        :subCount="item.subCount"
        :name="item.name"
        :rcmdtext="item.rcmdText"
        @click.native="currentProgramId=item.id;isPopupShow=true"
      ></RadioListItem>
    </van-list>
    <!-- 5电台详情弹出框 -->
    <van-popup
      v-model="isPopupShow"
      get-container="#popup"
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 5_1顶部返回栏 -->
      <div style="height:46px;width:100%;position:relative">
        <div style="position:fixed;top:0;right:0;left:0;zIndex:2022">
          <van-nav-bar
            left-text="返回"
            left-arrow
            @click-left="getBack"
            :border="false"
            class="t5_goback"
          >
            <van-icon name="search" size="18" color="#fff" slot="right" />
          </van-nav-bar>
        </div>
      </div>
      <!-- 5_2弹出框主内容 -->
      <transition name="fade">
        <RadioContent :currentProgramId="currentProgramId" v-if="isPopupShow"></RadioContent>
      </transition>
    </van-popup>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import RadioListItem from '@/components/RadioListItem.vue'
import RadioContent from '@/components/components/RadioContent.vue'
import { debounce } from 'lodash'
export default {
  name: 'SearchResultRadio',
  components: { RadioListItem, RadioContent },
  props: ['searchText'],
  data () {
    return {
      list: [], // 搜索的歌曲结果
      loading: false,
      finished: false,
      offset: 0, // 搜索结果偏移量
      scrollTop: 0, // 滚动条距离顶部距离,
      currentProgramId: 0, // 当前点击的program的id
      isPopupShow: false // 弹出电台内容框
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getSearchResult({
        keywords: this.searchText, // 搜索关键字
        type: 1009, // 搜索展示类型
        limit: 10, // 每次list请求展示信息数
        offset: this.offset // 偏移量
      })
      console.log('radio', data)
      this.list.push(...data.result.djRadios)
      this.finished = true
    },
    getBack () {
      this.isPopupShow = false // 取消弹出框
      this.$store.commit('setPlayerBottom', '1.2rem') // 播放器底部回复50px
    }
  },
  mounted () {
    const radioList = this.$refs.resultRadio
    radioList.onscroll = debounce(() => { // 监听滚动事件，debounce防抖
      this.scrollTop = radioList.scrollTop
    }, 50)
  },
  activated () { // 从缓存中激活时,保持之前的滚动条
    this.$refs.resultRadio.scrollTop = this.scrollTop
  }
}
</script>

<style scoped lang="less">
// 5弹出框
.t5_goback {
  background-color: rgb(146, 143, 143);
  /deep/.van-icon {
    color: #fff;
  }
  /deep/.van-nav-bar__text {
    color: #fff;
  }
}
// ClassifyItem消失的过渡动画
.fade-leave {
  top: 0;
}
.fade-leave-active {
  transition: 1s;
}
.fade-leave-to {
  top: 700px;
}
</style>
