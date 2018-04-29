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
        <el-table :data="tableData" :header-cell-style="headercellstyle">
          <el-table-column prop="title" label="内容主题" width="400"></el-table-column>
          <el-table-column prop="type" label="消息类型" width="150"></el-table-column>
          <el-table-column prop="send" label="发送方式" width="150"></el-table-column>
          <el-table-column prop="tag" label="发布状态" width="150"
                           :filters="[{ text: '已发布', value: '已发布' }, { text: '未发布', value: '未发布' }]"
                           :filter-method="filterTag"
                           :filter-multiple="false">
            <template slot-scope="scope">
              <el-tag :type="scope.row.tag === '已发布' ? 'primary' : 'success'" close-transition>{{ scope.row.tag }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="strategy" label="发送策略" width="150"></el-table-column>
          <el-table-column prop="time" label="计划发起时间" width="250"></el-table-column>
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
        <page-widget :total="100" :pagesizes="[10, 20, 40, 50]"></page-widget>
      </div>
    </div>
  </transition>
</template>

<script>

  import DateSelect from '@/components/DateSelect'

  import PageWidget from '@/components/PageWidget'

  export default {

    components: { DateSelect, PageWidget },
    data() {
      return {
        tableData: [{
          title:'物业管理月度业主投票统计',
          type:'投票',
          send:'后台',
          status:'未发布',
          strategy: '定时发送',
          time: '2018-10-05 9:30',
          tag:'未发布'
        }],
      }
    },

    methods: {
      headercellstyle({row, rowIndex, columnIndex}) {

        return {textAlign: 'left', backgroundColor:'#d0d5e5'}
      },
      handleDetail(index, row) {


      },
      handleManager(index, row) {


      },
      handleDelete(index, row) {


      },
      filterTag(value, row) {

        return row.tag === value;
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
