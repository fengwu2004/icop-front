<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
      <div class="createsearch">
        <el-input class="input" clearable v-model="queryParam" placeholder="请输入人员编号、姓名" v-show="checkActionEnable('search')"></el-input>
        <el-button class="search" @click="searchUser" v-show="checkActionEnable('search')">查询</el-button>
        <el-button class="create" @click="createUser" v-show="checkActionEnable('create')">创建</el-button>
      </div>
    </div>
    <div class="content">
      <div class="table">
        <el-table :data="tableData.data" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle" :max-height="maxheight">
          <el-table-column prop="userName" label="员工账号" min-width="200"></el-table-column>
          <el-table-column prop="personCode" label="人员编号" min-width="200"></el-table-column>
          <el-table-column prop="name" label="姓名" min-width="150"></el-table-column>
          <el-table-column prop="sex" label="性别" min-width="150"></el-table-column>
          <el-table-column prop="telephone" label="联系电话" min-width="200"></el-table-column>
          <el-table-column label="操作" min-width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-show="checkActionEnable('edit')">修改</el-button>
              <el-button size="mini" @click="handleChangePwd(scope.$index, scope.row)" v-show="checkActionEnable('resetpwd')">重置密码</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" v-show="checkActionEnable('delete')">注销账户</el-button>
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

  import { checkRouteAndActionEnable, initpassword } from "@/permissionCheck";
  import { trim } from "@/utils/validate";
  import { queryUserList, deleteUser, editPwd } from '@/api/user'
  import BreadCrumb from '@/components/Breadcrumb'
  import { default as PageWidget } from '@/components/PageWidget'
  import { headercell, headercellcenter, normalcell, normalcellcenter } from "@/utils/tablecellstyle";

  const actioncodes = {
    search:'122100',
    create:'122200',
    edit:'122300',
    detail:'122400',
    resetpwd:'122500',
    delete:'122600',
  }

  export default {
    components: { PageWidget, BreadCrumb },
    data() {
      return {
        maxheight:window.innerHeight - 200,
        queryParam:'',
        listLoading:true,
        searching:false,
        tableData: {
          totalCount:0,
          list:null,
          pageSize:20,
          pageIndex:1,
        },
      }
    },
    created() {

      this.getList()
    },
    methods:{
      checkActionEnable(action) {

        let code = actioncodes[action]

        return checkRouteAndActionEnable(code)
      },
      searchUser() {

        this.handleSearch(this.queryParam)
      },
      createUser() {

        this.$store.dispatch('resetUser').then(() => {

          let route = {name:'systemadmin_user_edit', params:{title:'创建账户'}}

          this.$router.push(route)
        })
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

        this.listLoading = true

        let data = {
          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
        }

        if (this.searching && this.queryParam && this.queryParam.length > 0) {

          data.queryParam = this.queryParam
        }

        console.log(data)

        queryUserList(data).then(response => {

          console.log(response)

          this.tableData = this.getResponseTableData(response.data.respData)

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

        let user = this.tableData.data[index]

        let data = {userId:user.userId}

        this.$confirm('此操作将永久删除账户信息，是否继续？','警告', {

          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'

        }).then(() => {

          deleteUser(data).then(response => {

            this.getList()

            this.$message({
              type: 'success',
              message: '注销成功!'
            });
          })
        }).catch (() => {


        })
      },
      handleSearch(rawqueryParam) {

        let queryParam = trim(rawqueryParam)

        if (!queryParam || queryParam.length == 0) {

          return
        }

        console.log('search', queryParam)

        this.listLoading = true

        let data = {
          queryParam:queryParam,
          pageIndex:1,
          pageSize:this.tableData.pageSize,
        }

        queryUserList(data).then(response => {

          console.log(response)

          this.tableData = this.getResponseTableData(response.data.respData)

          this.listLoading = false

          this.searching = true
        })
      },
      handleEdit(index, row) {

        let user = this.tableData.data[index]

        this.$store.dispatch('setCurrentUser', user).then(() => {

          let route = {name:'systemadmin_user_edit', params:{title:'修改账户'}}

          this.$router.push(route)
        })
      },
      handleChangePwd(index, row) {

        let user = this.tableData.data[index]

        let data = {
          userId:user.userId,
          password:initpassword
        }

        this.$confirm('此操作将重置账户初始密码为888888，是否继续？','警告', {

          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'

        }).then(() => {

          editPwd(data).then((res) => {

            this.$message({
              type: 'success',
              message: '重置成功!'
            });
          })

        }).catch (() => {


        })
      },
      headercellstyle({row, rowIndex, columnIndex}){

        return columnIndex == 5 ? headercellcenter: headercell
      },
      cellstyle({row, rowIndex, columnIndex}) {

        return columnIndex == 5 ? normalcellcenter : normalcell
      },
    },
    watch:{
      queryParam(newValue) {

        if (!this.searching) {

          return
        }

        if (!newValue || newValue.length == 0) {

          this.pageIndex = 1

          this.getList()

          this.searching = false
        }
      }
    },
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">

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
    height: calc(100% - 51px);
    position: relative;
  }

  .table {

    width: 100%;
    overflow-y: scroll;
    max-height: calc(100% - 4rem);
  }

  .pagination {

    margin: 1rem auto;
  }

</style>
