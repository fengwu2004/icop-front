<template>
  <div class="app-main">
    <div class="navbar">
      <breadcrumb class="breadcrumb-container"></breadcrumb>
      <router-view class="rightmenu" name="rightmenu"></router-view>
    </div>
    <transition name="fade" mode="out-in">
      <div class="mainframe">
        <router-view class="router-view"></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import { default as Navbar } from './Navbar'

  export default {
    name: 'AppMain',
    components: { Breadcrumb },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  $primcolor:#d0d5e5;

  .app-main {

    width: 98%;
    margin: 2px auto 0;
    min-height: calc(100% - 2px);

    .navbar {

      background: white;
      height: 50px;
      line-height: 50px;
      border-radius: 0px !important;
      border-bottom: 1px solid $primcolor;
      box-shadow: 1px 1px rgba(0, 0, 0, 0.05);

      .breadcrumb-container {

        float: left;
      }

      .rightmenu {

        float: right;
      }
    }

    .mainframe {

      margin-top: 1rem;
    }
  }

</style>
