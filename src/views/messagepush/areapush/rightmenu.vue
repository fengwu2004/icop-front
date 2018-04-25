<template>
  <div class="rightmenu">
    <router-view v-if="$route.name == 'createareamessage'" name="rightmenu"></router-view>
    <el-button v-else @click="create" type="primary"><i class="el-icon-plus el-icon--left"></i>新增</el-button>
  </div>
</template>

<script>
export default {

  methods:{
    search() {

    },
    create() {

      this.$router.push({name:'createareamessage'})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .rightmenu {
    height: 100%;
    display: flex;
    justify-content: center;
    margin-right: 1rem;
    align-items: center;
  }
</style>
