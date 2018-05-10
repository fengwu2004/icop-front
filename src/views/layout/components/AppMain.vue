<template>
  <transition name="fade" mode="out-in">
    <div class="main">
      <router-view class="router-view" ref="main"></router-view>
    </div>
  </transition>
</template>

<script>

  export default {
    data() {

      return {
        createmessage:false,
        createmessageprocess:false,
        usercreatesearch:false,
        accountcreatesearch:false,
      }
    },
    computed:{
      routerref:function() {

        return this.$refs.main.$refs.main
      }
    },
    methods:{
      createUser() {

        let route = {name:'usercreate'}

        this.$router.push(route)
      },
      searchUser(name) {

        this.routerref.handleSearch(name)
      },
      searchRole(name) {

        this.routerref.handleSearch(name)
      },
      createRole() {

        let route = {name:'systemadmin_role_create'}

        this.$router.push(route)
      },
    }
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
