<template>
  <van-grid-item>
    <!-- 0封面图 -->
    <div slot="icon" class="t0-cover" @click="$router.push(`/vplay/1/${vid}/${uid}/${mvName}`)">
      <!-- 0_1封面主图 -->
      <img :src="cover" class="t0_1-maincover">
      <!-- 0_2封面歌手头像和播放时长 -->
      <div class="t0_2-pluscover">
        <!-- 0_2_1-歌手头像和名字 -->
        <div class="t0_2_1-singerinfo">
          <van-image v-if="singerPhoto" class="t0_2_1_singerinfo_photo" round :src="singerPhoto" fit="cover" />
          <span class="t0_2_1-singerinfo_name">{{singerName}}</span>
        </div>
        <!-- 0_2_2播放时长和播放量 -->
        <div class="t0_2_2-playinfo">
          <van-icon class="t0_2_2-playinfo_playicon" class-prefix="toutiao" name="bofang"></van-icon>
          <span class="t0_2_2-playinfo_count">{{playCount | shortCount2}}</span>
          <span v-if="duration" class="t0_2_2-playinfo_duration">{{duration | playDuration}}</span>
        </div>
      </div>
    </div>
    <!-- 1名字 -->
    <div slot="text" class="t1-name">{{mvName}}</div>
  </van-grid-item>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'MvItem',
  props: ['mv', 'cover', 'index', 'playCount', 'duration', 'singerName', 'singerPhoto', 'mvName', 'uid', 'vid'],
  filters: {
    // 播放量以万为单位
    shortCount2 (number) {
      if (number >= 10000) {
        return (number / 10000).toFixed(1) + '万'
      } else {
        return number.toString()
      }
    },
    // 处理播放市长显示
    playDuration (time) {
      return dayjs(time).format('mm:ss')
    }
  }
}
</script>

<style scoped lang="less">
// 0封面图
/deep/.van-grid-item__content { // 视频封面容器
  position: relative;
  padding-top: 0;
  padding-bottom: 0;
  // 0_1封面主图
  .t0_1-maincover { // 视频封面主图
    width: 100%;
    height: 125px;
    object-fit: cover;
  }
  // 0_2封面歌手头像和播放时长
  .t0_2-pluscover { // wrap
    color: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 90px;
    // 0_2_1-歌手头像和名字
    .t0_2_1-singerinfo { // wrap
      display: flex;
      align-items: center;
      .t0_2_1_singerinfo_photo { // 歌手头像
        width: 30px;
        height: 30px;
      }
      .t0_2_1-singerinfo_name { // 名字
        font-size: 12px;
        padding-left: 3px;
      }
    }
    // 0_2_2播放时长和播放量
    .t0_2_2-playinfo_playicon { // 播放图标
      font-size: 15px;
    }
    .t0_2_2-playinfo_count { // 播放量
      font-size: 12px;
    }
    .t0_2_2-playinfo_duration { // 播放时长
      padding-left: 3px;
      font-size: 12px;
    }
  }
}
// 1名字
.t1-name { // 视频name
  font-size: 14px;
  height: 50px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
