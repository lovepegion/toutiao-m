<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @replyClick="$emit('replyClick',$event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  name: 'CommentList',
  components: { CommentItem },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: { // 默认是a对文章评论, c是对评论回复
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      default: function () { // 数组或对象的默认值必须通过函数返回
        return []
      }
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10 // 每页大小
    }
  },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getComments({
        type: this.type, // a-对文章评论，c-对评论回复
        source: this.source.toString(), // 文章id或者评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 每页大小
      })
      this.$emit('updateTotalComment', data.data.total_count) // 评论总数传给父组件更新显示
      // 2.把数据放到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3.关闭本次loading
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id // 请求下一页数据
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
