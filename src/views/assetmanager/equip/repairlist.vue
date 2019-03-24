<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="navibar">
        <bread-crumb class="breadcrumb"></bread-crumb>
      </div>
      <div class="content">
        <div class="header">
          <div class="operatemenu">
            <el-input clearable placeholder="输入相关信息查询" v-model="queryParam"></el-input><el-button style="margin-left: 1rem; background-color: #16325C;color: #FFFFFF !important;border-color: #16325C" type="primary" @click="handleSearch(queryParam)">查询</el-button>
          </div>
        </div>
        <el-table :data="tableData.data" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle" @filter-change="onFilterChange" :max-height="maxheight">
          <el-table-column prop="updateTime" label="上次维修时间" min-width="200">
            <template slot-scope="scope">
              <span>{{ getUpateTime(scope.$index, scope.row) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="repairerName" label="维修人员" min-width="150"></el-table-column>
          <el-table-column prop="repairerConpany" label="所属公司" min-width="150"></el-table-column>
          <el-table-column prop="repairerPhone" label="联系方式" min-width="150"></el-table-column>
          <el-table-column prop="repairPrice" label="报价" min-width="100"></el-table-column>
          <el-table-column prop="status" label="状态" min-width="250"
                           :filters="repairStatus"
                           :filter-method="filterTag"
                           :filter-multiple="false"
                           column-key="status">
            <template slot-scope="scope">
              <span>{{ getEquipStatusStr(scope.row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
              <div>
                <el-button type="primary" size="mini" @click="handleDetail(scope.$index, scope.row)" v-show="scope.row.status != 1">维修详情</el-button>
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

  import { listEquipRepair, deleteNotice, sendNotice} from "@/api/innermessage";
  import { headercell, headercellcenter, normalcell, normalcellcenter } from "@/utils/tablecellstyle";
  import DateSelect from '@/components/DateSelect'
  import EquipSelect from '@/components/EquipSelect'
  import PageWidget from '@/components/PageWidget'
  import BreadCrumb from '@/components/Breadcrumb'
  import { mapGetters } from 'vuex'

  export default {
    components: { PageWidget, EquipSelect, BreadCrumb },
    data() {
      return {
        equipId:null,
        queryParam:'',
        maxheight:window.innerHeight - 250,
        repairStatus:[{ text: '已报修, 待接单', value: '1' }, { text: '已接单, 维修中', value: '2' }, {text: '待验收', value: '3'}, {text: '验收通过', value: '4'}, {text: '验收不过', value: '5'}],
        statusDic:{1:'已报修, 待接单', 2:'已接单, 维修中', 3:'待验收', 0:'验收通过', 5:'验收不过'},
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
    computed: {
      ...mapGetters([
        'equip'
      ]),
    },
    mounted() {

      this.equipId = this.$route.query.equipId

      this.getList()
    },
    methods:{
      onFilterChange(filters) {

        let pushstatus = filters.pushStatus

        this.pushStatus = pushstatus[0]

        this.pageIndex = 1

        this.getList()
      },
      onEquipTypeChange() {

        this.pageIndex = 1

        this.getList()
      },
      getUpateTime(index, row) {

        let equipInfo = this.tableData.data[index]

        if (equipInfo.updateTime != 0) {

          return new Date(equipInfo.updateTime).toLocaleString()
        }

        return ''
      },
      getEquipStatusStr(status) {

        return this.statusDic[status]
      },
      getQueryParams() {

        let data = {

          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
          equipId:this.equipId
        }

        if (this.searching && this.queryParam && this.queryParam.length > 0) {

          data.queryKey = this.queryParam
        }

        return data
      },
      getList() {

        this.listLoading = true

        const data = this.getQueryParams()

        listEquipRepair(data)
          .then(respData => {

          this.tableData = this.getResponseTableData(respData)

        })
          .catch()
          .finally(() => {

          this.listLoading = false
        })
      },
      getResponseTableData(respData) {

        console.log(respData)

        let repairList = respData.repairList

        let tableData = {

          totalCount:respData.totalItem,
          data:repairList,
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
      filterTag(value, row) {

        return row.sendStatus === value;
      },
      handleDetail(index, row) {

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
      handleRepairInfos(index, row) {

        let equip = this.tableData.data[index]

        this.$store.dispatch('resetEquip')
          .then(() => {

            let route = {name:'assetmanager_create'}

            this.$router.push(route)
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

        listEquipRepair(data)
          .then(respData => {

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
      align-items: flex-end;
    }

    .el-button {

      margin-left: 1rem;
    }
  }

  .pagination {

    margin-top: 1rem;
  }

</style>
