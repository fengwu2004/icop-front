<template>
  <div class="main">
    <div style="min-width: 500px;">
      <span>资产图片</span>
      <div style="background: #E0E5EE;padding: 2rem 0 1rem;margin-top: 1rem;">
        <div class="imagecroppaouter">
          <img v-show="dataUrl" id="imagecropper_item" :src="dataUrl" alt="Picture" style="max-width: 100%;">
          <div v-show="!dataUrl" style="display: flex;height: 100%;align-items: center;justify-content: center;" @click="upload">
            <input id="addfile-btn" ref="input" class="sr-only" type="file" style="display: none" accept=".jpg,.jpeg,.png,.bmp,.tiff" @input="imagechange"/>
            <span style="font-size: 2rem">点击上传</span>
          </div>
        </div>
        <div style="display: flex;width: 100%;justify-content: center;margin-top: 1rem" :style="{visibility:dataUrl ? 'visible' : 'hidden'}">
          <el-button @click="outputImg" size="mini" v-show="imageAttacted">确定</el-button>
          <el-button @click="reloadImage" size="mini">重新上传</el-button>
        </div>
      </div>
      <div style="margin-top: 1rem;">
        <span class="helpertip">为了更好的显示在APP的设备卡片列表里面，图片尺寸要求</span><span class="focustip">长宽690*240px</span>
      </div>
    </div>
    <div v-show="imageAttacted" style="margin-left: 3rem">
      <span>手机效果预览</span>
      <div style="padding: 1rem;box-shadow: 0 8px 20px 0 #D9D9DD;margin-top: 1rem">
        <div style="width: 230px;height: 80px;overflow: hidden;">
          <img id="preview_img_phone"/>
        </div>
      </div>
      <span class="helpertip">系统自动按指定尺寸生成</span>
    </div>
  </div>
</template>

<script>

  import { picFile } from "@/api/fileupload";
  import Cropper from 'cropperjs'
  import './cropper.css'

  export default {
    data() {
      return {
        cropper:null,
        dataUrl:null,
        imageAttacted:false
      }
    },
    props:['initImageUrl'],
    methods:{
      upload() {

        document.getElementById("addfile-btn").click();
      },
      outputImg() {

        this.cropper.getCroppedCanvas().toBlob(blob => {

          let formData = new FormData()

          formData.append('file', blob)

          let params = {
            picType:'JSLIFEMAINPAGECARD',
            productCode:'ICOP',
            imgType:'.jpg'
          }

          picFile(formData, params).then(respData => {

            this.clearImg()

            this.dataUrl = respData.url

            this.$store.dispatch('setMessageImageUrl', this.dataUrl).then(() => {

              this.$message({
                type: 'success',
                message: '裁剪上传成功!'
              });
            })
          })
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

        let preview = document.getElementById('preview_img_phone')

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

            var previewWidth = 230;

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
        imageAttacted:false,
        initialImage:null
      }
    },
    created() {

      this.dataUrl = this.initImageUrl
    },
  }
</script>

<style rel="stylesheet/scss" scoped lang="scss">

  .imagecroppaouter {

    background: white;
    border: 1px dashed #D0D5E5;
    width: 460px;
    height: 162px;
    margin: auto;
  }

  .croppabound {

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imgpreview {

    background: #FFFFFF;
    box-shadow: 0 8px 20px 0 #D9D9DD;
    border-radius: 8px;
    padding: 1rem;
    align-self: flex-start;
    margin-top: 1rem;
  }

  .main {

    display: flex;
    justify-content: space-between;
  }

  $fontcolor:#16325C;

  span {

    color: $fontcolor;
    font-size: 0.9rem;
    font-weight: bold;
    position: relative;
    left: -0.2rem;
  }

  .helpertip {

    color: #445577;
    font-size: 0.7rem;
    font-weight: normal;
  }

  .focustip {

    color: black;
    font-size: 0.7rem;
    font-weight: normal;
  }
</style>
