<template>
  <div class="rightmenu">
    <el-button @click="create" type="primary"><i class="el-icon-plus el-icon--left"></i>新增</el-button>
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
    height: 100%;
    display: flex;
    justify-content: center;
    margin-right: 1rem;
    align-items: center;
  }
</style>
