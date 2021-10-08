<template>
  <div>
    <!-- 0评论的user信息 -->
    <van-cell>
      <!-- 0_1user的头像 -->
      <van-image
        slot="icon"
        width="1.2rem"
        height="1.2rem"
        fit="cover"
        round
        :src="userCover"
      />
      <!-- 0_2user的名字 -->
      <span slot="title">{{userName}}</span>
      <!-- 0_3评论时间 -->
      <span slot="label">{{commentTime | formatTime}}</span>
      <!-- 0_4点赞数 -->
      <div slot="default">
        <span>{{likedCount}}</span>
        <van-icon class-prefix="toutiao" name="dianzan" size="0.5rem"></van-icon>
      </div>
    </van-cell>
    <!-- 1评论内容 -->
    <div class="t1_content">{{content}}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'CommentListItem',
  props: ['userCover', 'userName', 'likedCount', 'commentTime', 'content'],
  filters: {
    formatTime (value) {
      return dayjs(value).format('YYYY年MM月DD日')
    }
  }
}
</script>

<style scoped lang="less">
// 1评论内容
.t1_content {
  font-size: 14px;
  padding: 0 30px;
  margin-bottom: 20px;
  background-color: #fff;
}
</style>
