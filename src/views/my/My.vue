<template>
  <div class="my-container">
    <!-- 0登陆后显示的用户信息 -->
    <van-cell-group v-if="$store.state.user.token" class="my-info">
      <!-- 0_1基本资料 -->
      <van-cell
        :border="false"
        class="base-info"
        title="单元格"
        value="内容"
        center
      >
        <van-image
          class="avatar"
          slot="icon"
          width="66"
          height="66"
          round
          fit="cover"
          :src="profile.avatarUrl"
        />
        <div class="name" slot="title">{{profile.nickname}}</div>
        <van-button
          class="update-btn"
          size="small"
          round
          to="/user/profile"
        >编辑资料</van-button>
      </van-cell>
      <!-- 0_2头条关注粉丝获赞 -->
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 1没有登录时显示登录注册按钮 -->
    <div v-else class="not-login">
      <!-- 手动跳转登录页登录后，路由会根据redirect回到my页面 -->
      <div @click="$router.push({
        name: 'login',
        query: {
          redirect: '/my'
        }
      })">
        <van-image
          round
          width="66"
          height="66"
          fit="cover"
          :src="require('./flash.jpg')"
        ></van-image>
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <!-- 2收藏历史 -->
    <van-grid class="collection-history mb-14" :column-num="2">
      <van-grid-item class="collection" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="history" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>
    <!-- 3消息通知 -->
    <van-cell title="消息通知" is-link url="/" />
    <!-- 4智能客服 -->
    <van-cell
      class="mb-4"
      title="智能客服"
      is-link to="/user/chat"
    />
    <!-- 5退出登录 -->
    <van-cell v-if="$store.state.user.token" class="logout" title="退出登录" @click="onLogout" />
    <!-- 6底部导航栏 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/radio">电台</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/vedio">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { removeItem } from '@/utils/storage'
import { getUserfollows } from '@/api/user.js'
export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapState(['profile'])
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗?'
      })
        .then(() => {
          // on confirm
          this.$store.state.user.token = '' // 清除用户登录状态
          removeItem('token')
          this.$store.state.profile = null
          removeItem('profile')
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  async mounted () {
    const { data } = await getUserfollows(1895806382)
    console.log('follows', data)
  }
}
</script>

<style lang="less">
.my-container {
  .my-info {
    background: url("./banner-my.jpg") no-repeat;
    .base-info {
      box-sizing: border-box;
      background-color: unset;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          text-align: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    .van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    height: 180px;
    background: url(./banner-my.jpg) no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
  .collection-history {
    height: 70px;
    .toutiao {
      font-size: 22px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .van-grid-item__text {
      font: 14px;
      color: #333;
    }
  }
  .logout {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
  .mb-14 {
    margin-bottom: 14px;
  }
}
</style>
