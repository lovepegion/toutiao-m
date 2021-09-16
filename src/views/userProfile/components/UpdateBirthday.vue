<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value) // 这三个都是日期对象，而不是字符串
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      try {
        // 服务端api提交用户新生日-dayjs日期对象转固定格式，或者自己手动提取
        // const date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`
        const date = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfile({
          birthday: date
        })
        console.log(date)
        this.$toast.success('保存成功')
        // 修改父组件的name
        this.$emit('input', date)
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

</style>
