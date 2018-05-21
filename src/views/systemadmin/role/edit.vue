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
        <div class="permissionctr" v-show="app">
          <div style="font-size:0.8rem">可使用的捷物管APP功能</div>
          <div class="permissiontree">
            <el-tree :data="app" ref="apptree" show-checkbox node-key="treeId" :props="defaultProps" :default-expanded-keys="defaultAppKeys" :default-checked-keys="apppermissions"></el-tree>
          </div>
        </div>
        <div class="permissionctr" v-show="icop">
          <div style="font-size:0.8rem">可使用的社区运营平台功能</div>
          <div class="permissiontree">
            <el-tree :data="icop" ref="icoptree" show-checkbox node-key="treeId" :props="defaultProps" :default-expanded-keys="defaultIcopKeys" :default-checked-keys="apppermissions"></el-tree>
          </div>
        </div>
      </div>
      <div class="settings">
        <el-button @click="cancelCreate">取消</el-button>
        <el-button type="primary" @click="createRole">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>

  import { queryTotalPopedomTree } from '@/api/permissiontree'
  import { edit, queryPopedomListByIds } from '@/api/role'
  import PageWidget from '@/components/PageWidget'
  import BreadCrumb from '@/components/Breadcrumb'

  export default {
    components: { BreadCrumb },
    methods:{
      build(parentid, items) {

        if (!items) {

          return null
        }

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

          let route = {name:'systemadmin_role'}

          this.$router.push(route)
        })
      },
      cancelCreate() {

        this.$router.go(-1)
      },
    },
    created() {

      console.log('created')

      this.role = this.$route.params.role

      this.roleName = this.role.roleName

      this.remark = this.role.remark

      queryTotalPopedomTree({}).then(response => {

        console.log(response)

        let respData = response.data.respData

        this.app = this.build(null, respData.app)

        if (this.app) {

          this.defaultAppKeys = respData.app.map(item => {

            return item.treeId
          })
        }

        this.icop = this.build(null, respData.icop)

        if (this.icop) {

          this.defaultIcopKeys = respData.icop.map(item => {

            return item.treeId
          })
        }
      })

      let data = {

        roleIds:this.role.roleId
      }

      queryPopedomListByIds(data).then(response => {

        console.log(response)

        let respData = response.data.respData

        this.apppermissions = respData.split(',')

        this.icoppermission = respData.split(',')
      })
    },
    data() {
      return {
        defaultAppKeys:[],
        defaultIcopKeys:[],
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

  @import "createrole";

  .settings {

    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

</style>
