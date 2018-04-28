<template>
  <div class="content">
    <div class="createuser">
      <div class="permissiontree" style="padding: 20px">
        <el-tree :data="roletree" show-checkbox node-key="treeId" :default-expanded-keys="[0]" :props="roleProps"></el-tree>
      </div>
      <div class="permissionctr">
        <div style="font-size:0.8rem">可使用的捷物管APP功能</div>
        <div class="permissiontree">
          <el-tree :data="app" ref="apptree" show-checkbox node-key="treeId" :props="defaultProps"></el-tree>
        </div>
      </div>
      <div class="permissionctr">
        <div style="font-size:0.8rem">可使用的社区运营平台功能</div>
        <div class="permissiontree">
          <el-tree :data="icop" ref="icoptree" show-checkbox node-key="treeId" :props="defaultProps"></el-tree>
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
  import { queryRoleListByIds } from '@/api/user'
  import { queryTotalPopedomTree } from '@/api/permissiontree'

  export default {
    methods:{
      build(parentid, items) {

        var _array = [];

        for (var i = 0; i < items.length; i++) {

          var item = items[i]

          item.disabled = false

          if (item.parentId === parentid) {

            item.children = this.build(item.treeId, items)

            _array.push(item);
          }
        }

        return _array;
      },
    },
    created() {

      console.log('aa')

      queryPopedomTree({}).then(response => {

        this.app = this.build(null, response.data.app)

        console.log(this.app)

        this.icop = this.build(null, response.data.icop)
      })

      queryRoleListByIds({}).then(response => {

        console.log(response.data.data)

        let parent = {roleName:'全选', treeId:0, parentId:null}

        let list = [parent]

        for (let i = 0; i < response.data.data.length; ++i) {

          let role = response.data.data[i]

          role.parentId = 0

          role.treeId = role.roleId

          list.push(role)
        }

        this.roletree = this.build(null, list)
      })
    },
    data() {
      return {
        app: [],
        icop: [],
        roletree:[],
        defaultProps: {
          children: 'children',
          label: 'text'
        },
        roleProps: {
          children:'children',
          label: 'roleName'
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
