<template>
  <van-cell>
    <!-- 0歌手头像 -->
    <van-image
      slot="icon"
      round
      width="1.6rem"
      height="1.6rem"
      fit="cover"
      :src="photoUrl"
    />
    <!-- 1歌手名字 -->
    <div slot="title" class="t1_name">{{singerName}}</div>
    <!-- 2关注 -->
    <van-button slot="default" round size="small" icon="plus" plain type="danger">关注</van-button>
  </van-cell>
</template>

<script>
export default {
  name: 'UserListItem',
  props: ['photoUrl', 'singerName']
}
</script>

<style scoped lang="less">
// 1歌手名字
.t1_name {
  line-height: 60px;
  padding-left: 10px;
}
// 2关注
.van-cell__value { // 外面的包裹层
  line-height: 60px;
}
</style>
