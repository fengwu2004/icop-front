<template>
  <div class="content">
    <div class="createuser">
      <div class="baseinfo">
        <li>基本信息</li>
        <div style="margin-top: 1rem; font-size: 0.8rem">角色名称(不能重名)</div>
        <div style="margin-top: 0.5rem;width: 300px">
          <el-input maxlength="20"></el-input>
        </div>
        <div style="margin-top: 2rem;font-size:0.8rem">备注(限50字)</div>
        <div style="margin-top: 0.5rem;">
          <el-input type="textarea" maxlength="50" rows="12"></el-input>
        </div>
      </div>
      <div class="permissionctr">
        <div style="font-size:0.8rem">请勾选可使用的捷物管APP功能</div>
        <div class="permissiontree">
          <el-tree :data="app" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
          </el-tree>
        </div>
      </div>
      <div class="permissionctr">
        <div style="font-size:0.8rem">请勾选可使用的社区运营平台功能</div>
        <div class="permissiontree">
          <el-tree :data="icop" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
          </el-tree>
        </div>
      </div>
    </div>
    <div class="settings">
      <el-button>取消</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>

  import { queryPopedomTree  } from '@/api/permissiontree'
  import PageWidget from '@/components/PageWidget'

  export default {

    created() {

      console.log('aa')

      queryPopedomTree({}).then(response => {

        console.log(response)

        let app = response.data.app

        let icop = response.data.icop

        this.app = getTree(app)

        this.icop = getTree(icop)
      })
    },
    methods:{

      getTree(permissions) {

        
      }
    },
    data() {
      return {
        app: [],
        icop: [],
        test: [
          {
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
          },
          {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          },
          {
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

  .content {

    width: 90%;
    margin: 1rem auto;
  }

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
