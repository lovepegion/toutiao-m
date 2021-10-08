<template>
  <div class="vedioplaywrap">
    <!-- 1顶部返回区 -->
    <van-nav-bar
      :border="false"
      @click-left="$router.back()"
      @click-right="onMore"
    >
      <van-icon slot="left" class-prefix="toutiao" name="xitongfanhui" size="0.8rem"></van-icon>
      <van-icon slot="right" class-prefix="toutiao" name="gengduo-shuxiang" size="0.8rem"></van-icon>
    </van-nav-bar>
    <!-- 2播放视频 -->
    <video class="t2_cover" v-if="playurl" ref="vedioplay" @click="playPause">
      <source :src="playurl" type="video/mp4">
      <source :src="playurl" type="video/ogg">
      您的浏览器不支持 HTML5 video 标签。
    </video>
    <!-- 2_1继续播放按钮 -->
    <div class="t2_1_wrap" @click="showPlay=false;$refs.vedioplay.play()" v-if="showPlay">
      <van-icon class-prefix="toutiao" name="bofang" size="1rem"></van-icon>
    </div>
    <!-- 3视频进度条 -->
    <input type="range" min="0" :max="vedioDuration" v-model="currentTime" class="t3_bar" @change="$refs.vedioplay.currentTime=currentTime">
    <!-- 4作者和视频标题 -->
    <div class="t4_wrap">
      <!-- 4_1头像和名字 -->
      <div class="photo_name">
        <!-- 4_1_1头像 -->
        <van-image
          width="1rem"
          height="1rem"
          fit="cover"
          round
          :src="userPhoto"
        />
        <!-- 4_1_2名字 -->
        <span class="t4_1_2_name">{{userName}}</span>
        <!-- 4_1_3关注 -->
        <van-icon name="plus" size="0.4rem" color="orange"></van-icon>
      </div>
      <!-- 4_3视频标题 -->
      <div>{{title}}</div>
    </div>
    <!-- 5点赞评论分享收藏 -->
    <div class="t5_wrap">
      <!-- 5_1点赞 -->
      <div class="t5_1_like">
        <van-icon class-prefix="toutiao" name="dianzan_kuai" size="0.8rem"></van-icon>
        <span>{{detailInfo.likedCount | shortCount}}</span>
      </div>
      <!-- 5_2评论 -->
      <div class="t5_2_comment">
        <van-icon class-prefix="toutiao" name="pinglun1" size="0.8rem"></van-icon>
        <span>{{detailInfo.commentCount | shortCount}}</span>
      </div>
      <!-- 5_3分享 -->
      <div class="t5_3_share">
        <van-icon name="share" size="0.8rem"></van-icon>
        <span>{{detailInfo.shareCount | shortCount}}</span>
      </div>
      <!-- 5_4收藏 -->
      <van-icon class-prefix="toutiao" name="shoucangjia" size="0.8rem"></van-icon>
    </div>
  </div>
</template>

<script>
import { getVedioInfo, getVedioUrl } from '@/api/vedio.js'
import { getMvUrl, getMvInfo } from '@/api/mv.js'
import { getUserDetail } from '@/api/user.js'
import { getSingerDetail } from '@/api/singers.js'
export default {
  name: 'VedioPlay',
  props: ['type', 'vid', 'uid', 'title'],
  data () {
    return {
      playurl: '', // 播放地址
      userPhoto: '', // 用户头像
      userName: '', // 用户姓名
      showPlay: true, // 暂停时显示视频中的播放按钮
      vedioDuration: 0, // 播放时长
      currentTime: 0, // 当前播放时间
      detailInfo: '' // 点赞、评论、分享数量
    }
  },
  filters: {
    shortCount (value) {
      if (value >= 10000) {
        return (value / 10000).toFixed(1) + '万'
      } else {
        return value
      }
    }
  },
  methods: {
    // 顶部点击展示更多
    onMore () {},
    // 获取点赞、评论、分享数量
    async onVedioInfo () {
      const { data } = await getVedioInfo(this.vid)
      this.detailInfo = data
    },
    async onMvInfo () {
      const { data } = await getMvInfo(this.vid)
      this.detailInfo = data
    },
    // 获取视频播放地址
    async onVedioUrl () {
      const { data } = await getVedioUrl(this.vid)
      this.playurl = data.urls[0].url
    },
    // 获取mv播放地址
    async onMvUrl () {
      const { data } = await getMvUrl(this.vid)
      this.playurl = data.data.url
    },
    // 获取用户信息
    async onUserInfo () {
      const { data } = await getUserDetail(this.uid)
      this.userPhoto = data.profile.avatarUrl
      this.userName = data.profile.nickname
    },
    // 获取歌手信息
    async onSingerInfo () {
      const { data } = await getSingerDetail(this.uid)
      this.userPhoto = data.data.artist.cover
      this.userName = data.data.artist.name
    },
    // 点击视频暂停或继续播放
    playPause () {
      const vedioplayer = this.$refs.vedioplay
      if (vedioplayer.paused) {
        vedioplayer.play()
        this.showPlay = false
      } else {
        vedioplayer.pause()
        this.showPlay = true
      }
    },
    // 获取视频时长,延迟获取，视频ref加载延后，不知道是为什么
    onDuration () {
      setTimeout(() => {
        this.vedioDuration = this.$refs.vedioplay.duration
        console.log('duration', this.vedioDuration)
      }, 600)
    }
  },
  mounted () {
    if (this.type === '0') {
      this.onVedioUrl() // type是0，视频url
      this.onUserInfo() // 作者信息
      this.onVedioInfo() // 存储点赞评论分享数量
    } else {
      this.onMvUrl() // type是1，获取mv的播放地址
      this.onSingerInfo()
      this.onMvInfo()
    }
    this.onDuration() // 存储视频时长
    // 延迟监控视频的时长变化，因为视频ref挂载延后，不知道是为什么
    setTimeout(() => {
      this.$refs.vedioplay.ontimeupdate = () => {
        this.currentTime = this.$refs.vedioplay.currentTime
      }
    }, 1000)
  }
}
</script>

<style scoped lang="less">
.vedioplaywrap {
  height: 667px;
  background-color: black;
  color: #fff;
}
// 1顶部返回区
.van-nav-bar { // van-var外层wrap
  background-color: black;
}
/* 播放视频 */
.t2_cover {
  margin-top: 70px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
}
// 2_1继续播放按钮
.t2_1_wrap {
  opacity: 0.5;
  position: absolute;
  top: 220px;
  left: 170px;
}
// 3视频进度条
.t3_bar {
  -webkit-appearance: none;
  margin-top: 20px;
  margin-left: 3px;
  background-color: rgb(149, 149, 149);
  width: 98%;
  -webkit-appearance: none;
  height:2px;
  padding: 0;
  border: none;
}
.t3_bar::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background: #ccc;
    border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
    box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
}
// 4作者和视频标题
.t4_wrap {
  margin-top: 80px;
  padding-left: 20px;
  font-size: 14px;
  width: 240px;
  // 4_1头像和名字
  .photo_name {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    // 4_1_2名字
    .t4_1_2_name {
      margin: 0 5px;
    }
  }
}
// 5点赞评论分享收藏
.t5_wrap {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 370px;
  right: 20px;
  // 5_1点赞,5_2评论，5_3分享
  .t5_1_like, .t5_2_comment, .t5_3_share {
    font-size: 12px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
