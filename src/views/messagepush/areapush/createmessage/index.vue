<template>
  <transition name="fade" mode="out-in">
    <div class="content">
      <div class="header">
        <li>主题(限30个字)</li>
        <el-input placeholder="请输入通知标题"></el-input>
      </div>

    </div>
  </transition>
</template>

<script>

  export default {

    data() {
      return {

      }
    },
    methods: {
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">

  .content {

    width: 80%;
    margin: auto;
  }

  .header {

    display: flex;
    justify-content: space-between;

    .dateselect {

      display: flex;
      justify-content: space-around;
    }

    .operatemenu {

      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .el-button {

      margin-left: 1rem;
    }
  }

  .table {

    margin-top: 1rem;
  }

  .headerrowclass {

    background-color: red !important;
  }

  .pagination {

    margin-top: 1rem;
  }

</style>
