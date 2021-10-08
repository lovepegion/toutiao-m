<template>
  <div>
    <van-nav-bar
      class="app-nav-bar"
      title="手机验证码"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="tips">
      <p>你的手机号是86-{{this.$store.state.user.phone | toPrivacy}}</p>
      <p>你会收到一条带有验证码的短信，请输入验证码</p>
    </div>
    <div class="number-input" id="my-vcode">
      <input type="tel" maxlength="1" v-model="fourNumerObj.input1" id="input1" @input="getNextFocus(1)"/>
      <input type="tel" maxlength="1" v-model="fourNumerObj.input2" id="input2" @input="getNextFocus(2)"/>
      <input type="tel" maxlength="1" v-model="fourNumerObj.input3" id="input3" @input="getNextFocus(3)"/>
      <input type="tel" maxlength="1" v-model="fourNumerObj.input4" id="input4"/>
    </div>
    <!-- 重新发送验证码 -->
    <div class="reSendCaptcha">
      <van-count-down :time="1000 * 10" format="ss s后可再次发送验证码" v-if="isCountDownShow" @finish="isCountDownShow=false" />
      <van-button v-else class="send-btn" size="small" round @click="onCaptcha" :loading='isSendSmsLoading'>发送验证码</van-button>
    </div>
    <!-- 下一步并校验输入的验证码是否正确 -->
    <div class="login-btn-wraper">
      <van-button class="login-btn" type="info" block @click="onCheckCaptcha">下一步</van-button>
    </div>
  </div>
</template>

<script>
import { getCaptcha, checkCaptcha } from '@/api/user'
export default {
  name: 'Captcha',
  data () {
    return {
      fourNumerObj: {
        input1: '',
        input2: '',
        input3: '',
        input4: ''
      },
      isCountDownShow: true,
      isSendSmsLoading: false
    }
  },
  computed: {
    captcha () {
      return this.fourNumerObj.input1 + this.fourNumerObj.input2 + this.fourNumerObj.input3 + this.fourNumerObj.input4
    }
  },
  mounted: function () {
    //  手机删除按钮监听事件，验证码连续删除
    const vcodeInput = document.getElementById('my-vcode')
    const inputArr = vcodeInput.getElementsByTagName('input')
    for (let i = 0; i < inputArr.length; i++) {
      inputArr[i].addEventListener('keydown', function (event) {
        var evt = event || window.event
        if (inputArr[i].value === '' && evt.keyCode === 8) {
          // 如果为空且按下退回键
          if (i !== 0) {
            inputArr[i - 1].focus()
          }
        }
      })
    }
  },
  filters: {
    toPrivacy (value) {
      return value.split('').map((value, index) => {
        if (index > 2 && index < 7) {
          return '*'
        } else {
          return value
        }
      }).join('')
    }
  },
  methods: {
    getNextFocus: function (param) {
      const curInputObj = document.getElementById('input' + param)
      const nextInputObj = document.getElementById('input' + (param + 1))
      // 如果当前input的值不为空，且下一个input的值为空，下一个input设置聚焦
      if (param && (curInputObj.value || curInputObj.value === 0) && !nextInputObj.value && nextInputObj.value !== 0) {
        nextInputObj.focus()
      }
    },
    async onCaptcha () {
      try { // 请求发送验证码到手机
        this.isSendSmsLoading = true
        const { data } = await getCaptcha(this.$store.state.user.phone)
        console.log(data)
        if (data.code !== 200) {
          this.$toast.fail(data.message)
          this.isSendSmsLoading = false
          return
        }
        this.isSendSmsLoading = false
        this.isCountDownShow = true
      } catch (err) {
        this.$toast.fail('发送验证码失败，请稍后再试')
        this.isSendSmsLoading = false
      }
    },
    async onCheckCaptcha () {
      try {
        const { data } = await checkCaptcha({
          phone: this.$store.state.user.phone,
          captcha: this.captcha
        })
        console.log(data)
        this.$store.state.user.captcha = this.captcha // 将验证码存入vuex的user
        this.$router.push('/nickname')
      } catch (err) {
        this.$toast.fail('验证码错误')
      }
    }
  }
}
</script>

<style scoped lang="less">
.tips {
  font-size: 14px;
  text-align: center;
  padding-top: 50px;
}
.reSendCaptcha {
  height: 50px;
  margin-top: 10px;
  margin-left: 10px;
}
.number-input {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 80px;
}
.number-input input {
  border: none;
  border-bottom: 1px solid #dcdcdc;
  margin: 0 10px;
  width: 50px;
  font-size: 18px;
  height: 44px;
  line-height: 44px;
  text-align: center;
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
</style>
