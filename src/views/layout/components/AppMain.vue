<template>
  <section class="app-main" style="min-height: 100%">
    <navbar></navbar>
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  import { default as Navbar } from './Navbar'

  export default {
    name: 'AppMain',
    components: { Navbar },
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      }
    }
  }
</script>
