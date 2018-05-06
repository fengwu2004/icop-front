<template>
  <div>
    <div style="display: flex;width: 100%;justify-content: center">
      <el-button @click="outputImg" size="mini">确定</el-button>
      <el-button @click="cancelImg" size="mini">取消</el-button>
    </div>
    <div class="imagecroppaouter">
      <div style="border: 1px solid #D0D5EF">
        <croppa
          canvas-color="#E0E5EE"
          v-model="myCroppa"
          :show-remove-button="false"
          :placeholder-font-size="20"
          placeholder="点击/拖拽上传"
          :height="160" :width="460">
        </croppa>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods:{
      uploadCroppedImage() {
        this.croppa.generateBlob(
          blob => {
            console.log(blob)
            // write code to upload the cropped image file (a file is a blob)
          },
          'image/jpeg',
          0.8
        ); // 80% compressed jpeg file
      },
      outputImg() {

        let dataUrl = this.croppa.generateDataUrl()

        this.dataUrl = dataUrl
      },
      cancelImg() {

        this.croppa.chooseFile()
      },
    },
    data() {
      return {
        croppa:{},
        dataUrl:null,
      }
    },
  }
</script>

<style rel="stylesheet/scss" scoped lang="scss">

  .imagecroppaouter {

    background: #E0E5EE;
    border: 1px solid #D0D5E5;
    margin-top: 1rem;
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
