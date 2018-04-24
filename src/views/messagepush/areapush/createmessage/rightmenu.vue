<template>
  <div class="rightmenu">
    <el-steps :active="active" finish-status="success" :space="500" align-center>
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {

  data() {

    return {

      active:0
    }
  },
  methods:{
    search() {

    },
    create() {


    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .rightmenu {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-right: 1rem;
    align-items: center;
  }
</style>
