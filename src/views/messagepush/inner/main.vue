<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="navibar">
        <bread-crumb class="breadcrumb"></bread-crumb>
        <el-button v-show="checkActionEnable('create')" @click="createMessage" type="primary" style="margin-left: 1rem; background-color: #FF955B;color: #FFFFFF !important;border-color: #FF955B"><i class="el-icon-plus el-icon--left"></i>新增</el-button>
      </div>
      <div class="content">
        <div class="header" v-show="checkActionEnable('search')">
          <date-select ref="daterange" @daterangechange="onDateRangeChange"></date-select>
          <div class="operatemenu">
            <el-input clearable placeholder="输入主题查询" v-model="queryParam"></el-input><el-button style="margin-left: 1rem; background-color: #16325C;color: #FFFFFF !important;border-color: #16325C" type="primary" @click="handleSearch(queryParam)">查询</el-button>
          </div>
        </div>
        <el-table :data="tableData.data" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle" @filter-change="onFilterChange" :max-height="maxheight">
          <el-table-column prop="msgSubject" label="内容主题" min-width="250"></el-table-column>
          <el-table-column label="发送方式" min-width="150">
            <template slot-scope="scope">
              <span>{{ getPushChannelStr(scope.row.sendType) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="pushStatus" label="发布状态" min-width="150"
                           :filters="pushStatusKeyList"
                           :filter-method="filterTag"
                           :filter-multiple="false"
                           column-key="pushStatus">
            <template slot-scope="scope">
              <span>{{ getPushStatusStr(scope.row.sendStatus) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="strategy" label="发送策略" min-width="150">
            <template slot-scope="scope">
              <span>{{ getStrategyStr(scope.row.sendStrategy) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="planSendTime" label="发送时间" min-width="200">
            <template slot-scope="scope">
              <span>{{ getPlanSendTime(scope.$index, scope.row) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="250">
            <template slot-scope="scope">
              <div v-show="checkEnableOperator(scope.$index, scope.row)">
                <el-button size="mini" @click="handlePush(scope.$index, scope.row)" v-show="checkActionEnable('send')">发布</el-button>
                <el-button size="mini" @click="handleEditor(scope.$index, scope.row)" v-show="checkActionEnable('edit')">修改</el-button>
                <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" v-show="checkActionEnable('delete')">删除</el-button>
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

  import { queryNoticeList, deleteNotice, sendNotice} from "@/api/innermessage";
  import { headercell, headercellcenter, normalcell, normalcellcenter } from "@/utils/tablecellstyle";
  import DateSelect from '@/components/DateSelect'
  import PageWidget from '@/components/PageWidget'
  import BreadCrumb from '@/components/Breadcrumb'
  import { checkRouteAndActionEnable } from "@/permissionCheck";
  import { pushStatusKeyList, noticeTypeKeyList, pushChannelKeyList, strategyKeyList } from "@/utils/constvalues";

  const actioncodes = {
    search:'112100',
    create:'112200',
    edit:'112300',
    delete:'112400',
    send:'112500',
  }

  export default {
    components: { PageWidget, DateSelect, BreadCrumb },
    data() {
      return {
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

        let code = actioncodes[action]

        return checkRouteAndActionEnable(code)
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

          let route = {name:'messagepush_inner_create'}

          this.$router.push(route)
        })
      },
      getPlanSendTime(index, row) {

        let message = this.tableData.data[index]

        if (message.sendStrategy != 'IMMEDIATE') {

          return message.planSendTime
        }

        return ''
      },
      getStrategyStr(strategy) {

        console.log('getStrategyStr')

        for (let i = 0; i < strategyKeyList.length; ++i) {

          let item = strategyKeyList[i]

          if (item.value === strategy) {

            return item.text
          }
        }

        return null
      },
      getPushChannelStr(pushChannel) {

        for (let i = 0; i < pushChannelKeyList.length; ++i) {

          let item = pushChannelKeyList[i]

          if (item.value === pushChannel) {

            return item.text
          }
        }

        console.log(pushChannel)

        return null
      },
      getMessageTypeStr(type) {

        for (let i = 0; i < messageTypeKeyList.length; ++i) {

          let item = messageTypeKeyList[i]

          if (item.value === type) {

            return item.text
          }
        }

        console.log(type)

        return null
      },
      getPushStatusStr(sendStatus) {

        if (sendStatus === '0') {

          return '未发布'
        }

        return '已发布'
      },
      getQueryParams() {

        let data = {
          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
        }

        let daterange = this.$refs.daterange.dayinterval

        if (daterange && daterange.length == 2) {

          data.beginTime = daterange[0].getTime()

          data.endTime = daterange[1].getTime()
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

        queryNoticeList(data).then(respData => {

          this.tableData = this.getResponseTableData(respData)

        })
          .catch()
          .finally(() => {

          this.listLoading = false
        })
      },
      getResponseTableData(respData) {

        let msgList = respData.list

        let tableData = {

          totalCount:respData.total,
          data:msgList,
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
      filterTag(value, row) {

        return row.sendStatus === value;
      },
      handleEditor(index, row) {

        let message = this.tableData.data[index]

        this.$store.dispatch('setMessage', message).then(() => {

          let route = {name:'messagepush_inner_create', meta:{isCreate:true}}

          this.$router.push(route)
        })
      },
      handlePush(index, row) {

        let message = this.tableData.data[index]

        if (message.sendStrategy == 'TIMES' && new Date().getTime() > new Date(message.planSendTime).getTime()) {

          this.$message.error('发布失败，已过计划发布时间');

          return
        }

        let data = {messageId:message.messageId}

        console.log('发送', data)

        sendNotice(data).then(() => {

          this.$message({
            type: 'success',
            message: '发布成功!'
          });

          this.getList()
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

          deleteNotice(data).then(response => {

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

        queryNoticeList(data).then(respData => {

          this.tableData = this.getResponseTableData(respData)

          this.listLoading = false
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
