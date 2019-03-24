<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="navibar">
        <bread-crumb class="breadcrumb"></bread-crumb>
        <el-button @click="createEquip" type="primary" style="margin-left: 1rem; background-color: #FF955B;color: #FFFFFF !important;border-color: #FF955B"><i class="el-icon-plus el-icon--left"></i>录入资产</el-button>
      </div>
      <div class="content">
        <div class="header">
          <equip-select ref="equipselector" @equipchange="onEquipTypeChange"></equip-select>
          <div class="operatemenu">
            <el-input clearable placeholder="输入相关信息查询" v-model="queryParam"></el-input><el-button style="margin-left: 1rem; background-color: #16325C;color: #FFFFFF !important;border-color: #16325C" type="primary" @click="handleSearch(queryParam)">查询</el-button>
          </div>
        </div>
        <el-table :data="tableData.data" v-loading="listLoading" :cell-style="cellstyle" :header-cell-style="headercellstyle" @filter-change="onFilterChange" :max-height="maxheight">
          <el-table-column prop="name" label="资产名称" min-width="250"></el-table-column>
          <el-table-column prop="category" label="分类" min-width="150"></el-table-column>
          <el-table-column prop="status" label="状态" min-width="150"
                           :filters="equipStatus"
                           :filter-method="filterTag"
                           :filter-multiple="false"
                           column-key="pushStatus">
            <template slot-scope="scope">
              <span>{{ getEquipStatusStr(scope.row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="上次维修时间" min-width="200">
            <template slot-scope="scope">
              <span>{{ getUpateTime(scope.$index, scope.row) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="250">
            <template slot-scope="scope">
              <div>
                <el-button type="primary" size="mini" @click="handleDetail(scope.$index, scope.row)">资产详情</el-button>
                <el-button type="success" size="mini" @click="handleRepairList(scope.$index, scope.row)">维修记录</el-button>
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

  import { listEquip, deleteNotice, sendNotice} from "@/api/innermessage";
  import { headercell, headercellcenter, normalcell, normalcellcenter } from "@/utils/tablecellstyle";
  import DateSelect from '@/components/DateSelect'
  import EquipSelect from '@/components/EquipSelect'
  import PageWidget from '@/components/PageWidget'
  import BreadCrumb from '@/components/Breadcrumb'

  export default {
    components: { PageWidget, EquipSelect, BreadCrumb },
    data() {
      return {
        queryParam:'',
        maxheight:window.innerHeight - 250,
        equipStatus:[{ text: '待维修', value: '3' }, { text: '正常', value: '1' }, {text: '维修中', value: '2'}],
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
      createEquip() {

        this.$store.dispatch('resetEquip')
          .then(() => {

          let route = {name:'assetmanager_create'}

          this.$router.push(route)
        })
      },
      getUpateTime(index, row) {

        let equipInfo = this.tableData.data[index]

        if (equipInfo.updateTime != 0) {

          return new Date(equipInfo.updateTime).toLocaleString()
        }

        return ''
      },
      getEquipStatusStr(status) {

        if (status == '1') {

          return '正常'
        }

        if (status === '2') {

          return '待维修'
        }

        return '维修中'
      },
      getQueryParams() {

        let data = {

          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
        }

        let equiptype = this.$refs.equipselector.type

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

        listEquip(data)
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

        let equipList = respData.equipList

        let tableData = {

          totalCount:equipList.totalItem,
          data:equipList,
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

        let equip = this.tableData.data[index]

        this.$store.dispatch('setEquip', equip)
          .then(() => {

            let route = {name:'assetmanager_equipdetail', query:{equipId:equip.id}}

            this.$router.push(route)
          })
      },
      handleRepairList(index, row) {

        let equip = this.tableData.data[index]

        this.$store.dispatch('setEquip', equip)
          .then(() => {

            let route = {name:'assetmanager_repairlist', query:{equipId:equip.id}}

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

        listEquip(data)
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
