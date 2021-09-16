<template>
  <div class="article-container">
      <van-nav-bar
        class="app-nav-bar"
        title="文章详情"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- 文章所有内容 -->
      <div class="article-warp">
        <!-- 标题 -->
        <h1 class="title">{{article.title}}</h1>
        <!-- 作者信息 -->
        <van-cell center class="user-info">
          <div slot="title" class="name">{{article.aut_name}}</div>
          <van-image
            class="avatar"
            fit="cover"
            slot="icon"
            round
            :src="article.aut_photo"
          />
          <div slot="label" class="pubdate">{{article.pubdate | relativeTime}}</div>
          <van-button
            class="follow-btn"
            round size="small"
            :type="article.is_followed?'default':'info'"
            :icon="article.is_followed?'':'plus'"
            :loading="isFollowLoading"
            @click="onFollow"
          >{{article.is_followed?'已关注':'关注'}}</van-button>
        </van-cell>
        <!-- 正文 -->
        <div
          class="markdown-body"
          v-html="article.content"
          ref="articleContent"
        ></div>
        <!-- 文章评论列表 -->
        <CommentList
          :source="articleId"
          :list="commentList"
          @updateTotalComment="totalComment=$event"
          @replyClick="onReplyClick"
        ></CommentList>
      </div>
      <!-- 底部区域 -->
      <div class="aritcle-bottom">
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
          @click="isPostShow=true"
        >写评论</van-button>
        <van-icon
          name="comment-o"
          :badge="totalComment"
          color="#777"
          @click="isPostShow=true"
        ></van-icon>
        <van-icon
          :color="article.is_collected?'orange':'#777'"
          :name="article.is_collected?'star':'star-o'"
          @click="onCollect"
        ></van-icon>
        <van-icon
          :color="article.attitude===1?'hotpink':'#777'"
          :name="article.attitude===1?'good-job':'good-job-o'"
          @click="onLike"
        ></van-icon>
        <van-icon name="share" color="#777"></van-icon>
      </div>
      <!-- 发表评论 -->
      <van-popup
        v-model="isPostShow"
        position="bottom"
      >
        <CommentPost :target="articleId" @postSuccess="onPostSuccess"></CommentPost>
      </van-popup>
      <!-- 评论回复 -->
      <van-popup
        v-model="isReplyShow"
        position="bottom"
      >
        <!-- 用v-if让弹出层销毁后从新渲染，否则数据有残留，不准确 -->
        <CommentReply
          v-if="isReplyShow"
          :comment="replyComment"
          :articleId="articleId"
          @close="isReplyShow=false"
        ></CommentReply>
      </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleById, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'
import { ImagePreview } from 'vant' // 这个组件必须单独加载
import { addFollow, deleteFollow } from '@/api/user'
import CommentList from './components/CommentList'
import CommentPost from './components/CommentPost.vue'
import CommentReply from './components/CommentReply.vue'
export default {
  name: 'ArticleIndex',
  components: { CommentList, CommentPost, CommentReply },
  props: {
    articleId: {
      type: [String, Number, Object], // type可以是多类型
      required: true
    }
  },
  data () {
    return {
      article: {},
      isFollowLoading: false, // 点击关注可能有延迟，这期间应禁止点击
      isCollectLoading: false, // 控制关注的loading状态
      isPostShow: false, // 控制发布评论显示
      commentList: [],
      totalComment: 0, // 评论总数
      isReplyShow: false,
      replyComment: {} // 当前回复评论对象
    }
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticleById(this.articleId.toString())
      this.article = data.data

      this.$nextTick(() => { // 数据修改后，试图的更新不是立即的，需要使用nextTick
        this.handlePreviewImage()
      })
      // 在事件处理函数中调用ImagePreview，预览图片
    },
    handlePreviewImage () {
      // 获取文章内容DOM
      const articleContent = this.$refs.articleContent
      // 获取所有img标签
      const imgs = articleContent.querySelectorAll('img')
      console.log(imgs)
      // 循环img列表，给img注册点击事件
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },
    async onFollow () { // 注意async异步是相对于兄弟代码的，内部仍然是一次进行
      this.isFollowLoading = true // 函数开始禁用点击
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false // 调用结束后释放点击
    },
    async onCollect () {
      this.$toast.loading({ // 函数开始禁用点击,利用toast
        message: '操作中...',
        forbidClick: true
      })
      if (this.article.is_collected) {
        await deleteCollect(this.article.art_id)
      } else {
        await addCollect(this.article.art_id)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`) // 注意模板字符串的用法
    },
    async onLike () {
      this.$toast.loading({ // 函数开始禁用点击,利用toast
        message: '操作中...',
        forbidClick: true
      })
      if (this.article.attitude === 1) {
        await deleteLike(this.article.art_id)
        this.article.attitude = -1
      } else {
        await addLike(this.article.art_id)
        this.article.attitude = 1
      }
      this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`) // 注意模板字符串的用法
    },
    onPostSuccess (newComment) {
      // 将新评论放到评论列表顶部
      console.log(newComment)
      this.commentList.unshift(newComment)
      // 更新评论的总数量
      this.totalComment++
      // 关闭评论弹出层
      this.isPostShow = false
    },
    onReplyClick (comment) {
      console.log('onReplyClick', comment)
      this.replyComment = comment
      this.isReplyShow = true
    }
  },
  created () {
    this.loadArticle()
  }
}
</script>

<style scoped lang="less">
.article-warp {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 40px;
  overflow-y: auto;
}
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}
.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
.aritcle-bottom {
  padding: 10px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  bottom: 0;
  left: 0;
  right: 0;
  .comment-btn {
    width: 150px;
  }
}
</style>
