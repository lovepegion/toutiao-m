<template>
  <van-cell :title="albumName" is-link>
    <div slot="icon" class="t3_3_2-albumlistwrap_iconwrap">{{index+1}}<van-icon :name="albumCover" size="45" class="t3_3_2-albumlistwrap_icon"></van-icon></div>
    <div slot="label">
      <span>{{artistName}}</span>&nbsp;
      <span>{{publishTime | formTime}}</span>&nbsp;
      <span>{{albumSize}}首</span>
    </div>
  </van-cell>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'AlbumItem',
  props: ['index', 'albumName', 'artistName', 'albumCover', 'publishTime', 'albumSize'],
  filters: {
    formTime (value) {
      return dayjs(value).format('YYYY-MM-DD')
    }
  }
}
</script>

<style scoped lang="less">
.t3_3_2-albumlistwrap_iconwrap { // iconslot的容器
width: 70px;
display: flex;
justify-content: space-between;
align-items: center;
  .t3_3_2-albumlistwrap_icon { // 单个专辑的封面
    padding-right: 5px;
  }
}
</style>
