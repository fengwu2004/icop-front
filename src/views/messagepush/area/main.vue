<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="navibar">
        <bread-crumb class="breadcrumb"></bread-crumb>
        <el-button @click="createMessage" type="primary"><i class="el-icon-plus el-icon--left"></i>新增</el-button>
      </div>
      <div class="content">
        <div class="header">
          <date-select></date-select>
          <div class="operatemenu">
            <el-input placeholder="输入主题查询"></el-input><el-button type="primary">查询</el-button>
          </div>
        </div>
        <div class="table">
          <el-table :data="tableData.data" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle" :max-height="maxheight">
            <el-table-column prop="msgSubject" label="内容主题" width="400"></el-table-column>
            <el-table-column label="消息类型" width="150">
              <template slot-scope="scope">
                <span>{{ getMessageTypeStr(scope.row.type) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="发送方式" width="150">
              <template slot-scope="scope">
                <span>{{ getPushChannelStr(scope.row.pushChannel) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="pushStatus" label="发布状态" width="150"
                             :filters="pushStatusKeyList"
                             :filter-method="filterTag"
                             :filter-multiple="false">
              <template slot-scope="scope">
                <span>{{ getPushStatusStr(scope.row.pushStatus) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="strategy" label="发送策略" width="150">
              <template slot-scope="scope">
                <span>{{ getPushStatusStr(scope.row.pushStatus) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="planPushTime" label="计划发送时间" width="250"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">发布</el-button>
                <el-button size="mini" @click="handleManager(scope.$index, scope.row)">修改</el-button>
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
  </transition>
</template>

<script>

  import { headercell, headercellcenter, normalcell, normalcellcenter } from "@/utils/tablecellstyle";
  import { queryplacardList, deletePlacard, editPushStatus } from "@/api/areamessage"
  import DateSelect from '@/components/DateSelect'
  import PageWidget from '@/components/PageWidget'
  import BreadCrumb from '@/components/Breadcrumb'

  const pushStatusKeyList = [{ text: '待推送', value: 'UNPUSH' }, { text: '不推送', value: 'NOPUSH' }, { text: '推送成功', value: 'SUCCESS' }, { text: '推送失败', value: 'FAIL' }]
  const messageTypeKeyList = [{ text: '安全防范公告', value: 'SECURITY' }, { text: '物业风采', value: 'PROPERTY' }, { text: '电梯维修保养', value: 'ELEVATOR' }, { text: '投票及调查互动', value: 'VOTE' }, { text: '商店优惠公告', value: 'COUPONS' }]
  const pushChannelKeyList = [{ text: 'APP推送', value: 'APP' }, { text: '短信', value: 'SMS' }]
  const strategyKeyList = [{ text: '立即生效', value: 'IMMEDIATELY' }, { text: '定时生效', value: 'TIMING' }]

  export default {
    components: { PageWidget, DateSelect, BreadCrumb },
    data() {
      return {
        maxheight:window.innerHeight - 250,
        pushStatusKeyList:pushStatusKeyList,
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
      createMessage() {

        let route = {name:'createareamessage'}

        this.$router.push(route)
      },
      getStrategyStr(strategy) {

        for (let i = 0; i < strategyKeyList.length; ++i) {

          let item = strategyKeyList[i]

          if (item.value === strategy) {

            return item.text
          }
        }

        console.log(strategy)

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
      getPushStatusStr(pushStatus) {

        for (let i = 0; i < this.pushStatusKeyList.length; ++i) {

          let item = this.pushStatusKeyList[i]

          if (item.value === pushStatus) {

            return item.text
          }
        }

        console.log(pushStatus)

        return null
      },
      getList() {

        console.log('getList')

        this.listLoading = true

        let data = {
          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
        }

        queryplacardList(data).then(response => {

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
      filterTag(value, row) {

        console.log(value, row)

        return row.pushStatus === value;
      },
      handleDelete(index, row) {

        let role = this.tableData.data[index]

        let data = {roleId:role.roleId}

        deletePlacard(data).then(response => {

          this.getList()
        })
      },
      handleSearch(name) {

        console.log('search', name)

        this.listLoading = true

        let data = {
          msgSubject:name,
          pageIndex:0,
          pageSize:this.tableData.pageSize,
        }

        queryplacardList(data).then(response => {

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

        return columnIndex == 5 ? headercellcenter: headercell
      },
      cellstyle({row, rowIndex, columnIndex}) {

        return columnIndex == 5 ? normalcellcenter : normalcell
      },
    }
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
  }

  .header {

    display: flex;
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

  .table {

    margin-top: 1rem;
  }

  .headerrowclass {

    background-color: red !important;
  }

  .pagination {

    margin-top: 1rem;
  }

</style>
