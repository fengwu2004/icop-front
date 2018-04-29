<template>
  <div class="content">
    <div class="table">
      <el-table :data="tableData.data" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle" max-height="700">
        <el-table-column prop="userName" label="员工账号" width="200"></el-table-column>
        <el-table-column prop="personCode" label="人员编号" width="200"></el-table-column>
        <el-table-column prop="name" label="姓名" width="200"></el-table-column>
        <el-table-column prop="sex" label="性别" width="200"></el-table-column>
        <el-table-column prop="telephone" label="联系电话" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" @click="handleChangePwd(scope.$index, scope.row)">重置密码</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">注销账户</el-button>
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

  import { queryUserList } from '@/api/user'
  import { default as PageWidget } from '@/components/PageWidget'
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
      }
    },
    created() {

      this.getList()
    },
    methods:{
      getList() {

        console.log('getList')

        this.listLoading = true

        let data = {
          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
        }

        queryUserList(data).then(response => {

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

        let data = {
          name:name,
          personCode:name,
          pageIndex:0,
          pageSize:this.tableData.pageSize,
        }

        queryUserList(data).then(response => {

          console.log(response)

          Object.assign(this.tableData, response.data)

          this.listLoading = false
        })
      },
      handleEdit(index, row) {

        let user = this.tableData.data[index]

        this.$store.dispatch('setCurrentUser', user)

        let router = {name:'edituser'}

        this.$router.push(router)
      },
      handleChangePwd(index, row) {

        let role = this.tableData.data[index]

        let router = {name:'editroledetails', params:{role:role}}

        this.$router.push(router)
      },
      headercellstyle({row, rowIndex, columnIndex}){

        if (columnIndex == 5) {

          return {textAlign:'center'}
        }

        return {textAlign:'left'}
      },
      cellstyle({row, rowIndex, columnIndex}) {

        if (columnIndex == 5) {

          return {textAlign:'center'}
        }

        return {textAlign:'left'}
      },
    }
  }
</script>

<style scoped>

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
