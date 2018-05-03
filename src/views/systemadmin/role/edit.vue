<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
    </div>
    <div class="content">
      <div class="createuser">
        <div class="baseinfo">
          <li>基本信息</li>
          <div style="margin-top: 1rem; font-size: 0.8rem">角色名称(不能重名)</div>
          <div style="margin-top: 0.5rem;width: 300px">
            <el-input maxlength="20" v-model="roleName"></el-input>
          </div>
          <div style="margin-top: 2rem;font-size:0.8rem">备注(限50字)</div>
          <div style="margin-top: 0.5rem;">
            <el-input type="textarea" maxlength="50" rows="12" v-model="remark"></el-input>
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
      <div class="settings">
        <el-button>取消</el-button>
        <el-button type="primary" @click="createRole">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>

  import { queryTotalPopedomTree } from '@/api/permissiontree'
  import { edit, queryRolePopedom } from '@/api/role'
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
      createRole() {

        let apppermissions = this.$refs.apptree.getCheckedKeys()

        let icoppermissions = this.$refs.icoptree.getCheckedKeys()

        let permissons = apppermissions.concat(icoppermissions)

        let strpermissions = permissons.join(',')

        let data = {
          roleId:this.role.roleId,
          roleName:this.roleName,
          remark:this.remark,
          popedomIds:strpermissions
        }

        edit(data).then(response => {

          this.$router.push({name:'rolemanager'})
        })
      }
    },
    created() {

      console.log('created')

      this.role = this.$route.params.role

      this.roleName = this.role.roleName

      this.remark = this.role.remark

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
        roleName:'',
        remark:'',
        apppermissions:[],
        icoppermission:[],
        enableedit:true,
        defaultProps: {
          children: 'children',
          label: 'text'
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .navibar {

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #D0D5E5;
  }

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
