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
              <el-input maxlength="15" v-model="currentEditRole.roleName" @blur="onRoleNameBlur" :disabled="!enableedit"></el-input>
            </div>
          </div>
          <div>
            <div style="font-size:0.8rem">备注(限50字)</div>
            <div style="margin-top: 0.5rem;">
              <el-input type="textarea" maxlength="50" rows="12" v-model="currentEditRole.remark" :disabled="!enableedit"></el-input>
            </div>
          </div>
        </div>
        <div class="permissionctr" v-show="app">
          <div style="font-size:0.8rem">可使用的捷物管APP功能</div>
          <div class="permissiontree">
            <el-tree :data="app" ref="apptree" show-checkbox node-key="treeId" :props="defaultProps" :default-expand-all="true" :default-checked-keys="apppermissions"></el-tree>
          </div>
        </div>
        <div class="permissionctr" v-show="icop">
          <div style="font-size:0.8rem">可使用的社区运营平台功能</div>
          <div class="permissiontree">
            <el-tree :data="icop" ref="icoptree" show-checkbox node-key="treeId" :props="defaultProps" :default-expand-all="true" :default-checked-keys="apppermissions"></el-tree>
          </div>
        </div>
      </div>
      <div class="settings" v-show="enableedit">
        <el-button @click="cancelCreate">取消</el-button>
        <el-button type="primary" @click="createRole">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>

  import { queryTotalPopedomTree } from '@/api/permissiontree'
  import { edit, add, checkExistRoleName, queryPopedomListByIds } from '@/api/role'
  import { mapGetters } from 'vuex'
  import PageWidget from '@/components/PageWidget'
  import BreadCrumb from '@/components/Breadcrumb'

  export default {
    computed: {
      ...mapGetters([
        'currentEditRole'
      ]),
    },
    components: { BreadCrumb },
    methods:{
      onRoleNameBlur() {

        if (!this.currentEditRole.roleName || this.currentEditRole.roleName.length == 0 || this.currentEditRole.roleName === this.initRoleName) {

          return
        }

        let data = {roleName:this.currentEditRole.roleName}

        checkExistRoleName(data).then(respData => {

          if (respData) {

            this.$message({
              message: '警告，角色名重复',
              type: 'warning'
            });
          }
        })
      },
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

        let data = Object.assign({}, this.currentEditRole, {popedomIds:strpermissions})

        if (this.currentEditRole.roleId) {

          edit(data).then(response => {

            this.$message.success('保存成功')

            let route = {name:'systemadmin_role'}

            this.$router.push(route)
          })
        }
        else {

          add(data).then(response => {

            this.$message.success('创建成功')

            let route = {name:'systemadmin_role'}

            this.$router.push(route)
          })
        }
      },
      cancelCreate() {

        this.$router.go(-1)
      },
      queryPopedomList() {

        const roleId = this.currentEditRole.roleId

        if (!roleId) {

          return
        }

        queryPopedomListByIds({roleIds:roleId}).then(respData => {

          this.$nextTick(() => {

            this.apppermissions = respData.split(',')

            this.icoppermission = respData.split(',')
          })
        })
      }
    },
    mounted() {

      if (!this.currentEditRole.roleId) {

        this.$route.meta.title = 'systemadmin_role_create'
      }

      if (this.$route.params.detail) {

        this.enableedit = false

        this.$route.meta.title = 'systemadmin_role_detail'
      }
      else {

        this.$route.meta.title = 'systemadmin_role_edit'
      }

      this.queryPopedomList()
    },
    created() {

      queryTotalPopedomTree({}).then(respData => {

        this.$nextTick(() => {

          this.app = this.build(null, respData.app)

          this.icop = this.build(null, respData.icop)
        })
      })

      this.initRoleName = this.currentEditRole.roleName
    },
    data() {
      return {
        initRoleName:'',
        app: [],
        icop: [],
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

  $fontcolor:#16325C;

  * {
    color: $fontcolor;
  }

  .navibar {

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #D0D5E5;
  }

  .content {

    width: 90%;
    margin: 2rem auto;
  }

  .baseinfo {

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .nameinput {

      width: 300px;
    }
  }

  .createuser {

    display: flex;
    justify-content: space-around;
  }

  .permissionctr {

    .permissiontree {

      height: 400px;
      width: 300px;
      margin-top: 0.5rem;
      border: 1px solid #e0e5ee;
      padding: 10px;
      overflow-y: scroll;
    }
  }

  .rolename {

    margin-top: 1rem;
    font-size: 0.8rem;
    color: $fontcolor;
  }

  .doselectapp {

    font-size:0.8rem;
    color: #445577;
  }

  .baseinfotitle {

    position: relative;
    left: -1.4rem;
    color:#061C3F;
    font-weight: bold;
  }


  .settings {

    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

</style>
