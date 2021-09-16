<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id.toString()
      }
    }"
  >
    <div slot="title" class="van-multi-ellipsis--l3">{{article.title}}</div>
    <div slot="label">
      <div class="cover-warp" v-if="article.cover.type === 3">
        <van-image
          class="cover-wrap-item"
          height="73"
          fit="cover"
          v-for="(img, index) in article.cover.images"
          :src="article.cover.images[0]"
          :key="index"
        />
      </div>
      <div class="label-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}条评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-warp {
    display: flex;
    margin: 15px 0;
    .cover-wrap-item {
      margin-right: 4px;
    }
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
  }
}
</style>
