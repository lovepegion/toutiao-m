<template>
  <van-tabs v-model="isActive" @click="getActive" line line-width="0" :ellipsis="false">
    <!-- 1所有按钮 -->
    <van-tab v-for="(area, index) in areas" :key="index">
      <div slot="title" class="t1_word" :class="{active:isActive===index}">{{area}}</div>
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  name: 'Mvareasearch',
  data () {
    return {
      isActive: 0, // 控制选中的字母
      areas: ['全部', '内地', '港台', '欧美', '日本', '韩国'] // 字母表
    }
  },
  methods: {
    getActive (index) {
      this.isActive = index
      this.$emit('getArea', this.areas[index])
    }
  }
}
</script>

<style scoped lang="less">
.active {
  background-color: red;
  color: #fff;
}
/deep/.van-tab { // 每个van-cell的wrap
  padding: 0 0 0 5px;
  flex: unset;
  // 1所有按钮
  .t1_word { // 单个按钮
    width: unset !important;
    padding: 0 12px;
    line-height: 30px;
    text-align: center;
    border-radius: 20px;
    width: 52px;
    height: 30px;
  }
}
</style>
