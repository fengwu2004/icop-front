<template>
  <div class="main">
    <div class="table">
      <el-table :data="tableData" :show-header="show" :cell-style="cellstyle" :header-cell-style="headercellstyle">
        <el-table-column prop="index" label="" width="30"></el-table-column>
        <el-table-column prop="name" label="角色名称" width="200"></el-table-column>
        <el-table-column prop="address" label="备注" width="600"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详细</el-button>
            <el-button size="mini" @click="handleManager(scope.$index, scope.row)">管理账户</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <page-widget :total="100" :pagesizes="[10, 20, 40, 50]"></page-widget>
    </div>
  </div>
</template>

<script>

  import PageWidget from '@/components/PageWidget'

  export default {

    components: { PageWidget },

    data() {
      return {
        tableData: [{
          index:1,
          name: '王小虎',
          address: '上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路上海市普陀区金沙江路'
        }],
        show:true
      }
    },

    methods:{
      headercellstyle({row, rowIndex, columnIndex}){

        if (columnIndex == 3) {

          return {textAlign:'center'}
        }

        return {textAlign:'left'}
      },
      cellstyle({row, rowIndex, columnIndex}) {

        if (columnIndex == 3) {

          return {textAlign:'right'}
        }

        return {textAlign:'left'}
      },
      handleDetail(index, row) {


      },
      handleManager(index, row) {


      },
      handleDelete(index, row) {


      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .navbar {

    background: white;
    position: relative;
    height: 50px;
    border-radius: 0px !important;
    border-bottom: 1px solid #d0d5e5;
    box-shadow: 1px 1px rgba(0, 0, 0, 0.05);

  .breadcrumb-container {

    float: left;
  }

  .rightmenu {

    float: right;
    height: 100%;
  }
  }

  .main {
    width: 100%;
    height: 500px;
  }

  .table {

    width: 100%;
    height: 100%;
  }

  .pagination {


  }

  .el-table >>> th {

    background: #d0d5e5;
  }

</style>
