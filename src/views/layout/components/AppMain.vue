<template>
  <div class="app-main">
    <navbar></navbar>
    <transition name="fade" mode="out-in">
      <div class="mainframe">
        <router-view class="router-view"></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
  import { default as Navbar } from './Navbar'

  export default {
    name: 'AppMain',
    components: { Navbar },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .app-main {

    width: 98%;
    margin: auto;
    min-height: 100%;

    .mainframe {

      margin-top: 2rem;
    }
  }

</style>
