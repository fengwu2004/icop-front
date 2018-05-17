<template>
  <div class="imagemain">
    <div>
      <span>主题图片</span>
      <div style="background: #E0E5EE;padding: 2rem 2rem 1rem;">
        <div class="imagecroppaouter">
          <img v-show="dataUrl" id="imagecropper_item" :src="dataUrl" alt="Picture" style="max-width: 100%;">
          <div v-show="!dataUrl" style="display: flex;height: 100%;align-items: center;justify-content: center;" @click="upload">
            <input id="addfile-btn" ref="input" class="sr-only" type="file" style="display: none" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff" @input="imagechange"/>
            <span style="font-size: 2rem">点击上传</span>
          </div>
        </div>
        <div style="display: flex;width: 100%;justify-content: center;margin-top: 1rem" :style="{visibility:dataUrl ? 'visible' : 'hidden'}">
          <el-button @click="outputImg" size="mini" v-show="imageAttacted">确定</el-button>
          <el-button @click="reloadImage" size="mini">重新上传</el-button>
        </div>
      </div>
      <div style="margin-top: 1rem;">
        <span class="helpertip">为了更好的显示在捷生活APP首页的信息卡片列表里面，图片尺寸要求</span><span class="focustip">长宽690*240px</span>
      </div>
    </div>
    <div v-show="imageAttacted">
      <span>手机效果预览</span>
      <div style="padding: 1rem;box-shadow: 0 8px 20px 0 #D9D9DD;">
        <div style="width: 460px;height: 160px;overflow: hidden;">
          <img id="preview"/>
        </div>
      </div>
      <span class="helpertip">系统自动按指定尺寸生成</span>
    </div>
  </div>
</template>

<script>

  import './cropper.css'
  import Cropper from 'cropperjs'

  export default {
    created() {

      this.dataUrl = this.initUrl
    },
    methods:{
      upload() {

        document.getElementById("addfile-btn").click();
      },
      outputImg() {

        this.cropper.getCroppedCanvas().toBlob(blob => {

          this.clearImg()

          this.dataUrl = 'https://github.com/fengwu2004/testelementui/blob/master/static/picture.jpg?raw=true'
        })
      },
      clearImg() {

        this.dataUrl = null

        this.$refs.input.value = ''

        if (this.cropper) {

          this.cropper.destroy()
        }

        this.imageAttacted = false
      },
      reloadImage() {

        this.clearImg()

        this.upload()
      },
      imagechange() {

        let file = document.getElementById("addfile-btn").files[0]

        this.dataUrl = URL.createObjectURL(file)

        this.$nextTick(() => {

          this.onimageChange()
        })
      },
      onimageChange() {

        if (this.cropper) {

          this.cropper.destroy()
        }

        this.imageAttacted = true

        let image = document.getElementById('imagecropper_item')

        let preview = document.getElementById('preview')

        preview.src = image.src

        let aspectRatio = 690/240

        let viewMode = 1

        this.cropper = new Cropper(image, {
          aspectRatio,
          viewMode,
          ready() {

            this.imageAttacted = true
          },
          crop(e) {

            var data = e.detail;

            var cropper = this.cropper;

            var imageData = cropper.getImageData();

            var previewWidth = 460;

            var imageScaledRatio = data.width / previewWidth;

            preview.style.width = imageData.naturalWidth / imageScaledRatio + 'px'

            preview.style.height = imageData.naturalHeight / imageScaledRatio + 'px';

            preview.style.marginLeft = -data.x / imageScaledRatio + 'px';

            preview.style.marginTop = -data.y / imageScaledRatio + 'px';
          }
        })
      },
    },
    data() {
      return {
        cropper:null,
        dataUrl:null,
        imageAttacted:false
      }
    },
    props:['initUrl']
  }
</script>

<style rel="stylesheet/scss" scoped lang="scss">

  .imagecroppaouter {

    border: 1px dashed #D0D5E5;
    height: 240px;
    width: 690px;
  }

  .sr-only {

    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .imagemain {

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  $fontcolor:#16325C;

  span {

    color: $fontcolor;
    font-size: 0.9rem;
    font-weight: bold;
    position: relative;
    left: -0.2rem;
  }

</style>
