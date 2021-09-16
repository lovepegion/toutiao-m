<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item,index) in suggestions"
      :key="index"
      @click="$emit('search',item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议数据
    }
  },
  watch: {
    searchText: { // 对searchText做防抖处理，1秒内的变化不调用请求
      immediate: true,
      handler: debounce(async function (newVal) { // 函数完整写法是对象写法，debounce包裹一个函数，并返回一个防抖处理后的函数
        const { data } = await getSearchSuggestions(newVal)
        this.suggestions = data.data.options
      }, 200)
    }
  },
  methods: {
    highlight (str) {
      return str.replace(new RegExp(this.searchText, 'gi'), `<span style="color:red">${this.searchText}</span>`)
    }
  }
}
</script>

<style>

</style>
