<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div style="position: absolute;z-index: 0;width: 180px;background: #333333;height: 100%;left: 0;top: 0"></div>
    <div style="z-index: 1">
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

    transition: margin-left .28s;
    display: flex;
  }

  .sidebar-container {

    width: 180px;

    a {

      display: inline-block;
    }

    .svg-icon {

      margin-right: 16px;
    }

    .el-menu {

      border: none;
    }
  }

  .app-wrapper {

    display: flex;
    flex-direction: column;
  }

  .appmain-container {

    width: calc(100% - 180px);
  }

</style>
