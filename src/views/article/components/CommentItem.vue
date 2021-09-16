<template>
  <van-cell class="comment-item">
    <van-image
      class="avatar"
      slot="icon"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title">
      <div class="authorname-like">
        <div class="name">{{comment.aut_name}}</div>
        <div class="like-wrap" @click="onCommentLike">
          <van-icon
            class="like-icon"
            :class="{liked:comment.is_liking}"
            :name="comment.is_liking?'good-job':'good-job-o'"
          ></van-icon>
          <span class="like-count">{{comment.like_count}}</span>
        </div>
      </div>
      <div class="content">{{comment.content}}</div>
      <div class="pubdate-reply">
        <span class="pubdate">{{comment.pubdate | dateTime('MM:DD HH:mm')}}</span>
        <van-button
          class="reply-btn"
          round
          size="mini"
          @click="$emit('replyClick', comment)"
        >{{comment.reply_count}}回复</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onCommentLike () {
      const commentId = this.comment.com_id.toString() // 转成字符防止意外错误，com_id是一个对象
      if (this.comment.is_liking) {
        await deleteCommentLike(commentId)
        this.comment.like_count--
      } else {
        await addCommentLike(commentId)
        this.comment.like_count++
      }
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style scoped lang="less">
.authorname-like {
  display: flex;
  justify-content: space-between;
  .like-wrap {
    display: flex;
    align-items: center;
    .liked {
      color: #ff69b4;
    }
  }
}
.van-cell__value {
  flex: unset;
}
.avatar {
  width: 36px;
  height: 36px;
  margin-right: 13px;
}
.name {
  font-size: 14px;
  color: #406599;
}
.content {
  font-size: 16px;
  color: #222;
}
.pubdate-reply {
  display: flex;
  align-items: center;
}
.pubdate {
  font-size: 10px;
  margin-right: 10px;
}
</style>
