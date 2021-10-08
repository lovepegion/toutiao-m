<template>
  <div class="radio-container">
    <!-- 0导航搜索栏 -->
    <Searchbar></Searchbar>
    <!-- 1标题栏 -->
    <Sortbar @onAll="isSearching=!isSearching"></Sortbar>
    <!-- 2频道分类 -->
    <transition name="searchArea" appear>
      <div class="t2_wrap" v-if="isSearching">
        <!-- 2_1频道网格 -->
        <van-grid column-num="5" icon-size="1.4rem" :border="false">
          <!-- 2_1_1普通网格 -->
          <Sortitem
            class="t2_1_1_item"
            v-for="(sort, index) in sorts"
            :key="index"
            :icon="sort.pic84x84IdUrl"
            :text="sort.name"
            @click.native="onSortItem(sort.id)"
          ></Sortitem>
          <!-- 2_1_2推荐网格 -->
          <van-grid-item text="热门推荐" class="t2_1_2_command">
            <van-icon slot="icon" class-prefix="toutiao" name="tuijian" size="1.3rem" color="red"></van-icon>
          </van-grid-item>
        </van-grid>
      </div>
    </transition>
    <!-- 3中间展示区 -->
    <div class="t3_wrap">
      <!-- 3_1标题栏 -->
      <Hotbar></Hotbar>
      <!-- 3_2列表 -->
      <van-cell-group>
        <RadioListItem
          v-for="(hot, index) in hots" :key="index"
          :picUrl="hot.picUrl"
          :programCount="hot.programCount"
          :playCount="hot.playCount"
          :subCount="hot.subCount"
          :name="hot.name"
          :rcmdtext="hot.rcmdtext"
          @click.native="isPopupShow=true;currentProgramId=hot.id"
        ></RadioListItem>
      </van-cell-group>
    </div>
    <!-- 4底部导航栏 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/radio">电台</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/vedio">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
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
import { getRadioSorts, getHotRadios } from '@/api/radio'
import Searchbar from '@/components/Searchbar.vue'
import Sortbar from './components/Sortbar.vue'
import Sortitem from './components/Sortitem.vue'
import Hotbar from './components/Hotbar.vue'
import RadioListItem from '@/components/RadioListItem.vue'
import RadioContent from '@/components/components/RadioContent.vue'
export default {
  name: 'Radio',
  components: { Searchbar, Sortbar, Sortitem, Hotbar, RadioListItem, RadioContent },
  data () {
    return {
      isPopupShow: false, // radio详情弹出框
      sorts: '', // 频道所有分类列表
      hots: '', // 热门频道列表
      isSearching: false, // 控制搜索区域显示动画
      currentProgramId: 0 // 当前电台节目id

    }
  },
  methods: {
    async onRadios () {
      const [sortsRes, hotRes] = await Promise.all([getRadioSorts(), getHotRadios()])
      this.sorts = sortsRes.data.categories
      this.hots = hotRes.data.djRadios
    },
    getBack () {
      this.isPopupShow = false // 取消弹出框
      this.$store.commit('setPlayerBottom', '1.2rem') // 播放器底部回复50px
    },
    // 点击对应分类获取对应内容
    async onSortItem (id) {
      this.isSearching = false
      // const { data } = await getSortProgram(id)
      // console.log('sortprogram', data)
    }
  },
  mounted () {
    this.onRadios()
  }
}
</script>

<style scoped lang="less">
// 2频道分类
.t2_wrap {
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  transform-origin: right top;
  position: fixed;
  top: 90px;
  z-index: 1;
  // 2_1频道网格
  .t2_1_1_item:active, .t2_1_2_command:active {
    transform: scale(0.8);
  }
}
// 3中间展示区
.t3_wrap {
  position: fixed;
  top: 90px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
}

@keyframes showup {
  from { transform: scale(0); }
  to { transform: scale(1); }
}
@keyframes fadeout {
  from { transform: scale(1); }
  to { transform: scale(0); }
}
.searchArea-enter-active {
  animation: showup 0.5s;
}
.searchArea-leave-active {
  animation: fadeout 0.5s;
}

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
