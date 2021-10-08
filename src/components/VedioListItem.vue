<template>
  <van-cell ref="vedioCell">
    <!-- 0作者名字和头像 -->
    <div class="t0_user">
      <!-- 0_0头像 -->
      <van-image
        width="1rem"
        height="1rem"
        fit="cover"
        round
        :src="creatorInfo.avatarUrl"
      />
      <!-- 0_1名字 -->
      <span class="t0_0_name">{{userName}}</span>
    </div>
    <!-- 1视频标题 -->
    <div class="t1_title">{{vedioTitle}}</div>
    <!-- 2视频封面 -->
    <video class="t2_cover" muted ref="vedioPlayer" @click="$router.push(`/vplay/0/${vid}/${userId}/${vedioTitle}`)">
      <source :src="playUrl" type="video/mp4">
      <source :src="playUrl" type="video/ogg">
      您的浏览器不支持 HTML5 video 标签。
    </video>
    <!-- 3播放量和播放时长 -->
    <div class="t3_wrap">
      <span>播放{{playCount | shortCount}}次</span>
      <span>{{duration | formatTime}}</span>
    </div>
  </van-cell>
</template>

<script>
import { getUserDetail } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'VedioListItem',
  props: ['scrollTop', 'vid', 'userId', 'userName', 'vedioTitle', 'playUrl', 'playCount', 'duration'],
  data () {
    return {
      creatorInfo: '' // 作者信息
    }
  },
  watch: {
    scrollTop () {
      if (this.$refs.vedioCell.offsetTop - this.scrollTop < 128 && this.$refs.vedioCell.offsetTop - this.scrollTop > -128) {
        this.$refs.vedioPlayer.play()
      } else {
        this.$refs.vedioPlayer.pause()
      }
    }
  },
  filters: {
    shortCount (value) {
      if (value >= 10000) {
        return (value / 10000).toFixed(1) + '万'
      } else {
        return value
      }
    },
    formatTime (value) {
      return dayjs(value).format('mm:ss')
    }
  },
  async mounted () {
    const { data } = await getUserDetail(this.userId)
    this.creatorInfo = data.profile
  }
}
</script>

<style scoped lang="less">
/* 0作者名字和头像 */
.t0_user {
  display: flex;
  align-items: center;
  /* 0_1名字 */
  .t0_0_name {
    font-size: 12px;
    padding-left: 5px;
  }
}
/* 1视频标题 */
.t1_title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
/* 2视频封面 */
.t2_cover {
  width: 344px;
  height: 194px;
  object-fit: cover;
  border-radius: 10px;
}
// 3播放量和播放时长
.t3_wrap {
  box-sizing: border-box;
  padding: 0 20px;
  color: #fff;
  width: 344px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 10px;
}
</style>
