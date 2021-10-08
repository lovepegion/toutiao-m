<template>
  <div class="HotClassifyItem-wrap">
    <!-- 1歌单介绍信息 -->
    <van-cell mymark>
      <div slot="icon" class="t1_icon">
        <van-image :src="currentRecommand.coverImgUrl" width="120" height="120"></van-image>
        <div class="t1_icon_playcount">
          <van-icon class-prefix="toutiao" name="24gl-play" color="#ffffff" size="8px"></van-icon>
          {{currentRecommand.playCount | shortCount}}
        </div>
      </div>
      <div slot="title" class="t1_classifyname">{{currentRecommand.name}}</div>
      <div slot="label" class="t1_authorinfo">
        <!-- 作者信息 -->
        <div class="t1_authorinfo_author">
          <van-image :src="currentRecommand.creator?currentRecommand.creator.avatarUrl:''" width="30" height="30" round fit="cover" v-if="currentRecommand.creator?currentRecommand.creator.avatarUrl:''"></van-image>
          <span class="t1_authorinfo_author_nickname">{{currentRecommand.creator?currentRecommand.creator.nickname:''}}</span>
          <van-icon name="add-o" />
        </div>
        <!-- 歌单描述 -->
        <div class="t1_authorinfo_description">{{currentRecommand.description}}</div>
      </div>
    </van-cell>
    <!-- 2收藏评论分享数量 -->
    <div class="t2_prizeinfo">
      <van-grid direction="horizontal" :column-num="3">
        <van-grid-item icon-prefix="toutiao" icon="shoucang1" :text="currentRecommand.subscribedCount | shortCount2" icon-size="30" />
        <van-grid-item icon="comment-o" :text="currentRecommand.commentCount?commentsShort:''" />
        <van-grid-item icon="share-o" :text="currentRecommand.shareCount?sharesShort:''" />
      </van-grid>
    </div>
    <!-- 3播放全部 -->
    <van-cell mymark2>
      <van-icon class-prefix="toutiao" name="24gf-playCircle" color="red" size="28" slot="icon" />
      <div slot="title" style="marginLeft:10px;fontSize:18px;fontWeight:bold">播放全部</div>
      <div slot="default" style="display:flex;alignItems:center;justifyContent:flex-end">
        <van-icon class-prefix="toutiao" name="bofang" color="green" size="28" @click="playAll"></van-icon>
        <van-icon name="certificate" size="28px" />
      </div>
    </van-cell>
    <!-- 4歌曲列表 -->
    <van-list :finished="finished" finished-text="没有更多了">
      <MusicItem
        v-for="(track, index) in classifyDetail.tracks"
          :key="index"
          :trackIndex="index"
          :trackName="track.name"
          :artistName="track.ar[0].name"
          :albumName="track.al.name"
          :trackId="track.id"
      ></MusicItem>
    </van-list>
  </div>
</template>

<script>
import { getClassifyDetail } from '@/api/article'
import MusicItem from '@/components/MusicItem.vue'
import { getSongDetail, getUrl } from '@/api/songs.js'
import { mapMutations } from 'vuex'
export default {
  name: 'ClassifyContent',
  components: { MusicItem },
  props: ['currentRecommand'], // 歌单对象
  data () {
    return {
      finished: true, // 列表下拉到末尾触发
      classifyDetail: '' // 歌单详情
    }
  },
  filters: {
    shortCount (number) {
      if (number >= 10000) {
        return Math.floor(number / 10000) + '万'
      } else {
        return number
      }
    },
    shortCount2 (number) {
      if (number >= 10000) {
        return (number / 10000).toFixed(1) + '万'
      } else {
        return number
      }
    }
  },
  computed: {
    // 评论缩写
    commentsShort () {
      if (this.currentRecommand.commentCount >= 10000) {
        return Math.floor(this.currentRecommand.commentCount / 10000) + '万'
      } else {
        return this.currentRecommand.commentCount.toString()
      }
    },
    // 分享数字的缩写
    sharesShort () {
      if (this.currentRecommand.shareCount >= 10000) {
        return Math.floor(this.currentRecommand.shareCount / 10000) + '万'
      } else {
        return this.currentRecommand.shareCount.toString()
      }
    }
  },
  methods: {
    ...mapMutations(['setCurrentPlayItems']),
    // 获取歌单详情
    async onClassifyDetail () {
      const { data } = await getClassifyDetail(this.currentRecommand.id)
      this.classifyDetail = data.playlist
    },
    // 播放全部歌曲
    playAll () {
      const allSongs = []
      this.classifyDetail.tracks.forEach(async (track) => {
        const { data: detailData } = await getSongDetail([track.id]) // 获取歌曲详情
        const { data: urlData } = await getUrl(track.id) // 获取url
        detailData.songs[0].playUrl = urlData.data[0].url // 存储当前歌曲的url到歌曲对象
        allSongs.push(detailData.songs[0])
      })
      this.setCurrentPlayItems(allSongs) // 存储到vuex播放列表中
    }
  },
  mounted () {
    this.onClassifyDetail() // 加载歌单详情
  }
}
</script>

<style scoped lang="less">
// 1歌单介绍信息
.van-cell[mymark] {
  background-color: rgb(146, 143, 143);
  position: relative;
  margin-top: -1px;
  padding-bottom: 30px;
  // 左侧头像
  .t1_icon {
    position: relative;
    .t1_icon_playcount {
      position: absolute;
      top: 2px;
      right: 2px;
      color: #fff;
      font-size: 12px;
      padding: 0 2px;
      border-radius: 8px;
      background-color: rgba(158, 157, 157, 0.5);
    }
  }
  // 右侧title和label
  .van-cell__title {
    padding-left: 10px;
    .t1_classifyname {
      color: #fff;
      height: 48px;
      overflow: hidden;
    }
    .t1_authorinfo {
      color: rgb(221, 220, 220);
      .t1_authorinfo_author {
        display: flex;
        align-items: center;
        padding-top: 10px;
        .t1_authorinfo_author_nickname {
          padding: 0 5px;
        }
      }
      .t1_authorinfo_description {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding-top: 10px;
      }
    }
  }
}
// 2收藏评论分享数量
.t2_prizeinfo {
  width: 330px;
  text-align: center;
  background-color: pink;
  position: absolute;
  left: 23px;
  top: 190px;
  z-index: 2;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  // 收藏标签图案大小
  /deep/.toutiao {
    font-size: 28px;
  }
  // 收藏后面的文字
  /deep/.van-grid-item__text {
    word-break: keep-all;
  }
}
// 3播放全部
.van-cell[mymark2] {
  margin-top: 50px;
}
</style>
