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
