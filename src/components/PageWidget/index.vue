<template>
  <div class="pagewidget">
    <div class="left">
      <span class="pageinfo">共有{{total}}条,每页显示: </span>
      <el-select size="mini" v-model="value" placeholder="请选择">
        <el-option v-for="(item, index) in pagesizes" :key="PageWidget" :label="getLabel(item)" :value="item"></el-option>
      </el-select>
    </div>
    <div class="right">
      <el-pagination background :page-sizes="pagesizes" :page-size="value" layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<style>

</style>

<script>
  export default {
    props:['total', 'pagesizes'],
    data() {
      return {
        value:10,
      }
    },
    methods:{
      getLabel(item){

        return item + '条'
      },
      cellstyle({row, rowIndex, columnIndex}) {

        return {textAlign:'left'}
      },
      handleEdit(index, row) {

        console.log(PageWidget, row);
      },
      handleDelete(index, row) {

        console.log(PageWidget, row);
      },
      headerrow({row, rowIndex}) {

        if (rowIndex === 0) {

          return {backgroundColor:'blue'}
        }
      }
    }
  }
</script>

<style scoped>

  .pagewidget {

    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  .pagewidget > .left > .pageinfo {

    font-size: 0.8rem;
  }

  .el-select >>> .el-input {
      width:100px
  }

</style>
