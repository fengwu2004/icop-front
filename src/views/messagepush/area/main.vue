<template>
  <transition name="fade" mode="out-in">
    <div class="content">
      <div class="header">
        <date-select></date-select>
        <div class="operatemenu">
          <el-input placeholder="输入主题查询"></el-input><el-button type="primary">查询</el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="tableData.data" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle" max-height="700">
          <el-table-column prop="msgSubject" label="内容主题" width="400"></el-table-column>
          <el-table-column prop="type" label="消息类型" width="150"></el-table-column>
          <el-table-column prop="pushChannel" label="发送方式" width="150"></el-table-column>
          <el-table-column prop="pushStatus" label="发布状态" width="150"
                           :filters="pushStatusKeyList"
                           :filter-method="filterTag"
                           :filter-multiple="false">
            <template slot-scope="scope">
              <el-tag :type="scope.row.pushStatus === '已发布' ? 'primary' : 'success'" close-transition>{{ getPushStatusStr(scope.row.pushStatus) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="strategy" label="发送策略" width="150"></el-table-column>
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
  </transition>
</template>

<script>

  import { queryplacardList, deletePlacard, editPushStatus } from "@/api/areamessage"
  import DateSelect from '@/components/DateSelect'
  import PageWidget from '@/components/PageWidget'

  export default {
    components: { PageWidget, DateSelect },
    data() {
      return {
        pushStatusKeyList:[{ text: '待推送', value: 'UNPUSH' }, { text: '不推送', value: 'NOPUSH' }, { text: '推送成功', value: 'SUCCESS' }, { text: '推送失败', value: 'FAIL' }],
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
      getPushStatusStr(pushStatus) {

        for (let i = 0; i < this.pushStatusKeyList.length; ++i) {

          let item = this.pushStatusKeyList[i]

          if (item.value === pushStatus) {

            return item.text
          }
        }

        return ''
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

<style scoped rel="stylesheet/scss" lang="scss">

  .content {

    margin-top: 1rem;
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
