<template>
  <van-tabs v-model="isActive" @click="getActive" line-width="0">
    <!-- 1左边占位按钮 -->
    <div slot="nav-left" class="t1_wrap">
      <div class="t1_all" :class="{active:isActive===0}" @click="isActive=0;$emit('getInitial',-1)">全部</div>
    </div>
    <!-- 2字母列表中固定按钮的占位按钮 -->
    <van-tab>
      <div slot="title" class="t2_hold">-</div>
    </van-tab>
    <!-- 3剩余的字母列表 -->
    <van-tab v-for="(word, index) in words" :key="index">
      <div slot="title" class="t3_word"  :class="{active:isActive===index+1}">{{word}}</div>
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  name: 'HotSingersWordsearch',
  data () {
    return {
      isActive: 0, // 控制选中的字母
      words: [] // 字母表
    }
  },
  methods: {
    // 生成字母表数组
    onWords () {
      for (let i = 0; i < 26; i++) {
        this.words.push(String.fromCharCode(65 + i))
      }
    },
    // 点击的字母显示active状态,并将返回点击的结果
    getActive (tagIndex) {
      this.isActive = tagIndex
      if (tagIndex >= 1) {
        this.$emit('getInitial', this.words[tagIndex - 1].toLowerCase())
      }
    }
  },
  mounted () {
    this.onWords() // 载入字母表数组
  }
}
</script>

<style scoped lang="less">
.active {
  background-color: red;
  color: #fff;
}

// 1左侧占位按钮
.t1_wrap {
    width: 54px;
    padding-left: 12px;
    background-color: #fff;
    position: fixed;
    top: 95px;
    left: 0;
    z-index: 1;
  .t1_all { // 里面格子
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    border-radius: 20px;
    width: 52px;
    height: 30px;
  }
}

/deep/.van-tab { //每个van-cell的wrap
  padding: 0 6px !important;
  // 2字母列表中固定按钮的占位按钮
  .t2_hold {
    line-height: 30px;
    text-align: center;
    border-radius: 20px;
    width: 52px;
    height: 30px;
  }
  // 3剩余的字母列表
  .t3_word { // 单个按钮
    line-height: 30px;
    text-align: center;
    border-radius: 20px;
    width: 52px;
    height: 30px;
  }
}
</style>
