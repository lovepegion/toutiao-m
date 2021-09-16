<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :default-index="defaultIndex"
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value // 控制男女的初始显示
    }
  },
  methods: {
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      try {
        // 服务端api更新用户性别
        await updateUserProfile({
          gender: this.defaultIndex
        })
        this.$toast.success('保存成功')
        // 修改父组件的gender
        this.$emit('input', this.defaultIndex)
        // 关闭弹出层
        this.$emit('close')
      } catch (err) {
        this.$toast.fail('未修改成功,请稍后重试')
      }
    }
  }
}
</script>

<style>

</style>
