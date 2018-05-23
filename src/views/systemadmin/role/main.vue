<template>
  <div class="rolemain">
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
      <div class="createsearch">
        <el-input class="input" clearable v-model="rolename" placeholder="请输入角色名称查询" v-show="checkActionEnable('search')"></el-input>
        <el-button class="search" @click="handleSearchRole" v-show="checkActionEnable('search')">查询</el-button>
        <el-button class="create" @click="handleCreateRole" v-show="checkActionEnable('create')">创建</el-button>
      </div>
    </div>
    <div class="content">
      <div class="table">
        <el-table :data="tableData.list" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle" :max-height="maxheight" highlight-current-row>
          <el-table-column min-width="150">
            <template slot-scope="scope">
              <span>{{scope.$index + (tableData.pageIndex - 1) * tableData.pageSize + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称" min-width="250"></el-table-column>
          <el-table-column prop="remark" label="备注" min-width="400"></el-table-column>
          <el-table-column label="操作" min-width="300">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDetail(scope.$index, scope.row)" v-show="checkActionEnable('detail')">详细</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-show="checkActionEnable('edit')">修改</el-button>
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

  const actioncodes = {
    search:'121100',
    create:'121200',
    detail:'121300',
    delete:'121400',
    edit:'121500',
  }

  export default {
    components: { PageWidget, BreadCrumb },
    data() {
      return {
        maxheight:window.innerHeight - 200,
        rolename:'',
        searching:false,
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

      console.log(this.$route)
    },
    methods:{
      checkActionEnable(action) {

        let code = actioncodes[action]

        return checkRouteAndActionEnable(code)
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

        if (this.searching && this.roleName && this.roleName.length > 0) {

          data.roleName = this.roleName
        }

        queryRoleList(data).then(respData => {

          this.tableData = this.getResponseTableData(respData)
        })
          .finally(() => {

            this.listLoading = false
          })
      },
      getResponseTableData(respData) {

        let tableData = {

          totalCount:respData.total,
          list:respData.list,
          pageSize:respData.pageSize,
          pageIndex:respData.pageNum
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
      handleEdit(index, row) {

        let role = this.tableData.list[index]

        this.$store.dispatch('setCurrentRole', role).then(res => {

          let router = {name:'systemadmin_role_edit'}

          this.$router.push(router)
        })
      },
      handleDelete(index, row) {

        let role = this.tableData.list[index]

        let data = {roleId:role.roleId}

        console.log('handleDelete')

        this.$confirm('此操作将永久删除角色，是否继续？','警告', {

          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'

        }).then(() => {

          deleteRole(data).then(response => {

            this.getList()

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }).catch (() => {


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

        console.log('search', data)

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

</style>
