<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- 编辑区域 -->
    <div class="name-field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      ></van-field>
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      localName: this.value // data可以引用prop数据
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      try {
        // 服务端api提交用户新昵称
        const { data } = await updateUserProfile({
          name: this.localName
        })
        console.log(data)
        this.$toast.success('保存成功')
        // 修改父组件的name
        this.$emit('input', this.localName)
        // 关闭弹出层
        this.$emit('close')
      } catch (err) {
        if (err && err.response && err.response.status === 409) { // 重名的处理
          this.$toast.fail('昵称已存在')
          return
        }
        this.$toast.fail('未修改成功,请稍后重试')
      }
    }
  }
}
</script>

<style>
  .van-popup {
    background-color: #f5f7f9;
  }
  .name-field-wrap {
    padding: 10px;
  }
</style>
