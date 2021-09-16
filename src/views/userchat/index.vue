<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="智能客服"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 消息列表 -->
    <van-cell-group class="chat-area" ref="chatArea">
      <van-cell
        v-for="(item, index) in items"
        :key="index"
        :title="item.msg"
      />
    </van-cell-group>
    <!-- 发送消息 -->
    <van-cell-group class="message-wrap">
      <van-field v-model="message" placeholder="请输入消息内容" :border="false" />
      <van-button size="small" type="primary" @click="onSend">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client' // socket.io是websocket库，分为服务端和客户端，socket.io-client是客户端
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'UserChat',
  data () {
    return {
      message: '', // 发送的消息
      socket: '', // socket对象
      messages: getItem('chatMessage') || [] // 收发的消息列表,集中用列表展示在聊天屏幕上
    }
  },
  watch: {
    messages () {
      setItem('chatMessage', this.messages) // 将消息数组存入本地
      this.$nextTick(() => { // 操作数据后要立即操作被数据影响的视图，最好使用nextTicket
        this.scrollToBottom() // 有新消息就让屏幕滚动到底部
      })
    }
  },
  methods: {
    onSend () {
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', { data }) // 发送socket消息
      this.messages.push(data) // 将发送的消息存入本地消息数组
      this.message = '' // 清空输入框
    },
    scrollToBottom () {
      const chartArea = this.$refs.chartArea
      chartArea.scrollTop = chartArea.scrollHeight
    }
  },
  created () {
    const socket = io('http://ttapi.research.itcast.cn') // 建立连接
    this.socket = socket
    socket.on('connect', function () { // 监听连接事件
      console.log('连接建立成功')
    })
    // socket.on('event', function (data) {}) // 收到某个事件，没什么用
    socket.on('disconnect', function () { // 监听断开事件
      console.log('断开连接了')
    })
    // socket.emit('消息类型', 内容) // 发送消息,消息类型有后端决定，这里是message
    socket.on('message', data => { // 监听接收消息事件
      this.messages.push(data) // 将收到的消息存入本地消息数组
    })
    window.socket = socket // 在window上加载socket，这样就可以在浏览器里直接使用
  },
  beforeDestroy () {
    this.socket.close() // 或者使用disconnect代替close切换路由使组件销毁时断开连接，不然后台会一直请求
  },
  mounted () {
    this.scrollToBottom() // 聊天屏幕的初始位置设置到最后
  }
}
</script>

<style scoped lang="less">
.message-wrap {
  display: flex;
  padding: 0 10px;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.chat-area {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 44px;
  overflow-y: auto;
}
</style>
