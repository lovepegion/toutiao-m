<template>
  <div class="channel-edit" :border="false">
    <van-cell center>
      <div slot="title" class="channel-title">我的频道</div>
      <van-button type="danger" plain round size="mini" @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{active: active===index}"
        v-for="(channel, index) in userChannels"
        :key="index" :icon="isEdit && index !== 0 ?'clear':''"
        :text="channel.name"
        @click="onUserChannelClick(channel,index)"
      />
    </van-grid>

    <van-cell center>
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="grid-item" v-for="(channel, index) in recommendChannels" :key="index" :text="'+ '+channel.name" @click="onAdd(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
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
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
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
    async onAdd (channel) {
      this.userChannels.push(channel)
      // 数据持久化
      if (this.user) { // 登录了数据就存储到线上
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.userChannels.length
          })
        } catch (err) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        setItem('userChannels', this.userChannels)
      }
    },
    onUserChannelClick (channel, index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态删除频道
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态切换频道
        this.switchChannel(index)
      }
    },
    async deleteChannel (channel, index) {
      if (index < this.active) {
        this.$emit('updateActive', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      // todo: 持久化
      if (this.user) {
        await deleteUserChannel(channel.id)
      } else {
        setItem('userChannels', this.userChannels)
      }
    },
    switchChannel (index) {
      this.$emit('updateActive', index)
      this.$emit('close')
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
    .active {
  /deep/.van-grid-item__text{
        color: red !important;
      }
    }
  }
</style>
