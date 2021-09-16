<template>
  <div class="comment-post">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      size="mini"
      @click="onPost"
      :disabled="!message.trim()"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  props: {
    target: { // 如果是文章评论则传递文章id，回复评论则传递评论id
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null // 又是需要此参数，有时又不需要，所以默认是null，需要的时候在传
    }
  },
  data () {
    return {
      message: '' // 输入框内容
    }
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true
      })
      const { data } = await addComment({
        target: this.target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id
        content: this.message, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        art_id: this.articleId ? this.articleId.toString() : null // null不能toString
      })
      // console.log(data)
      this.$emit('postSuccess', data.data.new_obj) // 让父组件关闭评论框，更新试图
      this.$toast.success('发布成功')
      // 清空评论框
      this.message = ''
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 14px;
}
</style>
