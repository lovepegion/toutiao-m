<template>
  <div class="search-history">
    <van-cell
      title="搜索历史"
    >
      <div v-if="isDeleteShow">
        <span @click="$emit('updateHistories',[])">全部删除</span>&nbsp;&nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon
        v-else
        name="delete-o"
        @click="isDeleteShow=true"
      />
    </van-cell>
    <van-cell
      :title="searchHistory"
      v-for="(searchHistory,index) in searchHistories"
      :key="index"
      @click="onClick(searchHistory,index)"
    >
    <van-icon v-if="isDeleteShow" name="close" /></van-cell>
  </div>
</template>

<script>
// import { setItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  props: ['searchHistories'],
  data () {
    return {
      isDeleteShow: false // 是否显示删除
    }
  },
  methods: {
    onClick (searchHistory, index) {
      if (this.isDeleteShow) { // 如果是删除页面，则点击删除
        this.searchHistories.splice(index, 1)
        // 持久化处理
        // 1.修改本地,下面代码已经在search主页中通过watch实现
        // setItem('searchHistories', this.searchHistories)
        // 2.修改线上,接口不能删除单个数据，就不演示了，也就是说前4个历史记录不能持久化删除
        return
      }
      this.$emit('search', searchHistory) // 不是删除页面，则点击搜索
    }
  }
}
</script>

<style>

</style>
