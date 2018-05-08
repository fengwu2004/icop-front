<template>
  <div>
    <template v-for="item in routes" v-if="!item.hidden && item.children">
      <el-submenu :index="getMenuIndex(item)" :key="item.name">
        <template slot="title">
          <span v-if="item.meta && item.meta.title" slot="title" style="color:#445577">{{ generateTitle(item.meta.title) }}</span>
        </template>
        <template v-for="(child, index) in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if=" child.children && child.children.length > 0 && hasOneShowingChildren(child.children)" :routes="[child]" :key="child.path"></sidebar-item>
          <router-link v-else :to="composePath(item, child)" :key="child.name">
            <el-menu-item :index="composePath(item, child)">
              <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
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
    getMenuIndex(item) {

      const mIndex = item.name||item.path

      return mIndex
    },
    composePath(item, child) {

      let value = item.path+'/'+child.path

      return value
    },
    hasOneShowingChildren(children) {

      const showingChildren = children.filter(item => {

        return !item.hidden
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

