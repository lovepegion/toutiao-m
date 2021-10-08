<template>
  <div id="app">
    <!-- 0一级路由出口 -->
    <keep-alive :include="cachePages">
      <router-view></router-view>
    </keep-alive>
    <!-- 1音乐播窗口 -->
    <div
      v-if="isPlayerShow"
      class="t1_playerwrap"
      ref="playerwrap"
      :style="{bottom:playerBottom}"
    >
      <van-button class="t1_playerwrap_close" size="mini" @click="onClose">关闭</van-button>
      <Player></Player>
    </div>
    <!-- 弹出层挂载节点 -->
    <div id="popup"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Player from '@/components/Player.vue'
export default {
  name: 'App',
  components: { Player },
  data () {
    return {
      isPlayerShow: false // 是否显示播放器
    }
  },
  computed: {
    ...mapState(['cachePages', 'currentPlayItems', 'playerBottom'])
  },
  methods: {
    onClose () {
      this.$refs.playerwrap.style.animation = 'fadeout 0.5s'
      setTimeout(() => {
        this.isPlayerShow = false
      }, 400)
    }
  },
  watch: {
    currentPlayItems () {
      if (this.isPlayerShow === false) this.isPlayerShow = true
      else {
        this.$refs.playerwrap.style.animation = 'fadeout 0.5s'
        setTimeout(() => {
          this.isPlayerShow = false
          setTimeout(() => {
            this.isPlayerShow = true
          }, 100)
        }, 400)
      }
    }
  }
}
</script>

<style lang="less">
.t1_playerwrap {
  margin: 0 5px;
  max-height: 120px;
  background-color: pink;
  transition: bottom 0.5s;
  animation: showup 0.5s;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  z-index: 9999;
  .t1_playerwrap_close {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 12px;
    z-index: 1;
  }
}
@keyframes showup {
  from {bottom: -125px}
  to {bottom: 45px;}
}
@keyframes fadeout {
  from {transform: scale(1);}
  to {transform: scale(0);}
}
</style>
