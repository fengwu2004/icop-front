<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
    </div>
    <div class="content">
      <div class="tip">注：账号初始密码为6个8</div>
      <div class="table">
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
      </div>
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
        maxheight:window.innerHeight - 200,
        listLoading:true,
        tableData: {
          totalCount:0,
          data:null,
          pageSize:20,
          totalPage:0,
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
      getList() {

        console.log('getList')

        this.listLoading = true

        queryProjectList(this.getRequestData()).then(response => {

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
      handleSearch(name) {

        console.log('search', name)

        this.listLoading = true

        let data = {
          projectName:name,
          projectCode:name,
          pageIndex:0,
          pageSize:this.tableData.pageSize,
        }

        queryProjectList(data).then(response => {

          console.log(response)

          Object.assign(this.tableData, response.data)

          this.listLoading = false
        })
      },
    }
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

  .content {

    width: 100%;
    height: calc(100% - 100px);
    position: relative;
  }

  .createsearch {

    display: flex;
    justify-content: center;
    align-items: center;

    .input {
      margin-right: 10px;
    }

    .create {
      margin-right: 10px;
    }
  }

  .table {

    width: 100%;
    overflow-y: scroll;
    max-height: calc(100% - 5rem);
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
