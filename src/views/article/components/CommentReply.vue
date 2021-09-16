<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
    </van-nav-bar>
    <!-- 当前评论项 -->
    <CommentItem :comment="comment"></CommentItem>
    <!-- 所有评论回复 -->
    <van-cell title="所有回复"></van-cell>
    <CommentList :source="comment.com_id" type="c" :list="commentList"></CommentList>
    <!-- 底部区域 -->
    <div class="aritcle-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow=true"
      >写评论</van-button>
    </div>
    <!-- 发布评论 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <CommentPost
        :target="comment.com_id"
        :articleId="articleId"
        @postSuccess="onPostSuccess"
      ></CommentPost>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import CommentList from './CommentList.vue'
import CommentPost from './CommentPost.vue'
export default {
  name: 'CommentReply',
  components: { CommentItem, CommentList, CommentPost },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: [] // 评论的回复列表
    }
  },
  methods: {
    onPostSuccess (newComment) {
      // 将新评论放到评论列表顶部
      this.commentList.unshift(newComment)
      // 更新评论的回复数量
      this.comment.reply_count++
      // 关闭发布回复弹出层
      this.isPostShow = false
    }
  }
}
</script>

<style scoped lang="less">
.aritcle-bottom {
  padding: 10px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  .comment-btn {
    width: 2000px;
  }
}
</style>
