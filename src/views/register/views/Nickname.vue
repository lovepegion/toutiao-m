<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="输入昵称"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 1级-1登录表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      ref="login-form"
      validate-first
      @failed="onFailed"
    >
      <!-- 2级-1信息输入 -->
      <van-field
        name="nickname"
        v-model="user.nickname"
        maxlength="10"
        left-icon="user-circle-o"
        placeholder="请输入2-10位昵称"
        :rules="formRules.nickname"
      />
      <!-- 2级-2登录按钮 -->
      <div class="login-btn-wraper">
        <van-button class="login-btn" type="info" block @click="onFinishRegister" :loading='isLoading'>提交注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { sendRegister } from '@/api/user'
export default {
  name: 'Nickname',
  data () {
    return {
      user: {
        nickname: '' // 昵称
      },
      formRules: {
        nickname: [
          { required: true, message: '请输入昵称' },
          { pattern: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){2,10}$/, message: '昵称格式错误' }
        ]
      },
      isLoading: false
    }
  },
  methods: {
    // 表单用户名出错信息
    onFailed (err) {
      console.log(err)
      if (err.errors[0]) {
        this.$toast({
          message: err.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送注册信息
    async onFinishRegister () {
      this.$store.state.user.nickname = this.user.nickname //
      this.isLoading = true
      try {
        const { data } = await sendRegister({
          captcha: this.$store.state.user.captcha,
          phone: this.$store.state.user.phone,
          password: this.$store.state.user.password,
          nickname: this.user.nickname
        })
        this.isLoading = false
        console.log(data)
        this.$toast.success('注册成功')
        this.$router.push('/my')
      } catch (err) {
        console.log('注册失败，请稍后再试', err)
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .send-btn {
    width: 86px;
    height: 23px;
    background-color: #ededed;
  }
  .login-btn-wraper {
    margin-top: 70px;
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
