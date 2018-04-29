<template>
  <el-dialog :visible.sync="dialogVisible">
    <div class="table">
      <div class="header">
        <span style="font-size: 1.2rem;">人员选择</span>
        <div style="display: flex; align-items: center; justify-content: center;">
          <el-input style="margin-right: 1rem;" placeholder="按人员编号/姓名"></el-input>
          <el-button style="margin-left: 1rem" type="primary">查询</el-button>
        </div>
      </div>
      <el-table :current-change="handleSelectChange" :data="tableData.data" v-loading="listLoading" max-height="400" highlight-current-row>
        <el-table-column prop="userName" label="员工账号" width="250"></el-table-column>
        <el-table-column prop="personCode" label="人员编号" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="sex" label="性别" width="150"></el-table-column>
        <el-table-column prop="telephone" label="联系电话"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <page-widget :total="tableData.totalCount" :pagesizes="[10, 20, 40, 50]" @pageSizeChange="pageSizeChange" @pageChange="pageChange" :pagesize="tableData.pageSize"></page-widget>
    </div>
    <div class="btns">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSelect">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import { queryPersonList } from '@/api/user'
  import { default as PageWidget } from '@/components/PageWidget'
1
  export default {
    components: { PageWidget },
    methods:{
      handleSelectChange(currentRow, oldCurrentRow) {

        console.log('选择改变')

        console.log(currentRow, oldCurrentRow)
      },
      handleSelect() {

      },
      handleSearch(name) {

        console.log('search', name)

        this.listLoading = true

        queryPersonList({roleName:name}).then(response => {

          console.log(response)

          Object.assign(this.tableData, response.data)

          this.listLoading = false
        })
      },
      pageSizeChange(pageSize){

        if (pageSize == this.tableData.pageSize) {

          return
        }

        this.tableData.pageSize = pageSize

        this.tableData.pageIndex = 1

        this.getList()
      },
      pageChange(pageIndex) {

        this.tableData.pageIndex = pageIndex

        this.getList()
      },
      getList() {

        console.log('getList')

        this.listLoading = true

        let data = {
          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
        }

        queryPersonList(data).then(response => {

          console.log(response)

          Object.assign(this.tableData, response.data)

          this.listLoading = false
        })
      },
      show() {

        console.log('show')

        this.dialogVisible = true
      },
      handleCurrentChange(val) {

        console.log(val)
      }
    },
    created() {

      this.getList()
    },
    data() {
      return {
        dialogVisible:false,
        listLoading:true,
        tableData: {
          totalCount:0,
          data:null,
          pageSize:20,
          totalPage:0,
          pageIndex:1,
        },
      }
    }
  };
</script>

<style scoped>

  .table {

    width: 96%;
    margin: auto;
  }

  .pagination {

    margin-top: 1rem;
  }

  .el-table >>> th {

    background: #d0d5e5;
  }

  .header {

    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btns {

    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
