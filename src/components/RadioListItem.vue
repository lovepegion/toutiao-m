<template>
  <van-cell>
    <!-- 0左侧封面 -->
    <div slot="icon" class="t0-wrap">
      <!-- 0_1主封面 -->
      <van-image :src="picUrl" width="80" height="80" radius="5" fit="cover"></van-image>
      <!-- 0_2播放数 -->
      <div class="t0_2-wrap">
        <van-icon class-prefix="toutiao" name="bofang"/>
        <span class="t0_2-">{{playCount | short}}</span>
      </div>
      <!-- 0_3订阅数 -->
      <div class="t0_3-wrap">
        <van-icon class-prefix="toutiao" name="shoucang2"/>
        <span>{{subCount | short}}</span>
      </div>
    </div>
    <!-- 1中间name和节目数 -->
    <div slot="title" class="t1-name">{{name}}</div>
    <span slot="title" class="t1_2-programcount">{{programCount}} 个节目</span>
    <!-- 2中间label -->
    <div slot="label" class="t2-label">{{rcmdtext}}</div>
  </van-cell>
</template>

<script>
export default {
  name: 'RadioListItem',
  props: ['picUrl', 'programCount', 'playCount', 'subCount', 'name', 'rcmdtext'],
  filters: {
    short (value) {
      if (value >= 10000) return (value / 10000).toFixed(1) + '万'
      else return value
    }
  }
}
</script>

<style scoped lang="less">
// 0左侧封面
.t0-wrap {
  position: relative;
  // 0_2播放数
  .t0_2-wrap {
    font-size: 10px;
    color: #fff;
    background-color: rgba(0,0,0,0.3);
    border-radius: 10px;
    padding: 0 3px;
    position: absolute;
    top: 0;
    right: 0;
  }
  // 0_3订阅数
  .t0_3-wrap {
    color: #fff;
    font-size: 4px;
    background-color: rgba(0,0,0,0.3);
    border-radius: 10px;
    padding: 0 3px;
    position: absolute;
    bottom: 8px;
    right: 0;
  }
}
// 1中间name和节目数
.t1-name {
  padding-left: 10px;
  padding-top: 10px;
}
.t1_2-programcount { // 节目数
  color: rgb(77, 76, 76);
  font-size: 14px;
  border-radius: 12px;
  position: absolute;
  top: 5px;
  right: 8px;
}
// 2中间label
.t2-label {
  padding-left: 10px;
}

</style>
