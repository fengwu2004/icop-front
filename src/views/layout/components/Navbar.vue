<template>
  <el-menu class="navbar" mode="horizontal">
    <breadcrumb class="breadcrumb-container"></breadcrumb>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: { Breadcrumb },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  background-color: #d0d5e5;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .breadcrumb-container {
    float: left;
  }
}
</style>
