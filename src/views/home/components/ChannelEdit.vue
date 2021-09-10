<template>
  <div class="channel-edit" :border="false">
    <van-cell center>
      <div slot="title" class="channel-title">我的频道</div>
      <van-button type="danger" plain round size="mini" @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in userChannels"
        :key="index" :icon="isEdit && index !== 0 ?'clear':''"
        :text="channel.name"
        @click="onUserChannelClick(index)"
      />
    </van-grid>

    <van-cell center>
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="grid-item" v-for="(channel, index) in recommendChannels" :key="index" :text="channel.name" @click="onAdd(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAdd (channel) {
      this.userChannels.push(channel)
    },
    onUserChannelClick (index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态删除频道
        this.deleteChannel(index)
      } else {
        // 非编辑状态切换频道
        this.switchChannel(index)
      }
    },
    deleteChannel (index) {
      console.log('删除频道')
      this.userChannels.splice(index, 1)
      // todo: 持久化
    },
    switchChannel (index) {
      console.log('切换频道')
    }
  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style scoped lang="less">
  .channel-edit {
    padding-top: 54px;
    .channel-title {
      font-size: 16px;
      color: #333;
    }
    .grid-item {
      width: 80px;
      height: 43px;
  /deep/.van-grid-item__content {
        background-color: #f4f5f6;
        .van-grid-item__text {
          font-size: 14px;
          color: #222;
          margin-top: 0;
        }
  /deep/.van-grid-item__icon {
          position: absolute;
          top: -5px;
          right: -5px;
          color: #ccc;
          font-size: 20px;
        }
      }
    }
  }
</style>
