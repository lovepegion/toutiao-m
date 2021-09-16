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
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
      />
      <van-field
        name="code"
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down :time="1000 * 60" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false" />
          <van-button v-else class="send-btn" size="small" round @click.prevent="onSendSms" :loading='isSendSmsLoading'>发送验证码</van-button>
        </template>
      </van-field>
      <!-- 2级-2登录按钮 -->
      <div class="login-btn-wraper">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// import { Toast } from 'vant'
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登录中...', // 提示文本
        fobidClick: true, // 禁止背景点击
        duration: 3000 // 展示时长，0不会消失
      })
      try {
        const res = await login(this.user)
        console.log(res)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', res.data.data) // 登录后，将后台的token存储在vuex上
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
    },
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        this.isSendSmsLoading = true // 手机号码验证通过后，按钮显示loading防止网络慢,用户多次触发
        await sendSms(this.user.mobile)
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁了，稍后重试'
        } else if (err.name === 'mobile') {
          message = err.message // 表单验证失败的提示
        } else {
          message = '发送失败，请稍后重试' // 未知错误
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false // 不管请求成功与否，都要关闭按钮的loading状态
      // this.$refs['login-form'].validate('mobile').then(
      //   data => {
      //     console.log(data)
      //   }
      // )
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
