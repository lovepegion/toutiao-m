<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 信息 -->
    <!-- 点击头像后弹出文件选项,注意图片类型选择，*表示所有 -->
    <!-- 如设置为图片类型，在手机上就会进入图库，不设置就进入文件管理器 -->
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    >
    <van-cell title="头像" center is-link @click="$refs.file.click()">
      <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow=true"></van-cell>
    <van-cell title="性别" is-link :value="user.gender===0?'男':'女'" @click="isEditGenderShow=true"></van-cell>
    <van-cell title="生日" is-link :value="user.birthday" @click="isEditBirthdayShow=true"></van-cell>
    <!-- 修改昵称弹出层 -->
    <van-popup v-model="isEditNameShow" position="bottom" :style="{ height: '100%' }">
      <!-- 常用数据可利用v-model实现父子组件通信，v-model就是普通写法的缩写,但只能使用一次 -->
      <!-- ----------- -->
      <!-- 不常用数据可利用.sync修饰符也可以在子组件中直接修改abc的值,下两行注释代码效果一样 -->
      <!-- 父组件1：<UpdateName :abc="user.gender" @update:abc="user.gender=$event"></UpdateName> -->
      <!-- 父组件2：<UpdateName :gender.sync="user.gender"></UpdateName> -->
      <!-- 子组件：可以直接改值：<button @click="$emit('update:abc',0)"></button> -->
      <UpdateName
        v-if="isEditNameShow"
        @close="isEditNameShow=false"
        v-model="user.name"
      ></UpdateName>
    </van-popup>
    <!-- 修改性别弹出层 -->
    <van-popup v-model="isEditGenderShow" position="bottom">
      <UpdateGender
        v-model="user.gender"
        @close="isEditGenderShow=false"
      ></UpdateGender>
    </van-popup>
    <!-- 修改生日弹出层 -->
    <van-popup v-model="isEditBirthdayShow" position="bottom">
      <UpdateBirthday
        v-if="isEditBirthdayShow"
        v-model="user.birthday"
        @close="isEditBirthdayShow=false"
      ></UpdateBirthday>
    </van-popup>
    <!-- 修改头像弹出层 -->
    <van-popup
      class="update-photo-popup"
      v-model="isEditPhotoShow"
      position="bottom"
      style="height:100%"
    >
      <UpdatePhoto
        v-if="isEditPhotoShow"
        :file="photoBlob"
        @close="isEditPhotoShow=false"
        @updatePhoto="user.photo=$event"
      ></UpdatePhoto>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/UpdateName.vue'
import UpdateGender from './components/UpdateGender.vue'
import UpdateBirthday from './components/UpdateBirthday.vue'
import UpdatePhoto from './components/UpdatePhoto.vue'
export default {
  name: 'UserProfile',
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false, // 控制姓名编辑弹出层
      isEditGenderShow: false, // 控制性别编辑弹出层
      isEditBirthdayShow: false, // 控制生日编辑弹出层
      isEditPhotoShow: false, // 控制头像编辑弹出层
      photoBlob: '' // 新的文件对象
    }
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    },
    onFileChange () {
      // 展示头像修改弹出层
      this.isEditPhotoShow = true
      // 注意这里的file是个文件对象，不能直接用于src
      const file = this.$refs.file.files[0]
      this.photoBlob = file
      // 清空value，这样才能选择同一张图片，进行裁切
      this.$refs.file.value = ''
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style scoped lang="less">
.update-photo-popup {
  background-color: #000;
}
</style>
