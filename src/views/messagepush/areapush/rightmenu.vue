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
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
