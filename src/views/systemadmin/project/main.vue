<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
      <div class="createsearch">
        <el-input class="input" v-model="queryParam" placeholder="项目编号、项目名称"></el-input>
        <el-button class="search" style="margin-left: 1rem; background-color: #16325C;color: #FFFFFF !important;" @click="handleSearch(queryParam)">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="tip">注：账号初始密码为6个8</div>
      <el-table :data="tableData.data" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle" :max-height="maxheight">
        <el-table-column prop="projectCode" label="项目编号" min-width="150"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" min-width="250"></el-table-column>
        <el-table-column prop="userName" label="管理账号" min-width="200"></el-table-column>
        <el-table-column label="操作" min-width="300">
          <template slot-scope="scope">
            <el-button size="mini" v-if="checkNotAdmin(scope.$index, scope.row)" @click="handleAddAdmin(scope.$index, scope.row)">生成管理账户</el-button>
            <el-button size="mini" v-else @click="handleResetPws(scope.$index, scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <page-widget :total="tableData.totalCount" :pagesizes="[10, 20, 40, 50]" @pageSizeChange="pageSizeChange" @pageChange="pageChange" :pagesize="tableData.pageSize"></page-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import { queryProjectList, add, editPwd  } from '@/api/project'
  import PageWidget from '@/components/PageWidget'
  import BreadCrumb from '@/components/Breadcrumb'
  import { headercell, headercellcenter, normalcell, normalcellcenter } from "@/utils/tablecellstyle";

  export default {
    components: { PageWidget, BreadCrumb },
    data() {
      return {
        maxheight:window.innerHeight - 250,
        queryParam:'',
        listLoading:true,
        searching:false,
        tableData: {
          totalCount:0,
          data:[],
          pageSize:20,
          pageIndex:1,
        },
      }
    },
    created() {

      this.getList()
    },
    methods:{
      headercellstyle({row, rowIndex, columnIndex}){

        return headercell
      },
      cellstyle({row, rowIndex, columnIndex}) {

        return normalcell
      },
      checkNotAdmin(index, row) {

        console.log(project)

        let project = this.tableData.data[index]

        return !project || project.userName == null || project.userName.length == 0
      },
      getRequestData() {
        return {
          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
        }
      },
      getResponseTableData(respData) {

        let tableData = {

          totalCount:respData.total,
          data:respData.list,
          pageSize:respData.pageSize,
          pageIndex:respData.pageNum
        }

        return tableData
      },
      getList() {

        console.log('getList')

        this.listLoading = true

        let data = {
          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
        }

        if (this.searching && this.queryParam && this.queryParam.length > 0) {

          data.queryParam = this.queryParam
        }

        queryProjectList(data).then(response => {

          console.log(response)

          this.tableData = this.getResponseTableData(response.data.respData)

          this.listLoading = false

          this.searching = false
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
      handleAddAdmin(index, row) {

        let project = this.tableData.data[index]

        let data = {
          ProjectCode:project.ProjectCode
        }

        add(data).then(response => {


        })
      },
      handleResetPws(index, row) {

        let project = this.tableData.data[index]

        let data = {

          userId:project.userId
        }

        this.$confirm('此操作将重置账户密码为初始密码（6个8）, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          })
          .then(() => {
              editPwd(data)
          })
          .then(response => {
          this.$message({
            type: 'success',
            message: '重置密码成功!'
          })
        })
      },
      handleSearch(queryParam) {

        if (!queryParam || queryParam.length == 0) {

          return
        }

        this.listLoading = true

        let data = {
          queryParam:queryParam,
          pageIndex:1,
          pageSize:this.tableData.pageSize,
        }

        console.log('search', data)

        queryProjectList(data).then(response => {

          this.tableData = this.getResponseTableData(response.data.respData)

          this.listLoading = false

          this.searching = true
        })
      },
    },
    watch:{
      queryParam(newValue) {

        if (!this.searching) {

          return
        }

        if (!newValue || newValue.length == 0) {

          this.getList()

          this.searching = false
        }
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .navibar {

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #D0D5E5;
  }

  .createsearch {

    display: flex;
    justify-content: center;
    align-items: center;

    .input {

      margin-right: 10px;
      width: 300px;
    }

    .create {
      margin-right: 10px;
    }
  }

  .content {

    width: 100%;
    height: calc(100% - 100px);
    position: relative;
  }

  .pagination {

    margin: 1rem auto;
  }

  .tip {

    margin-top: 1rem;
    margin-bottom: 1rem;
    color: #54698D;
    font-size: 0.8rem;
  }

</style>
