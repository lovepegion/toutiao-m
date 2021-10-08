<template>
  <div class="channel-edit" :border="false">
  <!-- 0网友推荐 -->
    <!-- 标题-精品推荐 -->
    <van-cell center class="jingpin">
      <div slot="title" class="channel-title">精品推荐</div>
      <van-button size="mini" round class="more-button">更多></van-button>
    </van-cell>
    <!-- 推荐歌单列表 -->
    <van-tabs class="channel-tabs" v-model="netActive" line-width="0" @click="getCurrenRecommand">
      <van-tab
        v-for="(recommand, index) in netRecommands"
        :key="index"
        class="tab-item"
      >
      <div slot="title">
        <van-image
          width="80"
          height="80"
          :src="recommand.coverImgUrl"
        />
        <div class="recommand-name">{{recommand.name}}</div>
      </div>
      </van-tab>
    </van-tabs>
  <!-- 1热门分类 -->
    <van-cell center>
      <div slot="title" class="channel-title">热门分类</div>
      <van-button size="mini" round class="more-button">更多></van-button>
    </van-cell>
    <van-grid :gutter="10" :column-num="5">
      <van-grid-item
        class="grid-item"
        :class="{active: active===category.id}"
        v-for="category in categories"
        :key="category.id"
        :text="category.name"
        @click="active=category.id;currentSub=category.sub"
      />
    </van-grid>
  <!-- 2子分类 -->
    <HotClassifySub :subs="currentSub"></HotClassifySub>
  <!-- 3歌单弹出框 -->
    <van-popup
      v-model="isPopupShow"
      get-container="#popup"
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 顶部返回栏 -->
      <div style="height:46px;width:100%;position:relative">
        <div style="position:fixed;top:0;right:0;left:0;zIndex:2022">
          <van-nav-bar
            left-text="返回"
            left-arrow
            @click-left="getBack"
            :border="false"
            class="t3_goback"
          >
            <van-icon name="search" size="18" color="#fff" slot="right" />
          </van-nav-bar>
        </div>
      </div>
      <transition name="fade">
        <ClassifyContent :currentRecommand="currentRecommand" v-if="isPopupShow"></ClassifyContent>
      </transition>
    </van-popup>
  </div>
</template>

<script>
import { getMusicCatlist, getNetRecommands } from '@/api/article'
import HotClassifySub from './components/HotClassifySub.vue'
import ClassifyContent from '@/components/components/ClassifyContent.vue'
export default {
  name: 'HotClassify',
  components: { HotClassifySub, ClassifyContent },
  data () {
    return {
      isPopupShow: false, // 歌单弹出层控制
      netRecommands: [], // 网友推荐歌单
      currentRecommand: null, // 即将通过弹出框展示的歌单
      categories: [ // 热门分类
        { id: 0, name: '语种', sub: [] },
        { id: 1, name: '风格', sub: [] },
        { id: 2, name: '场景', sub: [] },
        { id: 3, name: '情感', sub: [] },
        { id: 4, name: '主题', sub: [] }
      ],
      currentSub: [], // 子分类
      active: 0, // 被选中的热门分类
      netActive: 0 // 选中的网友推荐
    }
  },
  methods: {
    // 获取分类
    async onMusicCatlist () {
      const { data } = await getMusicCatlist() // 服务端获取数据
      console.log('热门分类', data)
      data.sub.forEach((item) => { // 整理对应的子分类
        this.categories[item.category].sub.push(item)
      })
      this.currentSub = this.categories[0].sub // 设置currenSub初始值
    },
    // 获取网友推荐歌单
    async onGetNetRecommands () {
      const { data } = await getNetRecommands()
      console.log(data)
      this.netRecommands = data.playlists.slice(0, 10) // 提取前十个歌单
    },
    // 获取当前点击的歌单信息
    getCurrenRecommand (name) {
      this.isPopupShow = true
      this.currentRecommand = this.netRecommands[name]

      this.$store.commit('setPlayerBottom', '-0.133rem') // 播放器bottom为0
    },
    getBack () {
      this.isPopupShow = false // 取消弹出框
      this.$store.commit('setPlayerBottom', '1.2rem') // 播放器底部回复50px
    }
  },
  mounted () {
    this.onGetNetRecommands() // 加载获取分类
    this.onMusicCatlist() // 加载网友推荐歌单
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  .more-button {
    padding: 10px;
    color: #bbb;
  }
  .jingpin {
    padding: 8px 16px;
  }
  .channel-tabs {
    .recommand-name {
      word-wrap: break-word;
    }
    /deep/.van-tabs__wrap {
      height: auto;
      .van-tabs__nav {
        padding-bottom: 0;
      }
      .van-tab {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        border: none;
        width: 92px;
        padding: 2px 5px;
        font-size: 10px;
      }
    }
  }
  .channel-title {
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
  .grid-item {
    width: 80px;
    height: 43px;
/deep/.van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
/deep/.van-grid-item__icon {
        position: absolute;
        top: -5px;
        right: -5px;
        color: #ccc;
        font-size: 20px;
      }
    }
  }
  .active {
/deep/.van-grid-item__text{
      color: red !important;
    }
  }
}
// 3弹出框
.t3_goback {
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
