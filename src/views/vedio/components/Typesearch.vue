<template>
  <van-tabs v-model="isActive" @click="getActive" line line-width="0" :ellipsis="false">
    <!-- 1所有按钮 -->
    <van-tab v-for="(type, index) in types" :key="index">
      <div slot="title" class="t1_word" :class="{active:isActive===index}">{{type}}</div>
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  name: 'Typesearch',
  data () {
    return {
      isActive: 0, // 控制选中的字母
      types: ['全部', '官方版', '原生', '现场版', '网易出品'] // 字母表
    }
  },
  methods: {
    getActive (index) {
      this.isActive = index
      this.$emit('getType', this.types[index])
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
