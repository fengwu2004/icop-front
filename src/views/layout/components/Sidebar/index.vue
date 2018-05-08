<template>
  <scroll-bar>
    <el-menu mode="vertical"
             :select="selectChange"
             :show-timeout="200"
             :default-active="$route.name"
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
    selectChange(value) {

      console.log(value)
    },
  },
  data() {
    return {
      defaultActive:'messagepush',
      defaultOpeneds:['messagepush', 'systemadmin']
    }
  },
}
</script>
