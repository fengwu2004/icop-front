<template>
  <transition name="fade" mode="out-in">
    <div class="mainframe">
      <nav-bar @createNewMessage="createMessage" @createuser="createuser"></nav-bar>
      <router-view class="router-view"></router-view>
    </div>
  </transition>
</template>

<script>

  import NavBar from './NavBar'

  export default {

    components: { NavBar },

    data() {

      return {
        createmessage:false,
        createmessageprocess:false,
        usercreatesearch:false,
        accountcreatesearch:false
      }
    },

    methods:{

      createuser() {

        this.$router.push({name:'createuser'})
      },

      createMessage() {

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
