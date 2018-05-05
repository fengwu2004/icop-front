<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
      <div class="createsearch">
        <el-input class="input" v-model="rolename" placeholder="请输入角色名称查询"></el-input>
        <el-button class="search" @click="searchRole">查询</el-button>
        <el-button class="create" @click="createRole">创建</el-button>
      </div>
    </div>
    <div class="content">
      <div class="table">
        <el-table :data="tableData.data" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle" max-height="700" highlight-current-row>
          <el-table-column prop="roleId" label="" width="150"></el-table-column>
          <el-table-column prop="roleName" label="角色名称" width="250"></el-table-column>
          <el-table-column prop="remark" label="备注" width="600"></el-table-column>
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
        <page-widget :total="tableData.totalCount" :pagesizes="[10, 20, 40, 50]" @pageSizeChange="pageSizeChange" @pageChange="pageChange" :pagesize="tableData.pageSize"></page-widget>
      </div>
    </div>
  </div>
</template>

<script>
  import { queryRoleList, queryRoleInfo, deleteRole } from '@/api/role'
  import PageWidget from '@/components/PageWidget'
  import BreadCrumb from '@/components/Breadcrumb'

  export default {
    components: { PageWidget, BreadCrumb },
    data() {
      return {
        rolename:'',
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
      searchRole() {},
      createRole() {},
      getRequestData() {
        return {
          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
        }
      },
      getList() {

        console.log('getList')

        this.listLoading = true

        queryRoleList(this.getRequestData()).then(response => {

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
      handleDetail(index, row) {

        console.log('handleDetail')

        let role = this.tableData.data[index]

        let router = {name:'roledetails', params:{role:role}}

        this.$router.push(router)
      },
      handleManager(index, row) {

        let role = this.tableData.data[index]

        let router = {name:'editroledetails', params:{role:role}}

        this.$router.push(router)
      },
      handleDelete(index, row) {

        let role = this.tableData.data[index]

        let data = {roleId:role.roleId}

        deleteRole(data).then(response => {

          this.getList()
        })
      },
      handleSearch(name) {

        console.log('search', name)

        this.listLoading = true

        queryRoleInfo({roleName:name}).then(response => {

          console.log(response)

          Object.assign(this.tableData, response.data)

          this.listLoading = false
        })
      },
      headercellstyle({row, rowIndex, columnIndex}){

        if (columnIndex == 3) {

          return {textAlign:'center'}
        }

        return {textAlign:'left'}
      },
      cellstyle({row, rowIndex, columnIndex}) {

        if (columnIndex == 3) {

          return {textAlign:'center'}
        }

        return {textAlign:'left'}
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

  .content {
    width: 100%;
  }

  .table {
    width: 100%;
    background: green;
  }

  .pagination {

    margin: 1rem auto;
  }

</style>
