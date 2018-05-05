<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
    </div>
    <div class="content">
      <div class="createuser">
        <div class="baseinfo">
          <div>
            <li class="baseinfotitle">基本信息</li>
            <div class="rolename">角色名称(不能重名):</div>
            <div style="margin-top: 0.5rem;width: 300px">
              <el-input maxlength="20" v-model="roleName"></el-input>
            </div>
          </div>
          <div>
            <div style="font-size:0.8rem">备注(限50字)</div>
            <div style="margin-top: 0.5rem;">
              <el-input type="textarea" maxlength="50" rows="12" v-model="remark"></el-input>
            </div>
          </div>
        </div>
        <div class="permissionctr">
          <div class="doselectapp">请勾选可使用的捷物管APP功能</div>
          <div class="permissiontree">
            <el-tree :data="app" ref="apptree" show-checkbox node-key="treeId" :props="defaultProps"></el-tree>
          </div>
        </div>
        <div class="permissionctr">
          <div class="doselectapp">请勾选可使用的社区运营平台功能</div>
          <div class="permissiontree">
            <el-tree :data="icop" ref="icoptree" show-checkbox node-key="treeId" @check-change="appcheckchange" :props="defaultProps"></el-tree>
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
  import { add } from '@/api/role'
  import BreadCrumb from '@/components/Breadcrumb'

  export default {
    components: { BreadCrumb },
    methods:{
      appcheckchange() {

        let apppermissions = this.$refs.icoptree.getCheckedKeys()

        console.log(apppermissions.join(','))
      },
      handleIcopPermissionChange(data, checked, indeterminate) {

        if (indeterminate) {

          return
        }

        console.log(data, checked, indeterminate);
      },
      handleAppPermissionChange(data, checked, indeterminate) {

        console.log(data, checked, indeterminate);
      },
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
          roleName:this.roleName,
          remark:this.remark,
          popedomIds:strpermissions
        }

        add(data).then(response => {

          this.$router.push({name:'rolemanager'})
        })
      }
    },
    created() {

      queryTotalPopedomTree({}).then(response => {

        this.app = this.build(null, response.data.app)

        this.icop = this.build(null, response.data.icop)
      })
    },
    data() {
      return {
        app: [],
        icop: [],
        roleName:'',
        remark:'',
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

  @import "createrole";

  .settings {

    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

</style>
