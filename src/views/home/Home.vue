<template>
  <div class="home-container">
    <!-- 0导航搜索栏 -->
    <Searchbar></Searchbar>
    <!-- 1文章频道列表栏 -->
    <van-tabs v-model="listActive" :ellipsis='false' :border="false">
      <!-- 1_1频道列表 -->
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <component :is="channel.component"></component>
      </van-tab>
      <!-- 1_2汉堡按钮下的占位空格 -->
      <div slot="nav-right" class="t1_2_roomhold"></div>
      <!-- 1_3汉堡按钮 -->
      <div slot="nav-right" class="t1_3_wrap">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 2底部导航栏 -->
    <van-tabbar v-model="tabActive" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/radio">电台</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/vedio">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar.vue'
import DailyRecommand from './components/DailyRecommand.vue'
import HotClassify from './components/HotClassify.vue'
import HotSingers from './components/HotSingers.vue'
import HotTop from './components/HotTop.vue'
import Mv from './components/Mv.vue'
export default {
  name: 'Home',
  components: { Searchbar, DailyRecommand, HotClassify, HotSingers, HotTop, Mv },
  data () {
    return {
      listActive: 0, // 频道列表选中项目
      tabActive: 0, // 底部导航栏选中项
      channels: [ // 频道列表
        { id: 1, name: '每日推荐', component: 'DailyRecommand' },
        { id: 2, name: '歌单分类', component: 'HotClassify' },
        { id: 3, name: '热门歌手', component: 'HotSingers' },
        { id: 4, name: '热门排行', component: 'HotTop' },
        { id: 5, name: '热门MV', component: 'Mv' }
      ]
    }
  },
  mounted () {
    this.$store.commit('addCachePages', 'Home') // 缓存Home组件
  },
  activated () {
    this.$store.commit('setPlayerBottom', '1.2rem') // 调整音乐播放器高度
  },
  deactivated () {
    this.$store.commit('setPlayerBottom', '-0.133rem') // 恢复播放器高度到底部
  }
  /* computed: {
    ...mapState(['user'])
  } */
}
</script>

<style scoped lang="less">
// 1文章频道列表栏
/deep/ .van-nav-bar__title {
  max-width: none;
}
/deep/.van-tab {
  padding: 0 25px;
}
/deep/.van-tabs__line {
  width: 15px;
  height: 3px;
  background-color: #3296fa;
  bottom: 20px;
}
// 1_2汉堡按钮下的占位空格
.t1_2_roomhold {
  width: 33px;
  flex-shrink: 0; // 保持自身宽度，不参与flex空间分配
}
// 1_3汉堡按钮
.t1_3_wrap {
  position: fixed;
  right: 0;
  width: 33px;
  height: 43px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
  opacity: 0.9;
  .van-icon {
    font-size: 22px;
  }
}
</style>
