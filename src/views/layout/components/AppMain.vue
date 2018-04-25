<template>
  <transition name="fade" mode="out-in">
    <div class="mainframe">
      <router-view class="router-view"></router-view>
    </div>
  </transition>
</template>

<script>

  export default {

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .mainframe {

    position: relative;
    height: 100%;
    width: 98%;
    margin: 2px auto 0;
    min-height: calc(100% - 2px);
    position: relative;
  }

</style>
