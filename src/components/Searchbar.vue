<template>
    <van-nav-bar>
      <!-- 0图标和名字 -->
      <div slot="left" class="t0-wrap">
        <!-- 0_1图标 -->
        <van-icon class-prefix="toutiao" name="yinleyule" size="0.8rem" color="red"></van-icon>
        <!-- 0_2名字 -->
        <span class="t0_2-name">海丽音乐</span>
      </div>
      <!-- 1搜索框 -->
      <van-button slot="title" class="t1-button" icon="search" type="info" round to="/search">搜索</van-button>
    </van-nav-bar>
</template>

<script>
export default {
  name: 'Searchbar'
}
</script>

<style scoped lang="less">
.van-nav-bar { // navbar的wrap
  background-color: rgb(250, 167, 137);
  // 0_1图标和名字
  .t0-wrap {
    display: flex;
    align-items: center;
    //  0_1_2名字
    .t0_2-name {
      padding-left: 5px;
    }
  }
  // 0_2搜索框
  /deep/.van-nav-bar__title {
    max-width: 100%;
    padding-left: 100px;
    .t1-button { // 自定义wrap
      width: 230px;
      height: 32px;
      background-color: #5babfb;
      border: none;
      .van-button__icon { // 放大镜图标
        font-size: 16px;
        color: #fff;
      }
      .van-button__text { // 搜索框文字
        font-size: 14px;
      }
    }
  }
}
</style>
