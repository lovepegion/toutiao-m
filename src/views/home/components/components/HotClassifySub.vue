<template>
  <div class="channel-edit" :border="false">
    <!-- 0子分类列表 -->
    <van-cell center>
      <div slot="title" class="channel-title">更多子分类</div>
      <van-button size="mini" round class="more-button">更多></van-button>
    </van-cell>
    <van-grid :gutter="10" :column-num="5">
      <van-grid-item
        class="grid-item"
        v-for="(sub, index) in subs"
        :key="index"
        :text="sub.name"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'HotClassifySub',
  props: ['subs']
}
</script>

<style scoped lang="less">
  .channel-edit {
    .more-button {
      padding: 10px;
      color: #bbb;
    }
    .channel-title {
      font-size: 12px;
      color: #333;
      font-weight: bold;
    }
    .grid-item {
      width: 80px;
      height: 43px;
  /deep/.van-grid-item__content {
        background-color: #f4f5f6;
        .van-grid-item__text {
          font-size: 14px;
          color: #222;
          margin-top: 0;
        }
  /deep/.van-grid-item__icon {
          position: absolute;
          top: -5px;
          right: -5px;
          color: #ccc;
          font-size: 20px;
        }
      }
    }
    .active {
  /deep/.van-grid-item__text{
        color: red !important;
      }
    }
  }
</style>
