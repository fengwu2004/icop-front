<template>
  <transition name="fade" mode="out-in">
    <div class="content">
      <div>通知内容<span>(限2000个字)</span></div>
      <div class="richtextinput">
        <rich-text-editor :text="content" @editorChange="editorChange"></rich-text-editor>
      </div>
      <div class="btns">
        <el-button>上一步</el-button>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button>取消</el-button>
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
      save() {

        console.log(this.content)
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
