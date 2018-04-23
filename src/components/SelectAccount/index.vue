<template>
  <el-dialog title="人员选择" :visible.sync="dialogVisible">
    <div class="table">
      <el-table :data="tableData" :show-header="true" :highlight-current-row="true">
        <el-table-column prop="count" label="员工账号" width="200" @current-change="handleCurrentChange"></el-table-column>
        <el-table-column prop="userindex" label="人员编号" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="phone" label="联系电话" width="200"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <page-widget :total="100" :pagesizes="[10, 20, 40, 50]"></page-widget>
    </div>
  </el-dialog>
</template>

<script>

  import { default as PageWidget } from '@/components/PageWidget'
1
  export default {
    components: { PageWidget },
    methods:{

      show() {

        this.dialogVisible = true
      },

      handleCurrentChange(val) {

        console.log(val)
      }
    },
    data() {
      return {
        selected:false,
        tableData: [
          {
            count: 'jieshun@jiehusn.com',
            userindex:'9527',
            name:'捷顺NO1',
            sex:'男',
            phone:'17788888888',
            selected:false
          },
          {
            count: 'jieshun@jiehusn.com',
            userindex:'9527',
            name:'捷顺NO1',
            sex:'男',
            phone:'17788888888',
            selected:false
          },
          {
            count: 'jieshun@jiehusn.com',
            userindex:'9527',
            name:'捷顺NO1',
            sex:'男',
            phone:'17788888888',
            selected:false
          },
          {
            count: 'jieshun@jiehusn.com',
            userindex:'9527',
            name:'捷顺NO1',
            sex:'男',
            phone:'17788888888',
            selected:false
          }],
        dialogVisible : false
      };
    }
  };
</script>

<style scoped>

  .pagination {

    margin-top: 2rem;
  }

  .el-table >>> th {

    background: #d0d5e5;
  }

</style>
