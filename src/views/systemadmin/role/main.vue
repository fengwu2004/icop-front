<template>
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
</template>

<script>
  import { queryRoleList, queryRoleInfo } from '@/api/role'
  import PageWidget from '@/components/PageWidget'

  export default {
    components: { PageWidget },
    data() {
      return {
        listLoading:true,
        tableData: {
          totalCount:0,
          data:null,
          pageSize:20,
          totalPage:0,
          pageIndex:1,
        },
        searchResult:null,
      }
    },
    created() {

      this.getList()
    },
    methods:{
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


      },
      handleDelete(index, row) {


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
