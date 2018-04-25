<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="navbar">
        <bread-crumb class="breadcrumb-container"></bread-crumb>
        <div class="rightmenu">
          <span>1 填写基本信息</span>
          <span class="line"></span>
          <span>2 填写通知内容</span>
        </div>
      </div>
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
    </div>
  </transition>
</template>

<script>

  import BreadCrumb from '@/components/Breadcrumb'
  import Tinymce from '@/components/Tinymce'

  export default {

    components: { Tinymce, BreadCrumb },

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

  .navbar {

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: red;
  }

  .rightmenu {

    position: relative;
    left: -25%;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .line {

      margin: 0 1rem;
      width: 100px;
      height: 1px;
      background: grey;
    }

    span {

      font-size: 0.6rem;
      color: deepskyblue;
    }
  }

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
