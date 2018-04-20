<template>
  <div class="rightmenu">
    <el-input class="input" placeholder="请输入角色名称查询"></el-input>
    <el-button class="search">查询</el-button>
    <el-button class="create">创建</el-button>
  </div>
</template>

<script>
export default {

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .rightmenu {
    display: flex;
    justify-content: center;
    align-items: center;

    .input {
      margin-right: 10px;
    }

    .create {
      margin-right: 10px;
    }
  }
</style>
