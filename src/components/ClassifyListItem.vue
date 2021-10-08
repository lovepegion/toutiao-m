<template>
  <van-cell>
    <!-- 0左侧封面图 -->
    <van-image slot="icon" width="1.4rem" height="1.4rem" radius="0.133rem" fit="cover" :src="cover"/>
    <!-- 1歌单名字 -->
    <div slot="title">{{classifyName}}</div>
    <!-- 2歌单介绍 -->
    <div slot="label">
      <span>{{classifySize}}首</span>,
      <span>by {{creatorName}}</span>,
      <span>播放{{playCount | shortCount}}次</span>
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ClassifyListItem',
  props: ['cover', 'classifyName', 'classifySize', 'creatorName', 'playCount'],
  filters: {
    shortCount (value) {
      if (value >= 10000) {
        return (value / 10000).toFixed(1) + '万'
      } else {
        return value
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-cell__title { // title和label共同的wrap
  padding-left: 10px;
}
</style>
