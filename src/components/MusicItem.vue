<template>
  <van-cell class="item-wrap">
    <!-- 0左侧序号 -->
    <span slot="icon">{{trackIndex+1}}</span>
    <!-- 1歌曲名字 -->
    <div slot="title" class="title">{{trackName}}</div>
    <!-- 2歌手和专辑 -->
    <div slot="label">
      <div class="label-wrap">
        <span>{{artistName}}</span>-<span>{{albumName}}</span>
      </div>
    </div>
    <!-- 3播放和更多 -->
    <!-- 3_1播放按钮 -->
    <van-icon name="music-o" class="iconimage" @click="changeSong" />
    <!-- 3_2点击更多 -->
    <van-popover v-model="showPopover" trigger="click" :actions="actions" placement="bottom-end" @select="onSelect">
      <van-icon class-prefix="toutiao" name="gengduo-shuxiang" class="iconimage" slot="reference" />
    </van-popover>
  </van-cell>
</template>

<script>
import { getSongDetail, getUrl } from '@/api/songs.js'
import { mapMutations } from 'vuex'
export default {
  name: 'MusicItem',
  props: ['trackIndex', 'trackName', 'artistName', 'albumName', 'trackId'],
  data () {
    return {
      showPopover: false,
      actions: [
        // { text: '赞赏', icon: 'thumb-circle-o' },
        { text: '收藏', icon: 'add-o' },
        { text: '评论', icon: 'comment-o' },
        { text: '分享', icon: 'share-o' }
      ]
    }
  },
  methods: {
    ...mapMutations(['setCurrentPlayItems']),
    // 切换播放歌曲
    async changeSong () {
      const { data: detailData } = await getSongDetail([this.trackId]) // 获取歌曲详情
      const { data: urlData } = await getUrl(this.trackId) // 获取url
      detailData.songs[0].playUrl = urlData.data[0].url // 存储当前歌曲的url到歌曲对象
      this.setCurrentPlayItems([detailData.songs[0]]) // 存储到vuex播放列表中
    },
    // 点击起泡弹出框相应选项
    onSelect (action, index) {
      if (index === 1) {
        this.$router.push(`/comment/0/${this.trackId}`)
      }
    }
  }
}
</script>

<style scoped lang="less">
.item-wrap {
  padding-left: 24px;
  padding-right: 22px;
}
// 1歌曲名字
.title {
  margin-left: 10px;
  font-size: 14px;
  color: #3a3a3a;
  height: 24px;
  overflow: hidden;
}
// 2歌手和专辑
.label-wrap {
  margin-left: 10px;
  margin-top: -4px;
  font-size: 11px;
  color: #b4b4b4;
  span {
    margin-right: 12px;
  }
}
// 3播放和更多
.van-cell__value { // vant自带wrap
  flex: unset;
  .iconimage { // 播放和更多按钮
    margin-left: 10px;
    font-size: 20px;
  }
  .iconimage:active { // 播放和更多按钮点击效果
    background-color: #ccc;
    color: rosybrown;
  }
}
</style>
