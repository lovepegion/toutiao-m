<template>
  <!-- 1标题栏 -->
  <van-cell center class="t1-warp">
    <!-- 1_1标题 -->
    <div slot="title" class="t1_1-warp">
      <!-- 1_1_1标题图标 -->
      <van-icon class="t1_1_1_icon" class-prefix="toutiao" name="chaxun" color="red"/>
      <!-- 1_1_2标题文字 -->
      <div class="t1_1_2-wrap">
        <span class="t1_1_2-name">搜索条件</span>
        <span class="t1_1_2-wrap_sortdata">{{resultData.area}}</span>
        <span class="t1_1_2-wrap_sortdata">{{resultData.type}}</span>
        <span class="t1_1_2-wrap_sortdata">{{resultData.order}}</span>
      </div>
    </div>
    <!-- 1_2关闭 -->
    <van-button size="mini" round class="t1_2-more" @click="$emit('close')">关闭</van-button>
  </van-cell>
</template>

<script>
export default {
  name: 'Mvsearchresultbar',
  props: ['resultData']
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
    .t1_1_2-wrap {
      display: flex;
      .t1_1_2-name { // title主文字
        font-weight: bold;
        padding-left: 5px;
      }
      .t1_1_2-wrap_sortdata { // 搜索条件
        margin-left: 5px;
        background-color: #ccc;
        padding: 0 5px;
        border-radius: 10px;
        font-size: 10px;
      }
    }
  }
  // 1_2关闭
  .van-cell__value { // 关闭按钮的wrap
    flex: unset;
    .t1_2-more {
      padding: 10px;
    }
  }
}
</style>
