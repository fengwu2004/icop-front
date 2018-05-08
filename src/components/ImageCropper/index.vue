<template>
  <div class="main">
    <div style="min-width: 500px">
      <span>主题图片</span>
      <div class="imagecroppaouter">
        <div style="display: flex;width: 100%;justify-content: center;margin-top: 0.5rem" :style="{visibility:imageAttacted ? 'visible' : 'hidden'}">
          <el-button @click="outputImg" size="mini">确定</el-button>
          <el-button @click="cancelImg" size="mini">取消</el-button>
        </div>
        <div class="croppabound">
          <div style="border: 1px solid #D0D5EF;margin-top: 1rem;">
            <croppa
              canvas-color="#E0E5EE"
              v-model="croppa"
              :show-remove-button="false"
              :placeholder-font-size="20"
              placeholder="点击/拖拽上传"
              @new-image="onImageAttatched"
              @image-remove="onImageRemoved"
              :height="160" :width="460">
            </croppa>
          </div>
        </div>
      </div>
      <div style="margin-top: 1rem;">
        <span class="helpertip">为了更好的显示在捷生活APP首页的信息卡片列表里面，图片尺寸要求</span><span class="focustip">长宽690*240px</span>
      </div>
    </div>
    <div v-show="dataUrl != null" style="margin-left: 3rem">
      <span>手机效果预览</span>
      <div class="imgpreview">
        <img :src="dataUrl" width="230" height="80"/>
      </div>
      <div style="margin-top: 1rem;">
        <span class="helpertip">系统自动按指定尺寸生成</span>
      </div>
    </div>
  </div>
</template>

<script>

  import { picFile } from "@/api/fileupload";

  export default {
    methods:{
      outputImg() {

        this.croppa.generateBlob(blob => {

          let formData = new FormData()

          formData.append('file', blob)

          let params = {
            picType:'JSLIFEMAINPAGECARD',
            productCode:'ICOP',
            imgType:'.jpg'
          }

          picFile(formData, params).then(res => {

            console.log(res)

            this.dataUrl = res.url
          })
        })
      },
      cancelImg() {

        this.croppa.remove()

        this.dataUrl = null
      },
      onImageAttatched() {

        this.imageAttacted = true
      },
      onImageRemoved() {

        this.imageAttacted = false
      },
    },
    data() {
      return {
        croppa:{},
        dataUrl:null,
        imageAttacted:false,
      }
    },
  }
</script>

<style rel="stylesheet/scss" scoped lang="scss">

  .imagecroppaouter {

    background: #E0E5EE;
    border: 1px solid #D0D5E5;
    width: 100%;
    height: 240px;
    max-width: 500px;
    margin-top: 1rem;
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
