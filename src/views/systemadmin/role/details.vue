<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
    </div>
    <div class="content">
      <div class="createuser">
        <div class="baseinfo">
          <li>基本信息</li>
          <div style="margin-top: 1rem; font-size: 0.8rem">角色名称</div>
          <div style="margin-top: 0.5rem;width: 300px">
            <el-input maxlength="20" v-model="role.roleName"></el-input>
          </div>
          <div style="margin-top: 2rem;font-size:0.8rem">备注</div>
          <div style="margin-top: 0.5rem;">
            <el-input type="textarea" maxlength="50" rows="12" v-model="role.remark"></el-input>
          </div>
        </div>
        <div class="permissionctr">
          <div style="font-size:0.8rem">可使用的捷物管APP功能</div>
          <div class="permissiontree">
            <el-tree :data="app" ref="apptree" show-checkbox node-key="treeId" :props="defaultProps" :default-checked-keys="apppermissions"></el-tree>
          </div>
        </div>
        <div class="permissionctr">
          <div style="font-size:0.8rem">可使用的社区运营平台功能</div>
          <div class="permissiontree">
            <el-tree :data="icop" ref="icoptree" show-checkbox node-key="treeId" :props="defaultProps" :default-checked-keys="apppermissions"></el-tree>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { queryTotalPopedomTree } from '@/api/permissiontree'
  import { queryRolePopedom } from '@/api/role'
  import PageWidget from '@/components/PageWidget'
  import BreadCrumb from '@/components/Breadcrumb'

  export default {
    components: { BreadCrumb },
    methods:{
      build(parentid, items) {

        var _array = [];

        for (var i = 0; i < items.length; i++) {

          var item = items[i]

          item.disabled = !this.enableedit

          if (item.parentId === parentid) {

            item.children = this.build(item.treeId, items)

            _array.push(item);
          }
        }

        return _array;
      },
    },
    created() {

      console.log('created')

      this.role = this.$route.params.role

      queryTotalPopedomTree({}).then(response => {

        this.app = this.build(null, response.data.app)

        this.icop = this.build(null, response.data.icop)
      })

      let data = {

        roleIds:this.role.roleId
      }

      queryRolePopedom(data).then(response => {

        console.log(response.data.popedomIds)

        this.apppermissions = response.data.popedomIds.split(',')

        this.icoppermission = response.data.popedomIds.split(',')
      })
    },
    data() {
      return {
        app: [],
        icop: [],
        role:null,
        apppermissions:[],
        icoppermission:[],
        enableedit:false,
        defaultProps: {
          children: 'children',
          label: 'text'
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

  .navibar {

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #D0D5E5;
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
