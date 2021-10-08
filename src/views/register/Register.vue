<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="手机注册"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 1级-1登录表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      ref="login-form"
      validate-first
      @submit="onCaptcha"
      @failed="onFailed"
    >
      <!-- 2级-1信息输入 -->
      <van-field
        name="phone"
        v-model="user.phone"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="formRules.phone"
      />
      <van-field
        name="password"
        type="password"
        v-model="user.password"
        maxlength="18"
        left-icon="bag-o"
        placeholder="请输入6-18位密码"
        :rules="formRules.password"
      />
      <van-field
        name="passwordConfirm"
        type="password"
        v-model="passwordConfirm"
        maxlength="18"
        left-icon="gem-o"
        placeholder="请再次输入密码"
      />
      <!-- 2级-2登录按钮 -->
      <div class="login-btn-wraper">
        <van-button class="login-btn" type="info" block>发送验证码</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// import { Toast } from 'vant'
import { checkPhone, getCaptcha } from '@/api/user'
export default {
  name: 'Register',
  data () {
    return {
      user: {
        phone: '', // 手机号
        password: '' // 密码
      },
      passwordConfirm: '', // 密码确认
      formRules: {
        password: [
          { required: true, message: '请输入密码' },
          { pattern: /^[\da-zA-Z~!@#$%^&*]{6,18}/, message: '密码格式错误' }
        ],
        phone: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ]
      }
    }
  },
  methods: {
    // 发送短信
    async onCaptcha () {
      if (this.user.password === this.passwordConfirm) { // 如果两次输入密码一样
        try { // 向服务器询问手机号是否可用
          const { data } = await checkPhone(this.user.phone)
          if (data.exist > 0) { // 如果手机号已被注册
            this.$toast.fail('该手机号已被注册')
            return
          }
          this.$store.state.user.phone = this.user.phone // 手机号存入store
          this.$store.state.user.password = this.user.password // 密码存入store
        } catch (err) {
          this.$toast.fail('注册失败，稍后再试')
          return
        }
        try { // 请求发送验证码到手机
          await getCaptcha(this.user.phone)
          this.$router.push('/captcha')
        } catch (err) {
          this.$toast.fail('发送验证码失败，请稍后再试', err)
        }
      } else {
        this.$toast.fail('两次输入的密码不一致')
      }
    },
    // 判断输入的内容是否有格式错误
    onFailed (err) {
      console.log(err)
      if (err.errors[0]) {
        this.$toast({
          message: err.errors[0].message,
          position: 'top'
        })
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
