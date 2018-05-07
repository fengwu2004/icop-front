<template>
  <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" :lock-scroll="true" :append-to-body="false">
    <div class="table">
      <div class="header">
        <span style="font-size: 1.2rem;">人员选择</span>
        <div style="display: flex; align-items: center; justify-content: center;">
          <el-input style="margin-right: 1rem;" clearable placeholder="按人员编号/姓名" v-model="queryParam"></el-input>
          <el-button style="margin-left: 1rem; background-color: #16325C;color: #FFFFFF !important;" type="primary" @click="handleSearch(queryParam)">查询</el-button>
        </div>
      </div>
      <el-table @current-change="handleSelectChange" :cell-style="cellstyle" :header-cell-style="headercellstyle" :data="tableData.data" v-loading="listLoading" height="400" highlight-current-row>
        <el-table-column prop="personCode" label="人员编号" min-width="100"></el-table-column>
        <el-table-column prop="name" label="姓名" min-width="200"></el-table-column>
        <el-table-column prop="sex" label="性别" min-width="100"></el-table-column>
        <el-table-column prop="telephone" min-width="200" label="联系电话"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <page-widget :total="tableData.totalCount" :pagesizes="[10, 20, 40, 50]" @pageSizeChange="pageSizeChange" @pageChange="pageChange" :pagesize="tableData.pageSize"></page-widget>
    </div>
    <div class="btns">
      <el-button @click="() => hide()">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import { queryPersonList } from '@/api/user'
  import { default as PageWidget } from '@/components/PageWidget'
  import { headercell, headercellcenter, normalcell, normalcellcenter } from "@/utils/tablecellstyle";

  export default {
    components: { PageWidget },
    methods:{
      refresh() {

        this.searching = false

        this.pageIndex = 1

        this.pageSize = 10

        this.getList()
      },
      handleSelectChange(currentRow, oldCurrentRow) {

        this.selectedPerson = currentRow

        console.log(currentRow, oldCurrentRow)
      },
      handleConfirm() {

        this.$emit('selectPerson', this.selectedPerson)

        this.hide()
      },
      handleSearch(queryParam) {

        if (!queryParam || queryParam.length == 0) {

          return
        }

        let data = {
          queryParam:queryParam,
          pageIndex:1,
          pageSize:this.tableData.pageSize,
        }
        console.log('search', queryParam)

        this.listLoading = true

        queryPersonList(data).then(response => {

          console.log(response)

          Object.assign(this.tableData, response.data)

          this.listLoading = false

          this.searching = true
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
      getList() {

        console.log('getList')

        this.listLoading = true

        let data = {
          pageIndex:this.tableData.pageIndex,
          pageSize:this.tableData.pageSize,
        }

        if (this.searching && this.queryParam && this.queryParam.length > 0) {

          data.queryParam = this.queryParam
        }

        queryPersonList(data).then(response => {

          console.log(response)

          Object.assign(this.tableData, response.data)

          this.listLoading = false
        })
      },
      show() {

        console.log('show')

        this.dialogVisible = true

        this.refresh()
      },
      hide() {

        this.dialogVisible = false
      },
      headercellstyle({row, rowIndex, columnIndex}){

        return columnIndex == 3 ? headercellcenter: headercell
      },
      cellstyle({row, rowIndex, columnIndex}) {

        return columnIndex == 3 ? normalcellcenter : normalcell
      },
    },
    data() {
      return {
        selectedPersion:null,
        dialogVisible:false,
        listLoading:true,
        searching:false,
        queryParam:'',
        tableData: {
          totalCount:0,
          data:null,
          pageSize:20,
          totalPage:0,
          pageIndex:1,
        },
      }
    },
    watch:{
      queryParam(newValue) {

        if (!this.searching) {

          return
        }

        if (!newValue || newValue.length == 0) {

          this.getList()

          this.searching = false
        }
      }
    },
  };
</script>

<style scoped rel="stylesheet/scss" lang="scss">

  .table {

    width: 96%;
    margin: auto;
  }

  .pagination {

    margin-top: 1rem;
  }

  .header {

    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btns {

    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
