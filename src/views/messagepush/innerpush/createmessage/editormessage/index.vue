<template>
  <transition name="fade" mode="out-in">
    <div class="content">
      <div>通知内容<span>(限2000个字)</span></div>
      <div class="richtextinput">
        <tinymce :height="300" v-model="content"></tinymce>
      </div>
      <div class="btns">
        <el-button>上一步</el-button>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </div>
  </transition>
</template>

<script>

  import Tinymce from '@/components/Tinymce'

  export default {

    components: { Tinymce },

    data() {
      return {
        content:'',
      }
    },
    methods: {

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
  }

  .btns {

    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

</style>
