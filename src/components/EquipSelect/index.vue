<template>
  <div class="typeselect">
    <el-radio-group v-model="type" @change="refresh" size="small">
      <el-radio-button label="全部" size="small"></el-radio-button>
      <el-radio-button label="道闸" size="small"></el-radio-button>
      <el-radio-button label="安检门" size="small"></el-radio-button>
      <el-radio-button label="门禁" size="small"></el-radio-button>
      <el-radio-button label="摄像头" size="small"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        type: '全部'
      };
    },
    mounted() {

      this.days = '全部'
    },
    methods:{
      refresh() {

        this.$emit('equipchange', this.type)
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .typeselect {

    display: flex;
    justify-content: space-around;
    align-items: center;

    .title {

      margin-right: 1rem;
      color: #54698D;
      font-size: 0.8rem;
    }
  }

</style>
