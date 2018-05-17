<template>
  <div>
    <template v-for="route in routes" v-if="showRoute(route)">
      <el-submenu :index="getMenuIndex(route)" :key="route.name">
        <span v-if="route.meta && route.meta.title" slot="title" style="color:#445577">{{ generateTitle(route.meta.title) }}</span>
        <template v-for="(child, index) in route.children" v-if="!route.meta || !child.meta.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if=" child.children && child.children.length > 0 && hasOneShowingChildren(child.children)" :routes="[child]" :key="child.path"></sidebar-item>
          <router-link v-else :to="composePath(route, child, false)" :key="child.name">
            <el-menu-item :index="composePath(route, child, true)">
              <svg-icon v-if="child.meta && child.meta.icon" :icon-class="getMenuIcon($route, child)" style="margin-right: 0.5rem"></svg-icon>
              <span v-if="child.meta && child.meta.title" slot="title">{{ generateTitle(child.meta.title) }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  mounted:function() {

  },
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    pathHidden(route) {

      return route && route.meta && route.meta.hidden
    },
    getActiveRouteName(route) {

      if (!this.pathHidden(route)) {

        return route.name
      }

      return this.getActiveRouteName(route.matched[route.matched.length - 1].parent)
    },
    getMenuIcon(activeroute, route) {

      let activeRouteName = this.getActiveRouteName(activeroute)

      if (route.name === activeRouteName) {

        return route.meta.activeicon
      }

      return route.meta.icon
    },
    showRoute(route) {

      return  (!route.meta || !route.meta.hidden) && route.children
    },
    getMenuIndex(item) {

      const mIndex = item.name || item.path

      return mIndex
    },
    composePath(item, child, log) {

      let value = child.path

      console.log('index', value)

      return value
    },
    hasOneShowingChildren(children) {

      const showingChildren = children.filter(item => {

        if (!item.meta) {

          return true
        }

        if (!item.meta.hidden) {

          return true
        }

        return false
      })

      if (showingChildren.length >= 1) {

        return true
      }

      return false
    },
    generateTitle
  }
}
</script>

