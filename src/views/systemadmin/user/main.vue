<template>
  <div class="content">
    <div class="table">
      <el-table :data="tableData" :cell-style="cellstyle" :header-cell-style="headercellstyle">
        <el-table-column prop="index" label="" width="100"></el-table-column>
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

  import debugdata from './debugdata'
  import PageWidget from '@/components/PageWidget'

  export default {
    components: { PageWidget },
    data() {
      return {
        tableData: debugdata,
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


      },
      handleSearch(name) {

        console.log('查找名字', name)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .content {
    width: 100%;
    height: 500px;
  }

  .table {
    width: 100%;
    height: 100%;
    background: green;
  }

  .pagination {

  }

</style>
