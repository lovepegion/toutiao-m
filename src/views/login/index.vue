<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 1级-1登录表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      ref="login-form"
      validate-first
      @submit="onLogin"
      @failed="onFailed"
    >
      <!-- 2级-1信息输入 -->
      <van-field
        name="mobile"
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
      <!-- 2级-2登录按钮 -->
      <div class="login-btn-wraper">
        <van-button class="login-btn" type="info" block>登录</van-button><br>
      </div>
    </van-form>
    <div class="login-btn-wraper">
      <van-button class="login-btn" type="info" block to="/register">去注册</van-button>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'vant'
import { login } from '@/api/user.js'
import { setItem } from '@/utils/storage'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        phone: '', // 手机号
        password: '' // 验证码
      },
      formRules: {
        phone: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { pattern: /^[\da-zA-Z~!@#$%^&*]{6,18}/, message: '密码格式错误' }
        ]
      }
    }
  },
  methods: {
    async onLogin () {
      this.$store.state.user.phone = this.user.phone
      this.$store.state.user.password = this.user.password // 更新store数据
      this.$toast.loading({
        message: '登录中...', // 提示文本
        fobidClick: true, // 禁止背景点击
        duration: 3000 // 展示时长，0不会消失
      })
      try {
        const { data } = await login(this.user)
        console.log(data)
        this.$toast.success('登录成功')
        this.$store.state.user.token = data.token // 登录后，将后台的token存储在vuex上
        setItem('token', data.token) // 将token存入本地
        this.$store.state.profile = data.profile // 用户资料存入vuex
        setItem('profile', data.profile) // 用户资料存入本地
        this.$store.commit('removeCachePages', 'LayoutIndex') // 登录后移除上次layoutindex页面的缓存
        // this.$router.back() // 登录成功返回原来的浏览页面,但这种方式有缺陷，比如从百度页面直接输入地址登录，则登录成功会返回百度页
        this.$router.push(this.$route.query.redirect || '/') // 从组件内的某个页面而来就跳转回，如果从其他地方登录就跳转到主页，京东就是这么做的
      } catch (err) {
        console.log(err)
        console.log('登录失败')
        this.$toast.fail('登录失败')
      }
    },
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
