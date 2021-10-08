<template>
  <div>
    <!-- cell -->
    <van-cell class="article-item">
      <van-image
        width="40"
        height="40"
        slot="icon"
        fit="cover"
        :src="article.album.blurPicUrl"
      />
      <div slot="title" class="title">{{article.name}}</div>

      <div slot="label">
        <div class="label-wrap">
          <span>{{article.artists[0].name}}</span>
        </div>
      </div>
      <van-icon name="music-o" class="iconimage" @click="changeSong" />
      <!-- 点击更多 -->
      <van-popover v-model="showPopover" trigger="click" :actions="actions" placement="bottom-end" @select="onSelect">
        <van-icon class-prefix="toutiao" name="gengduo-shuxiang" class="iconimage" slot="reference" />
      </van-popover>
    </van-cell>
  </div>

</template>

<script>
import { getSongDetail, getUrl } from '@/api/songs.js'
import { mapMutations } from 'vuex'
export default {
  name: 'DailyRecommandItem',
  props: ['article'],
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
      const { data: detailData } = await getSongDetail([this.article.id]) // 获取歌曲详情
      const { data: urlData } = await getUrl(this.article.id) // 获取url
      detailData.songs[0].playUrl = urlData.data[0].url // 存储当前歌曲的url到歌曲对象
      this.setCurrentPlayItems([detailData.songs[0]]) // 存储到vuex播放列表中
    },
    // 点击气泡框对应选项
    onSelect (action, index) {
      if (index === 1) {
        this.$router.push(`/comment/0/${this.article.id}`)
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  .iconimage {
    margin-left: 10px;
    font-size: 20px;
  }
  .iconimage:active {
    background-color: #ccc;
    color: rosybrown;
  }
  .title {
    margin-left: 10px;
    font-size: 14px;
    color: #3a3a3a;
    height: 24px;
    overflow: hidden;
  }
  .label-wrap {
    margin-left: 10px;
    margin-top: -4px;
    font-size: 11px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
  }
}
</style>
