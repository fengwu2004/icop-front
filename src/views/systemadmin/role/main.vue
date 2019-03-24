<template>
  <div class="rolemain">
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
      <el-button @click="handleAdd" type="primary" style="margin-left: 1rem; background-color: #FF955B;color: #FFFFFF !important;border-color: #FF955B"><i class="el-icon-plus el-icon--left"></i>添加管理员</el-button>
    </div>
    <div class="content">
      <div class="table">
        <el-table :data="tableData.list" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle" :max-height="maxheight" highlight-current-row>
          <el-table-column prop="account" label="账号" min-width="250"></el-table-column>
          <el-table-column prop="name" label="用户名" min-width="250"></el-table-column>
          <el-table-column prop="phone" label="手机号" min-width="250"></el-table-column>
          <el-table-column prop="createTimeStr" label="创建时间" min-width="250"></el-table-column>
          <el-table-column label="操作" min-width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-show="checkActionEnable('edit')">编辑</el-button>
              <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" v-show="checkActionEnable('delete')">删除</el-button>
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
  import { checkRouteAndActionEnable } from "@/permissionCheck";
  import { trim } from "@/utils/validate";
  import { queryRoleList, deleteRole } from '@/api/role'
  import PageWidget from '@/components/PageWidget'
  import BreadCrumb from '@/components/Breadcrumb'
  import { headercell, headercellcenter, normalcell, normalcellcenter } from "@/utils/tablecellstyle";

  export default {
    components: { PageWidget, BreadCrumb },
    data() {
      return {
        maxheight:window.innerHeight - 200,
        rolename:'',
        listLoading:true,
        tableData: {
          totalCount:0,
          list:null,
          pageSize:30,
          totalPage:0,
          pageIndex:1,
        },
      }
    },
    created() {

      this.getList()
    },
    methods:{
      checkActionEnable(action) {

        return true
      },
      handleSearchRole() {

        this.handleSearch(this.rolename)
      },
      handleCreateRole() {

        this.$store.dispatch('RESET_ROLE').then(res => {

          let router = {name:'systemadmin_role_edit'}

          this.$router.push(router)
        })
      },
      getList() {

        this.listLoading = true

        let data = {
          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
        }

        queryRoleList(data)
          .then(respData => {

          this.tableData = this.getResponseTableData(respData)
        })
          .catch(res => console.log(res))
          .finally(() => {

            this.listLoading = false
          })
      },
      getResponseTableData(roleList) {

        console.log(roleList)

        let convertDate = roleList.map((item)=>{

          return Object.assign({}, item, {createTimeStr:new Date(item.createTime).toLocaleString()})
        })

        let tableData = {

          totalCount:roleList.length,
          list:convertDate,
          pageSize:this.pageSize,
          pageIndex:this.pageIndex
        }

        return tableData
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

        let role = this.tableData.list[index]

        this.$store.dispatch('setCurrentRole', role).then(res => {

          let router = {name:'systemadmin_role_edit', params:{detail:true}}

          this.$router.push(router)
        })
      },
      handleAdd() {

        this.$store.dispatch('RESET_ROLE').then(res => {

          let router = {name:'systemadmin_role_create'}

          this.$router.push(router)
        })
      },
      handleEdit(index, row) {

        let role = this.tableData.list[index]

        this.$store.dispatch('setCurrentRole', role).then(res => {

          let router = {name:'systemadmin_role_edit'}

          this.$router.push(router)
        })
      },
      handleDelete(index, row) {

        let role = this.tableData.list[index]

        let data = {managerId:role.id, account:role.account}

        console.log('handleDelete')

        let msg = '此操作将永久删除' + role.name + '，是否继续？'

        this.$confirm(msg,'警告', {

          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'

        }).then(() => {

          deleteRole(data)
            .then(response => {

            this.getList()

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        })
          .catch(() => {

        })
      },
      handleSearch(name) {

        if (!name || name.length == 0) {

          return
        }

        this.listLoading = true

        let data = {
          roleName:trim(name),
          pageIndex:1,
          pageSize:this.tableData.pageSize,
        }

        queryRoleList(data).then(respData => {

          this.tableData = this.getResponseTableData(respData)

          this.listLoading = false

          this.searching = true
        })
      },
      headercellstyle({row, rowIndex, columnIndex}){

        return columnIndex == 3 ? headercellcenter: headercell
      },
      cellstyle({row, rowIndex, columnIndex}) {

        return columnIndex == 3 ? normalcellcenter : normalcell
      },
    },
    watch:{
      rolename(newValue) {

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
    width: 100%;
  }

  .rolemain {

    height: 100%;
    position: relative;
  }

  .addRole {

    background: #4B74FF;
    border-radius: 24px;
    font-size: 14px;
    color: white;
    padding: 0.5rem 1rem;
  }

</style>
