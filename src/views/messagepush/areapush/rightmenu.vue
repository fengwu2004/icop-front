<template>
  <div class="rightmenu">
    <el-button @click="create">新增</el-button>
  </div>
</template>

<script>
export default {

  methods:{
    search() {

    },
    create() {

      this.$router.push({name:'createuser'})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .rightmenu {
    display: flex;
    justify-content: center;
    align-items: center;
    background: green;
  }
</style>
