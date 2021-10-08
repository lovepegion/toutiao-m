<template>
  <van-tabs v-model="isActive" @click="getActive" line line-width="0" :ellipsis="false">
    <!-- 1选择区 -->
    <van-tab v-for="(type, index) in types" :key="index">
      <div slot="title" class="t1_word" :class="{active:isActive===index}">{{type.name}}</div>
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  name: 'HotSingersSortorder',
  data () {
    return {
      isActive: 0, // 控制选中的字母
      types: [ // type数据
        { code: -1, name: '全部' },
        { code: 1, name: '男歌手' },
        { code: 2, name: '女歌手' },
        { code: 3, name: '乐队' }
      ]
    }
  },
  methods: {
    getActive (index) {
      this.isActive = index
      this.$emit('getType', this.types[index].code)
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
  padding: 0 0 0 5px !important;
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
