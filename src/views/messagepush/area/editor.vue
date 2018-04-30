<template>
  <transition name="fade" mode="out-in">
    <div class="content">
      <div>通知内容<span>(限2000个字)</span></div>
      <div class="richtextinput">
        <rich-text-editor :text="content" @editorChange="editorChange"></rich-text-editor>
      </div>
      <div class="btns">
        <el-button @click="handleToPreStep">上一步</el-button>
        <el-button type="primary" @click="HandleSave">保存</el-button>
        <el-button @click="handelCancel">取消</el-button>
      </div>
    </div>
  </transition>
</template>

<script>

  import richTextEditor from '@/components/richTextEditor'

  export default {
    components: { richTextEditor },
    data() {
      return {
        content:'',
      }
    },
    methods: {
      editorChange(html) {

        this.content = html
      },
      HandleSave() {

        console.log(this.content)
      },
      handleToPreStep() {

        this.$router.go(-1)
      },
      handelCancel() {

        this.$router.go(-2)
      },
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">

  .content {

    width: 50%;
    margin: 2rem auto;
  }

  .richtextinput {

    margin-top: 1rem;
    height: 24rem;
  }

  .btns {

    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

</style>
