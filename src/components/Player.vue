<template>
  <div ref="player"></div>
</template>

<script>
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'
import { mapState } from 'vuex'

export default {
  name: 'Player',
  computed: {
    ...mapState(['currentPlayItems']),
    // 传入的歌曲列表，简化为播放列表参数
    audio () {
      const tempAudio = []
      this.currentPlayItems.forEach(item => {
        const tempObj = { name: item.name, artist: item.ar[0].name, url: item.playUrl, cover: item.al.picUrl }
        tempAudio.push(tempObj)
      })
      console.log('tempAudio1', tempAudio)
      return tempAudio
    }
  },
  methods: {
    showAudio () {
      console.log(this.audio)
    }
  },
  mounted () {
    // 生成播放器
    this.ap = new APlayer({
      container: this.$refs.player,
      autoplay: true,
      volume: 0.7,
      listMaxHeight: 90,
      audio: this.audio
    })
    console.log(this.ap)
  },
  beforeDestroy () {
    this.ap.destroy()
  }
}
</script>

<style scoped lang="less">
</style>
