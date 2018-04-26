<template>
  <div class="createuserframe">
    <div class="createuser">
      <div class="permissiontree" style="padding: 20px">
        <el-tree
          :data="data2"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps">
        </el-tree>
      </div>
      <div class="permissionctr">
        <div style="font-size:0.8rem">当前角色可使用的捷物管APP功能</div>
        <div class="permissiontree">
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </div>
      </div>
      <div class="permissionctr">
        <div style="font-size:0.8rem">当前角色可使用的社区运营平台功能</div>
        <div class="permissiontree">
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </div>
      </div>
    </div>
    <div class="settings">
      <el-button>上一步</el-button>
      <el-button>取消</el-button>
      <el-button type="primary">完成分配</el-button>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .baseinfo {

    .nameinput {

      width: 300px;
    }
  }

  .createuser {

    display: flex;
    justify-content: space-around;
  }

  .settings {

    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

  .permissionctr {

    .permissiontree {

      height: 400px;
      width: 300px;
      margin-top: 0.5rem;
      border: 1px solid #e0e5ee;
      padding: 10px;
    }
  }

</style>
