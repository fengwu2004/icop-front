<template>
  <transition name="fade" mode="out-in">
    <div class="header">
      <date-select></date-select>
      <div class="operatemenu">
        <el-input ></el-input><el-button type="primary">查询</el-button>
      </div>
    </div>
  </transition>
</template>

<script>
  import DateSelect from '@/components/DateSelect'

  export default {

    components: { DateSelect },


  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">

  .header {

    display: flex;
    justify-content: space-around;

    .dateselect {

      display: flex;
      justify-content: space-around;
    }

    .operatemenu {

      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }

</style>
