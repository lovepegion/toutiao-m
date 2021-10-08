<template>
  <van-tabs v-model="isActive" @click="getActive" line-width="0" :ellipsis="false">
    <!-- 1所有按钮 -->
    <van-tab v-for="(area, index) in areas" :key="index">
      <div slot="title" class="t1_word" :class="{active:isActive===index}">{{area.name}}</div>
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  name: 'HotSingersAreasearch',
  data () {
    return {
      isActive: 0, // 控制选中的字母
      areas: [ // 地区
        { code: -1, name: '全部' },
        { code: 7, name: '华语' },
        { code: 96, name: '欧美' },
        { code: 8, name: '日本' },
        { code: 16, name: '韩国' },
        { code: 0, name: '其他' }
      ]
    }
  },
  methods: {
    getActive (index) {
      this.isActive = index
      this.$emit('getArea', this.areas[index].code)
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
