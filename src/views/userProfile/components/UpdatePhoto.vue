<template>
  <div class="update-photo">
    <img class="image" :src="image" ref="image">
    <van-nav-bar
      class="quit-confirm"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs' // 很好用的纯js图片裁剪工具，vue、react等都能用
export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      type: File, // 这是file文件类型
      required: true
    }
  },
  data () {
    return {
      // 在弹出层里预览图片,图片通过url传递，所以这里要给图片生成一个url
      // createObjectURL接受一个二进制blob对象或者file对象，file对象也属于blob
      // 生成的URL也是blob数据，生命仅存在于它被创建的这个文档里
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => { // 根据文档返回的blob要紧跟一个回调处理，写成promise可以把blob单独拿出来，回调函数也可以单独写
        this.cropper.getCroppedCanvas().toBlob((blob) => { // 获取图片被裁切的部分
          resolve(blob)
        })
      })
    },
    async onConfirm () {
      // 给服务端发api请求
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0 // 展示时间：0表示持续展示
      })
      try {
        // 如果header中content-type要求是multipart/form-data，则一定要提交FormData二进制数据对象，比如上传的文件，不能提交{}对象
        const file = await this.getCroppedCanvas() // 获取文件被裁切部分
        const fd = new FormData() // 生成FormData数据
        fd.append('photo', file)
        await updateUserPhoto(fd)
        this.$toast.success('保存成功')
        // 更新父组件视图
        this.$emit('updatePhoto', window.URL.createObjectURL(file))
      } catch (err) {
        this.$toast.fail('保存失败，请稍后重试')
      } finally {
        // 关闭弹出层
        this.$emit('close')
      }
    }
  },
  mounted () {
    // 获取需要裁切的图片dom
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
    console.log(this.cropper)
  }
}
</script>

<style scoped lang="less">
.quit-confirm {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}
// 下面是官方文档的要求
/* Ensure the size of the image fit the container perfectly */
.image {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
