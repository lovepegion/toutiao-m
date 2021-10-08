<template>
  <div class="HotClassifyItem-wrap">
    <!-- 1歌单介绍信息 -->
    <van-cell mymark>
      <div slot="icon" class="t1_icon">
        <van-image :src="radioDetail.picUrl" width="3.2rem" height="3.2rem"></van-image>
        <div class="t1_icon_playcount">
          <van-icon class-prefix="toutiao" name="24gl-play" color="#ffffff" size="0.2rem"></van-icon>
          <span>{{radioDetail.playCount | shortCount}}</span>
        </div>
      </div>
      <div slot="title" class="t1_classifyname">{{radioDetail.name}}</div>
      <div slot="label" class="t1_authorinfo">
        <!-- 作者信息 -->
        <div class="t1_authorinfo_author">
          <!-- <van-image :src="userPhoto" width="0.8rem" height="0.8rem" round fit="cover"></van-image> -->
          <!-- <span class="t1_authorinfo_author_nickname">{{userName}}</span> -->
          <van-icon name="add-o" />
        </div>
        <!-- 歌单描述 -->
        <div class="t1_authorinfo_description">{{radioDetail.rcmdText}}</div>
      </div>
    </van-cell>
    <!-- 2收藏评论分享数量 -->
    <div class="t2_prizeinfo">
      <van-grid direction="horizontal" :column-num="3">
        <van-grid-item icon-prefix="toutiao" icon="shoucang1" :text="radioDetail.subCount | shortCount2" icon-size="0.8rem" />
        <van-grid-item icon="comment-o" :text="radioDetail.programCount+'个节目'" />
        <!-- <van-grid-item icon="share-o" :text="radioDetail.shareCount" /> -->
      </van-grid>
    </div>
    <!-- 3播放全部 -->
    <van-cell mymark2>
      <van-icon class-prefix="toutiao" name="24gf-playCircle" color="red" size="0.74rem" slot="icon" />
      <div slot="title" style="marginLeft:0.26rem;fontSize:0.48rem;fontWeight:bold">播放全部</div>
      <div slot="default" style="display:flex;alignItems:center;justifyContent:flex-end">
        <van-icon class-prefix="toutiao" name="bofang" color="green" size="0.74rem"></van-icon>
        <van-icon name="certificate" size="0.74rem" />
      </div>
    </van-cell>
    <!-- 4节目列表 -->
    <van-list :finished="finished" finished-text="没有更多了">
      <MusicItem
        v-for="(track, index) in programs"
          :key="index"
          :trackIndex="index"
          :trackName="track.name"
          :artistName="track.dj.nickname"
          :albumName="track.dj.brand"
          :trackId="track.id"
      ></MusicItem>
    </van-list>
  </div>
</template>

<script>
import { getProgramDetail, getPrograms } from '@/api/radio.js'
import MusicItem from '@/components/MusicItem.vue'
export default {
  name: 'RadioContent',
  components: { MusicItem },
  props: ['currentProgramId'], // 歌单对象
  data () {
    return {
      finished: true, // 列表下拉到末尾触发
      radioDetail: '', // 电台详情
      programs: [] // 电台节目
    }
  },
  computed: {
    avatarUrl () {
      return this.radioDetail.dj.avatarUrl
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
        return number + ''
      }
    }
  },
  methods: {
    // 获取电台详情
    async onProgramDetail () {
      const { data } = await getProgramDetail(this.currentProgramId)
      this.radioDetail = data.data
    },
    // 获取电台节目
    async onPrograms () {
      const { data } = await getPrograms(this.currentProgramId)
      this.programs = data.programs
    }
  },
  mounted () {
    this.onProgramDetail() // 载入节目详情
    this.onPrograms() // 载入电台节目
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
  background-color: #fff;
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
