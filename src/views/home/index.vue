<template>
  <div class="home-container">
    <!-- 导航搜索栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
      >搜索</van-button>
    </van-nav-bar>

    <!-- 文章频道列表 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>
      <!-- wap-nav-placeholder是把被汉堡按钮遮住的内容挤出来 -->
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div slot="nav-right" @click="isChannelEditShow=true" class="wap-nav-wrap">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 频道列表编辑 -->
    <van-popup
      v-model="isChannelEditShow"
      get-container="body"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <ChannelEdit :userChannels="channels"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
export default {
  name: 'HomeIndex',
  components: { ArticleList, ChannelEdit },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: true // 控制频道编辑
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #5babfb;
    border: none;
    .van-button__icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  /deep/.van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
    padding: 0 25px;
  }
  /deep/.van-tabs__line {
    width: 15px;
    height: 3px;
    background-color: #3296fa;
    bottom: 20px;
  }
  .wap-nav-placeholder {
    width: 33px;
    flex-shrink: 0; // 保持自身宽度，不参与flex空间分配
  }
  .wap-nav-wrap {
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
}
</style>
