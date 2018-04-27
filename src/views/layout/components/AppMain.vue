<template>
  <transition name="fade" mode="out-in">
    <div class="mainframe">
      <nav-bar @createNewMessage="createMessage" @createUser="createUser" @searchUser="searchUser"></nav-bar>
      <router-view class="router-view" ref="main"></router-view>
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
        accountcreatesearch:false,
      }
    },
    mounted() {

      this.routerref = this.$refs.main.$refs.main
    },
    methods:{
      searchUser(name) {

        this.routerref.handleSearch(name)
      },
      createUser() {

        let route = {name:'createrole'}

        this.$router.push(route)
      },
      createMessage() {

        let route = {name:'createareamessage'}

        this.$router.push(route)
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
