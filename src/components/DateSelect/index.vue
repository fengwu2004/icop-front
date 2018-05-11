<template>
  <div class="dateselect">
    <span class="title">统计时间</span>
    <el-radio-group v-model="days" @change="dayschange" size="small">
      <el-radio-button label="今天" size="small"></el-radio-button>
      <el-radio-button label="本周" size="small"></el-radio-button>
      <el-radio-button label="本月" size="small"></el-radio-button>
      <el-radio-button label="本年" size="small"></el-radio-button>
    </el-radio-group>
    <div class="intervalselect">
      <span class="title">选择时间:</span>
      <el-date-picker v-model="dayinterval" type="daterange" unlink-panels placeholder="选择时间范围"></el-date-picker>
    </div>
  </div>
</template>

<script>

  import { dateRangeUtilIntance } from "@/utils/dateRange";

  export default {
    data () {
      return {
        days: '本周',
        dayinterval: null,
      };
    },
    mounted() {

      this.days = '本周'

      this.dayinterval = this.getDateRange(this.days)
    },
    methods:{
      refresh() {

        this.dayinterval = this.getDateRange(this.days)

        this.$emit('daterangechange', this.dayinterval)
      },
      getDateRange(value) {

        console.log('getDateRange')

        if (value == '今天') return dateRangeUtilIntance.getCurrentDay()

        if (value == '本周') return dateRangeUtilIntance.getCurrentWeek()

        if (value == '本月') return dateRangeUtilIntance.getCurrentMonth()

        if (value == '本年') return dateRangeUtilIntance.getCurrentYear()
      },
      dayschange(value) {

        this.refresh()
      }
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
      color: #54698D;
      font-size: 0.8rem;
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
