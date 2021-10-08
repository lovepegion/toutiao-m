<template>
  <!-- 1标题栏 -->
  <van-cell center class="t1-warp">
    <!-- 1_1标题 -->
    <div slot="title" class="t1_1-warp">
      <!-- 1_1_1标题图标 -->
      <van-icon class="t1_1_1_icon" class-prefix="toutiao" name="remen" color="red"/>
      <!-- 1_1_2标题文字 -->
      <span class="t1_1_2-name">热门MV</span>
    </div>
    <!-- 1_2更多 -->
    <van-button size="mini" round class="t1_2-more">更多></van-button>
  </van-cell>
</template>

<script>
export default {
  name: 'Hotbar'
}
</script>

<style scoped lang="less">
// 1标题栏
.t1-warp {
  padding: 8px 16px;
  // 1_1左侧标题
  .t1_1-warp {
    display: flex;
    align-items: center;
    // 1_1_1标题图标
    .t1_1_1_icon {
      font-size: 30px;
    }
    // 1_1_2标题文字
    .t1_1_2-name { // title文字
      font-weight: bold;
      padding-left: 5px;
    }
  }
  // 1_2跟多
  .t1-warp_more {
    padding: 10px;
    color: #bbb;
  }
}
</style>
