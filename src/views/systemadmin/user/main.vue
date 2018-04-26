<template>
  <div class="content">
    <div class="table">
      <el-table :data="currentPageData" :cell-style="cellstyle" :header-cell-style="headercellstyle" max-height="700" highlight-current-row>
        <el-table-column prop="index" label="" width="150"></el-table-column>
        <el-table-column prop="name" label="角色名称" width="250"></el-table-column>
        <el-table-column prop="address" label="备注" width="600"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详细</el-button>
            <el-button size="mini" @click="handleManager(scope.$index, scope.row)">管理账户</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <page-widget :total="currentDataLength" :pagesizes="[10, 20, 40, 50]" @pageSizeChange="pageSizeChange" @pageChange="pageChange" :pagesize="pageSize"></page-widget>
    </div>
  </div>
</template>

<script>

  import debugdata from './debugdata'
  import PageWidget from '@/components/PageWidget'

  export default {
    components: { PageWidget },
    data() {
      return {
        pageSize:20,
        totalData:debugdata,
        totalPage:0,
        pageIndex:1,
        searchResult:null,
        currentDataLength:0,
        currentPageData:null
      }
    },
    mounted() {

      this.currentDataLength = this.getCurrentDataLength()

      this.currentPageData = this.getCurrPageData()
    },
    methods:{
      getCurrentDataLength() {

        let dataSource = []

        if (this.searchResult != null) {

          dataSource = this.searchResult
        }
        else {

          dataSource = this.totalData
        }

        return dataSource.length
      },
      getCurrPageData() {

        let dataSource = []

        if (this.searchResult != null) {

          dataSource = this.searchResult
        }
        else {

          dataSource = this.totalData
        }

        let start = (this.pageIndex - 1) * this.pageSize

        let end = Math.min(start + this.pageSize, dataSource.length)

        return dataSource.slice(start, end)
      },
      headercellstyle({row, rowIndex, columnIndex}){

        if (columnIndex == 3) {

          return {textAlign:'center'}
        }

        return {textAlign:'left'}
      },
      cellstyle({row, rowIndex, columnIndex}) {

        if (columnIndex == 3) {

          return {textAlign:'center'}
        }

        return {textAlign:'left'}
      },
      pageSizeChange(pageSize){

        this.pageSize = pageSize

        this.pageIndex = 1

        this.currentPageData = this.getCurrPageData()
      },
      pageChange(pageIndex) {

        this.pageIndex = pageIndex

        this.currentPageData = this.getCurrPageData()
      },
      handleDetail(index, row) {


      },
      handleManager(index, row) {


      },
      handleDelete(index, row) {


      },
      handleSearch(name) {

        console.log('search', name)

        this.searchResult = this.totalData.filter(obj => obj.name.indexOf(name) != -1)

        this.currentDataLength = this.getCurrentDataLength()

        this.currentPageData = this.getCurrPageData()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .content {
    width: 100%;
  }

  .table {
    width: 100%;
    background: green;
  }

  .pagination {

    margin: 1rem auto;
  }

</style>
