<template>
  <scroll-bar>
    <el-menu mode="vertical"
             :select="selectChange"
             :show-timeout="200"
             :default-active="getActivePath($route)"
             :collapse="isCollapse"
             background-color="#e0e5ee"
             text-color="#16325C"
             active-text-color="#FFFFFF" :default-openeds="defaultOpeneds">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods:{
    pathHidden(route) {

      return route && route.meta && route.meta.hidden
    },
    selectChange(value) {

      console.log(value)
    },
    getActivePath(route) {

      if (!this.pathHidden(route)) {

        console.log('active index', route.path)

        return route.path
      }

      return this.getActivePath(route.matched[route.matched.length - 1].parent)
    }
  },
  mounted() {

    console.log('当前路由', this.$route.path)
  },
  data() {
    return {
      defaultActive:'messagepush',
      defaultOpeneds:['messagepush', 'systemadmin']
    }
  },
}
</script>
