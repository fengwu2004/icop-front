<template>
  <transition name="fade" mode="out-in">
    <div class="main">
      <router-view class="router-view" ref="main"></router-view>
    </div>
  </transition>
</template>

<script>
  export default {

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .main {

    width: 98%;
    height: 100%;
    margin: auto;
    position: relative;
  }

</style>
