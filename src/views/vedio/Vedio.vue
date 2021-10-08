<template>
<div>
  <!-- 0搜索栏 -->
  <Searchbar></Searchbar>
  <!-- 1视频分类标题栏 -->
  <div class="t1_wrap">
    <!-- 1_0当前分类标题 -->
    <span style="fontWeight:bold">{{currentGroupTitle}}</span>
    <!-- 1_1全部分类 -->
    <div @click="isSearching=!isSearching">
      <span>全部分类</span>
      <van-icon class-prefix="toutiao" name="quanbu" size="0.4rem" />
    </div>
  </div>
  <div class="contentwrap">
    <!-- 2搜索区 -->
    <transition name="searchArea" appear>
      <div class="t2_wrap" v-if="isSearching">
      <van-grid :column-num="6">
        <van-grid-item v-for="(item, index) in groupList" :key="index" :text="item.name" />
      </van-grid>
    </div>
    </transition>
    <!-- 3展示区 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell v-for="(item, index) in 20" :key="index" :title="'接口地址已改变'" />
    </van-list>
  </div>
  <!-- 4底部导航栏 -->
  <van-tabbar route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="comment-o" to="/radio">电台</van-tabbar-item>
    <van-tabbar-item icon="video-o" to="/vedio">视频</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
import Searchbar from '@/components/Searchbar.vue'
import { getGroupVedio } from '@/api/vedio.js'
export default {
  name: 'Vedio',
  components: { Searchbar },
  data () {
    return {
      isSearching: false, // 控制搜索区域显示动画
      currentGroupTitle: '推荐', // 当前分类标题
      list: [1, 2, 3], // 展示的列表
      loading: false, // 下拉加载
      finished: true, // 全部加载完
      offset: 0, // 数据偏移量
      currentGroup: { id: 58100, name: '现场' }, // 当前标签
      groupList: [ // 视频标签列表精选
        // { id: 58100, name: '现场' },
        // { id: 1101, name: '舞蹈' },
        { id: 58101, name: '听BGM' },
        // { id: 1000, name: 'MV' },
        { id: 2100, name: '生活' },
        { id: 2103, name: '游戏' },
        { id: 57104, name: 'ACG音' },
        { id: 1103, name: '萌宠' },
        { id: 9102, name: '演唱会' },
        { id: 57105, name: '粤语现场' },
        { id: 59101, name: '华语现场' },
        { id: 57106, name: '欧美现场' },
        { id: 57107, name: '韩语现场' },
        { id: 60101, name: '日语现场' },
        { id: 3110, name: '宅舞' },
        { id: 3109, name: '街舞' },
        { id: 10161, name: '民族舞' },
        { id: 57116, name: '舞蹈教程' },
        { id: 58113, name: '舞蹈表演' },
        { id: 58114, name: '舞蹈现场' },
        { id: 59118, name: '古典舞' },
        { id: 57118, name: '中国风' },
        { id: 59119, name: 'ACG' },
        { id: 58112, name: 'MMD' },
        { id: 57115, name: '动漫音乐' },
        { id: 59114, name: 'GMV' },
        // { id: 59115, name: '动漫混剪' },
        { id: 3107, name: '混剪' },
        { id: 9107, name: 'COS' },
        { id: 4108, name: '动漫' },
        { id: 3102, name: '二次元' },
        { id: 4101, name: '娱乐' },
        { id: 3100, name: '影视' },
        { id: 3101, name: '综艺' }
      ]
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getGroupVedio({
        id: this.currentGroup.id,
        offset: this.offset
      })
      console.log('livevedio', data)
    }
  }
}
</script>

<style scoped lang="less">
// 1视频分类标题栏
.t1_wrap {
  width: 100%;
  font-size: 14px;
  box-sizing: border-box;
  padding: 0 10px;
  background-color: #fff;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}
// 搜索区和展示区需要固定
.contentwrap {
  position: fixed;
  top: 70px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
// 2搜索区
.t2_wrap {
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.5);
  transform-origin: right top;
  position: fixed;
  top: 70px;
  z-index: 1;
  /deep/.van-grid-item__content { // 每个搜索单元格
    padding: 6px 4px;
    font-size: 10px;
  }
  /deep/.van-grid-item__content:active {
    transform: scale(0.9);
    background-color: #ccc;
  }
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
</style>
