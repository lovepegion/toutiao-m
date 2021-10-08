<template>
  <van-grid-item :icon="icon" :text="text"/>
</template>

<script>
export default {
  name: 'Sortitem',
  props: ['icon', 'text']
}
</script>

<style scoped lang="less">
/deep/.van-grid-item__content {
  padding: 0 8px;
  .van-grid-item__text {
    margin-top: 0;
  }
}
</style>
