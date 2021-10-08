<template>
  <div class="hottop-wrap">
  <!-- 0推荐榜单 -->
    <!-- 标题 -->
    <van-cell center class="t0_title-wrap">
      <div slot="title" class="t0_title">推荐榜单</div>
    </van-cell>
    <!-- 内容 -->
    <van-tabs line-width="0" class="recommand-tabs" @click="onRecommand">
      <van-tab
        v-for="(recommand, index) in recommands"
        :key="index"
      >
      <div slot="title" class="title-wrap">
        <van-image
          width="90"
          height="90"
          :src="recommand.coverImgUrl"
        />
        <span class="t0_update">{{recommand.updateFrequency}}</span>
        <div class="title-name">{{recommand.name}}</div>
      </div>
      </van-tab>
    </van-tabs>
  <!-- 1官方榜单 -->
    <!-- 标题 -->
    <van-cell center class="t0_title-wrap">
      <div slot="title" class="t0_title">官方榜单</div>
    </van-cell>
    <!-- 内容 -->
    <van-cell-group>
      <van-cell v-for="(official, index) in officials" :key="index" @click="currentRecommand=official;isPopupShow=true">
        <div slot="icon" class="t1_iconwrap">
          <div class="t1_namestyle">{{official.name | cutName | futherCut}}</div>
          <van-image width="70" height="70" radius="10" :src="official.coverImgUrl"></van-image>
        </div>
        <div slot="title" class="t1_description">{{official.description}}</div>
        <div class="t1_update">{{official.updateFrequency}}</div>
      </van-cell>
    </van-cell-group>
  <!-- 2国外榜单 -->
    <!-- 标题 -->
    <van-cell center class="t0_title-wrap">
      <div slot="title" class="t0_title">国外榜单</div>
    </van-cell>
    <!-- 内容 -->
    <van-grid :column-num="4">
      <van-grid-item v-for="(foreign, index) in foreigns" :key="index" @click="currentRecommand=foreign;isPopupShow=true">
        <van-image :src="foreign.coverImgUrl" slot="icon" size="70" radius="10"></van-image>
        <div slot="text" class="t2_name">{{foreign.name}}</div>
      </van-grid-item>
    </van-grid>
  <!-- 3特色榜单 -->
    <!-- 标题 -->
    <van-cell center class="t0_title-wrap">
      <div slot="title" class="t0_title">特色榜单</div>
    </van-cell>
    <!-- 内容 -->
    <van-grid :column-num="4">
      <van-grid-item v-for="(special, index) in specials" :key="index" @click="currentRecommand=special;isPopupShow=true">
        <van-image :src="special.coverImgUrl" slot="icon" size="70" radius="10"></van-image>
        <div slot="text" class="t2_name">{{special.name}}</div>
      </van-grid-item>
    </van-grid>
  <!-- 4歌单弹出框 -->
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
            @click-left="isPopupShow=false"
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
import { getToplist } from '@/api/toplist'
import ClassifyContent from '@/components/components/ClassifyContent.vue'
export default {
  name: 'HotTop',
  components: { ClassifyContent },
  data () {
    return {
      isPopupShow: false, // 控制点击歌单弹出框
      recommands: [],
      officials: [],
      foreigns: [],
      specials: [],
      currentRecommand: ''
    }
  },
  filters: {
    cutName (name) {
      return name.replace('云音乐', '')
    },
    futherCut (cutName) {
      if (cutName.match(/动画榜|游戏榜/)) {
        return cutName.replace('ACG', '')
      } else {
        return cutName
      }
    }
  },
  methods: {
    // 获取榜单信息并分类
    async onToplist () {
      const { data } = await getToplist()
      console.log(data)
      this.recommands.push(...data.list.slice(5, 8))
      this.officials.push(...data.list.slice(0, 4), data.list[8], data.list[10], ...data.list.slice(19, 21), ...data.list.slice(24, 26), data.list[27])
      this.foreigns.push(data.list[9], ...data.list.slice(11, 13), ...data.list.slice(15, 19), data.list[23], ...data.list.slice(30, 32), data.list[33])
      this.specials.push(data.list[4], ...data.list.slice(13, 15), ...data.list.slice(21, 23), data.list[26], ...data.list.slice(28, 30), data.list[32])
    },
    // 点击推荐榜单时，获取当前歌单对象
    onRecommand (index) {
      this.currentRecommand = this.recommands[index]
      this.isPopupShow = true
    }
  },
  mounted () {
    this.onToplist() // 加载榜单信息
  }
}
</script>

<style scoped lang="less">
// 最完成设置
.hottop-wrap {
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
}
// 0榜单推荐
.t0_title-wrap { // 大标题相关
  padding: 0;
  .t0_title {
    padding: 8px 16px;
    font-weight: bold;
  }
}
.recommand-tabs { // 主内容相关
  /deep/.van-tabs__wrap {
    height: auto;
    .van-tabs__nav {
      padding: 0;
      .van-tab{
        border: none;
        padding: 0 5px;
        .van-tab__text {
          display: unset;
          .title-wrap{
            text-align: center;
            position: relative;
            .t0_update {
              position: absolute;
              top: 1px;
              right: 1px;
              background-color: rgba(240, 136, 176, 0.5);
              padding: 2px;
              font-size: 10px;
              border-radius: 10px;
            }
            .title-name {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
// 1官方榜单
.t1_iconwrap {
  text-align: center;
  .t1_namestyle {
    font-family: 'dorable';
    font-size: 20px;
  }
}
.van-cell__title {
  display: flex;
  padding-left: 5px;
  align-items: center;
  .t1_description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
.van-cell__value {
  display: unset;
  position: absolute;
  right: 10px;
  top: 2px;
  background-color: rgba(169, 250, 63, 0.5);
  padding: 0 5px;
  font-size: 10px;
  border-radius: 10px;
}
// 2国外榜单
.t2_name {
  font-size: 10px;
  height: 16px;
  overflow: hidden;
}
// 4弹出框
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
