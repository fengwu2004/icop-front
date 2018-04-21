<template>
  <div class="main">
    <div class="table">
      <el-table :data="tableData" :show-header="show" :cell-style="cellstyle" :header-cell-style="headercellstyle">
        <el-table-column prop="count" label="员工账号" width="200"></el-table-column>
        <el-table-column prop="userindex" label="人员编号" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" @click="handleManager(scope.$index, scope.row)">重置密码</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">注销账户</el-button>
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

  import { default as PageWidget } from '@/components/PageWidget'
  export default {

    components: {PageWidget},
    data() {
      return {
        tableData: [{
          count: 'jieshun@jiehusn.com',
          userindex:'9527',
          name:'捷顺NO1',
          sex:'男',
          phone:'17788888888',
        }],
        show:true
      }
    },
    methods:{
      headercellstyle({row, rowIndex, columnIndex}){

        if (columnIndex == 5) {

          return {textAlign:'center'}
        }

        return {textAlign:'left'}
      },
      cellstyle({row, rowIndex, columnIndex}) {

        if (columnIndex == 5) {

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

<style scoped>
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
