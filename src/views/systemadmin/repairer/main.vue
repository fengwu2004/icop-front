<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="navibar">
        <bread-crumb class="breadcrumb"></bread-crumb>
        <el-button v-show="checkActionEnable('create')" @click="createMessage" type="primary" style="margin-left: 1rem; background-color: #FF955B;color: #FFFFFF !important;border-color: #FF955B"><i class="el-icon-plus el-icon--left"></i>新增</el-button>
      </div>
      <div class="content">
        <div class="header" v-show="checkActionEnable('search')">
          <el-radio-group v-model="selectedAuditStatus" @change="auditStatusChange" size="small">
            <el-radio-button label="全部" size="small"></el-radio-button>
            <el-radio-button label="已审核" size="small"></el-radio-button>
            <el-radio-button label="未审核" size="small"></el-radio-button>
          </el-radio-group>
          <div class="operatemenu">
            <el-input clearable placeholder="输入姓名查询" v-model="queryParam"></el-input><el-button style="margin-left: 1rem; background-color: #16325C;color: #FFFFFF !important;border-color: #16325C" type="primary" @click="handleSearch(queryParam)">查询</el-button>
          </div>
        </div>
        <el-table :data="tableData.data" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle" @filter-change="onFilterChange" :max-height="maxheight">
          <el-table-column prop="name" label="姓名" min-width="250"></el-table-column>
          <el-table-column prop="company" label="公司名称" min-width="250"></el-table-column>
          <el-table-column prop="phone" label="手机号" min-width="250"></el-table-column>
          <el-table-column prop="status" label="状态" min-width="150">
            <template slot-scope="scope">
              <span>{{ getAuditTypeStr(scope.row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="applyTime" label="申请时间" min-width="200">
            <template slot-scope="scope">
              <span>{{ getPlanSendTime(scope.row.applyTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="status" min-width="250">
            <template slot-scope="scope">
              <div>
                <el-button size="mini" @click="handleAudit(scope.$index, scope.row)" v-show="scope.row.status == 0">审核</el-button>
                <el-button size="mini" @click="handleDetail(scope.$index, scope.row)" v-show="scope.row.status == 1">详情</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <page-widget :total="tableData.totalCount" :pagesizes="[10, 20, 40, 50]" @pageSizeChange="pageSizeChange" @pageChange="pageChange" :pagesize="tableData.pageSize"></page-widget>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  import { checkRouteAndActionEnable } from "@/permissionCheck";

  import { queryUserList, edit} from "@/api/user";

  import { queryAnnouncementList, deleteAnnouncement, sendAnnouncement} from "@/api/areamessage";
  import { headercell, headercellcenter, normalcell, normalcellcenter } from "@/utils/tablecellstyle";
  import DateSelect from '@/components/DateSelect'
  import PageWidget from '@/components/PageWidget'
  import BreadCrumb from '@/components/Breadcrumb'
  import { pushStatusKeyList, noticeTypeKeyList, pushChannelKeyList, strategyKeyList, auditTypeList } from "@/utils/constvalues";

  export default {
    components: { PageWidget, DateSelect, BreadCrumb },
    data() {
      return {
        selectedAuditStatus:'全部',
        queryParam:'',
        maxheight:window.innerHeight - 250,
        pushStatusKeyList:pushStatusKeyList,
        listLoading:true,
        pushStatus:null,
        tableData: {
          totalCount:0,
          data:null,
          pageSize:20,
          totalPage:0,
          pageIndex:1,
        },
      }
    },
    mounted() {

      this.$nextTick(() => {

        this.getList()
      })
    },
    methods:{
      checkActionEnable(action) {

        return true
      },
      checkEnableOperator(index, message) {

        return message.sendStatus == '0'
      },
      onFilterChange(filters) {

        let pushstatus = filters.pushStatus

        this.pushStatus = pushstatus[0]

        this.pageIndex = 1

        this.getList()
      },
      onDateRangeChange() {

        this.pageIndex = 1

        this.getList()
      },
      createMessage() {

        this.$store.dispatch('resetMessage').then(() => {

          let route = {name:'messagepush_area_create'}

          this.$router.push(route)
        })
      },
      getPlanSendTime(timestamp) {

        return new Date(timestamp).toLocaleString()
      },
      auditStatusChange(value){


      },
      getAuditTypeStr(type) {

        for (let i = 0; i < auditTypeList.length; ++i) {

          let item = auditTypeList[i]

          if (item.value === type) {

            return item.text
          }
        }

        return null
      },
      getQueryParams() {

        let data = {
          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
        }

        if (this.searching && this.queryParam && this.queryParam.length > 0) {

          data.msgSubject = this.queryParam
        }

        if (this.pushStatus) {

          data.pushStatus = this.pushStatus
        }

        return data
      },
      getList() {

        this.listLoading = true

        const data = this.getQueryParams()

        queryUserList(data)
          .then(respData => {

          console.log('维修人员列表', respData)

          this.tableData = this.getResponseTableData(respData)

        })
          .catch()
          .finally(() => {

            this.listLoading = false
          })
      },
      getResponseTableData(respData) {

        let repairerList = respData.repairerList

        let tableData = {

          totalCount:respData.totalPage,
          data:repairerList,
          pageSize:respData.pageSize,
          pageIndex:respData.pageIndex
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

        let user = this.tableData.data[index]

        this.$store.dispatch('setCurrentUser', user)
          .then(() => {

          let route = {name:'systemadmin_repairer_detail'}

          this.$router.push(route)
        })
      },
      handleAudit(index, row) {

        let user = this.tableData.data[index]

        this.$store.dispatch('setCurrentUser', user)
          .then(() => {

            let route = {name:'systemadmin_repairer_edit'}

            this.$router.push(route)
          })
      },
      handleDelete(index, row) {

        let message = this.tableData.data[index]

        let data = {messageId:message.messageId}

        this.$confirm('此操作将永久删除此通知，是否继续？','警告', {

          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'

        }).then(() => {

          deleteAnnouncement(data).then(response => {

            this.getList()

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })

        }).catch (() => {


        })
      },
      handleSearch(queryParam) {

        if (!queryParam || queryParam.length == 0) {

          return
        }

        this.listLoading = true

        this.pageIndex = 1

        this.searching = true

        const data = this.getQueryParams()

        console.log('search', data)

        queryAnnouncementList(data).then(respData => {

          this.tableData = this.getResponseTableData(respData)

          this.listLoading = false

        }).catch(res => {

          console.log(res)
        })
      },
      handleEdit(index, row) {

        let message = this.tableData.data[index]

        this.$store.dispatch('setMessage', message).then(() => {

          let router = {name:'messagepush_area_create', meta:{title:'修改通知'}}

          this.$router.push(router)
        })
      },
      headercellstyle({row, rowIndex, columnIndex}){

        return columnIndex == 6 ? headercellcenter: headercell
      },
      cellstyle({row, rowIndex, columnIndex}) {

        return columnIndex == 6 ? normalcellcenter : normalcell
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

  .content {

    margin-top: 1rem;
    width: 100%;
    /*height: calc(100% - 51px);*/
    position: relative;
  }

  .header {

    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;

    .dateselect {

      display: flex;
      justify-content: space-around;
    }

    .operatemenu {

      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .el-button {

      margin-left: 1rem;
    }
  }

  .pagination {

    margin-top: 1rem;
  }

</style>
