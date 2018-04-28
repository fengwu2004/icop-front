<template>
  <div class="content">
    <div class="table">
      <el-table :data="tableData.data" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle">
        <el-table-column prop="userName" label="员工账号" width="200"></el-table-column>
        <el-table-column prop="userindex" label="人员编号" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="telephone" label="联系电话" width="200"></el-table-column>
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

        queryRoleInfo({roleName:name}).then(response => {

          console.log(response)

          Object.assign(this.tableData, response.data)

          this.listLoading = false
        })
      },
      handleManager(index, row) {

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

          return {textAlign:'right'}
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
