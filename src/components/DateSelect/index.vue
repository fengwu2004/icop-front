<template>
  <div class="dateselect">
    <span class="title">统计时间</span>
    <el-radio-group v-model="days">
      <el-radio-button label="今天"></el-radio-button>
      <el-radio-button label="本周"></el-radio-button>
      <el-radio-button label="本月"></el-radio-button>
      <el-radio-button label="本年"></el-radio-button>
    </el-radio-group>
    <div class="intervalselect">
      <span>选择时间:</span>
      <el-date-picker v-model="dayinterval" type="datetimerange" placeholder="选择时间范围"></el-date-picker>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        days: '本周',
        dayinterval: [new Date(2018, 10, 10, 10, 10), new Date(2018, 10, 11, 10, 10)],
      };
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .dateselect {

    display: flex;
    justify-content: space-around;
    align-items: center;

    .title {

      margin-right: 1rem;
    }

    .intervalselect {

      margin-left: 3rem;
    }

    .intervalselect > span {

      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

</style>
