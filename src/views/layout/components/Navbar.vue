<template>
  <el-menu class="navbar" mode="horizontal">
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <!--<router-view class="rightmenu" name="rightmenu"></router-view>-->
  </el-menu>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    components: { Breadcrumb },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    background: #d0d5e5;
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;

    .breadcrumb-container {

      float: left;
    }

    .rightmenu {
      float: right;
    }
  }
</style>
