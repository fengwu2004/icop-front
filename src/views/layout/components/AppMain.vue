<template>
  <transition name="fade" mode="out-in">
    <div class="mainframe">
      <nav-bar @createNewMessage="createNewMessage"></nav-bar>
      <router-view class="router-view"></router-view>
    </div>
  </transition>
</template>

<script>

  import NavBar from './NavBar'

  export default {

    components: { NavBar },

    methods:{

      createNewMessage() {

        this.$router.push({name:'createareamessage'})
      }
    }
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
