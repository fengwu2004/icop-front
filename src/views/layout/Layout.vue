<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <app-header-bar></app-header-bar>
    <div class="main-container">
      <div class="sidebar-container">
        <side-bar></side-bar>
      </div>
      <div class="appmain-container">
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>

  import { SideBar, AppMain, AppHeaderBar } from "@/views/layout/components"

  export default {
    name: 'layout',
    components: {
      SideBar,
      AppMain,
      AppHeaderBar
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .main-container {
    position: relative;
    height: calc(100% - 50px);
    transition: margin-left .28s;
    display: flex;
    justify-content: center;
  }

  .sidebar-container {

    z-index: 1001;
    width: 180px !important;
    height: 100%;
    background-color: red !important;

    a {
      display: inline-block;
      width: 100%;
    }
    .svg-icon {
      margin-right: 16px;
    }
    .el-menu {
      border: none;
      width: 100% !important;
    }
  }

  @mixin clearfix {
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .appmain-container {

    width: calc(100% - 180px);
    height: 100%;
    background: green;
  }

</style>
