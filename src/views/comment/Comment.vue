<template>
  <div>
    <!-- 0评论头 -->
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      @click-right="onShare"
    >
      <div slot="title">评论({{commentCount}})</div>
      <van-icon slot="right" name="share-o" size="0.5rem"></van-icon>
    </van-nav-bar>
    <!-- 中间滚动固定区域 -->
    <div class="fix_wrap">
      <!-- 1歌曲信息 -->
      <div class="t1_wrap">
        <!-- 1_1歌曲封面 -->
        <van-image
          width="1rem"
          height="1rem"
          fit="cover"
          round
          :src="coverUrl"
        />
        <!-- 1_2歌名 -->
        <span>{{songName}}</span>-
        <!-- 1_3歌手名子 -->
        <span>{{singerName}}</span>
      </div>
      <!-- 2评论区标题 -->
      <div class="t2_title">评论区</div>
      <!-- 3评论展示区 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <CommentListItem
          v-for="(item, index) in list"
          :key="index"
          :userCover="item.user.avatarUrl"
          :userName="item.user.nickname"
          :likedCount="item.likedCount"
          :commentTime="item.time"
          :content="item.content"
        />
      </van-list>
      <!-- 4发表评论 -->
      <div class="t4_wrap">
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          placeholder="请输入评论"
        >
          <button slot="right-icon" @click="onComment">发送评论</button>
        </van-field>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongComments, getSongDetail } from '@/api/songs.js'
import { putComment } from '@/api/user.js'
import CommentListItem from '@/components/CommentListItem.vue'
export default {
  name: 'Comment',
  components: { CommentListItem },
  props: ['type', 'id'],
  data () {
    return {
      list: [], // 主评论列表
      commentCount: 0, // 评论数量
      coverUrl: '', // 歌曲封面url
      songName: '', // 歌曲名字
      singerName: '', // 歌手名字
      loading: false, // 列表加载
      finished: false, // 列表加载完毕
      offset: 0,
      message: '' // 发表评论
    }
  },
  methods: {
    // 获取歌曲信息
    async onSongInfo () {
      const { data } = await getSongDetail([this.id])
      this.coverUrl = data.songs[0].al.picUrl
      this.songName = data.songs[0].name
      this.singerName = data.songs[0].ar[0].name
    },
    // 获取歌曲评论
    async onLoad () {
      const { data } = await getSongComments({
        id: this.id,
        limit: 20,
        offset: this.offset
      })
      console.log('comment', data)
      this.commentCount = data.total // 评论总数
      if (data.hotComments) this.list.unshift(...data.hotComments) // 如果有热评，则热评放最前面
      this.list.push(...data.comments) // 数据加入评论列表
      this.loading = false
      if (data.comments.length >= 20) this.offset += 20
      else this.finished = true
    },
    async onComment () {
      const { data } = await putComment({
        t: 1,
        type: 0,
        id: this.id,
        content: this.message
      })
      console.log('putcomment', data)
    },
    // 分享
    onShare () {}
  },
  mounted () {
    // this.$store.commit('addCachePages', 'Comment') // 缓存Comment组件
    this.onSongInfo() // 载入歌曲信息
  }
}
</script>

<style scoped lang="less">
// 中间滚动固定区域
.fix_wrap {
  position: fixed;
  top: 46px;
  bottom: 60px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
// 1歌曲信息
.t1_wrap {
  padding-left: 20px;
  background-color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
}
// 2评论区标题
.t2_title {
  margin-top: 5px;
  padding: 10px 20px;
  background-color: #fff;
  font-size: 14px;
  font-weight: bold;
}
// 4发表评论
.t4_wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
