<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
    </div>
    <div class="content">
      <div class="createuser">
        <div class="permissiontree" style="padding: 20px">
          <el-tree ref="roletree" :data="roletree" @check-change="handleRoleCheckChange" show-checkbox node-key="treeId" :default-expanded-keys="[0]" :props="roleProps"></el-tree>
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
        <el-button @click="handleToPreStep">上一步</el-button>
        <el-button @click="handelCancel" style="margin-left: 1rem;margin-right: 1rem">取消</el-button>
        <el-button type="primary" @click="handleCreate">完成分配</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { queryPopedomListByIds } from '@/api/role'
  import { queryRoleListByIds, edit, add, queryRoleList } from '@/api/user'
  import { queryTotalPopedomTree } from '@/api/permissiontree'
  import BreadCrumb from '@/components/Breadcrumb'

  export default {
    components: { BreadCrumb },
    computed: {
      ...mapGetters([
        'currentEditUser'
      ]),
    },
    methods:{
      handleRoleCheckChange(data, checked, indeterminate) {

        console.log(data, checked, indeterminate)

        if (indeterminate) {

          return
        }

        this.refreshTreeChecked()
      },
      refreshTreeChecked() {

        let roleIds = this.$refs.roletree.getCheckedKeys()

        let reqeustdata = {roleIds:roleIds.join(',')}

        this.$store.dispatch('setUserRoles', roleIds).then(() => {

          queryPopedomListByIds(reqeustdata).then(response => {

            let permissons = response.data.respData.split(',')

            this.$refs.apptree.setCheckedKeys(permissons)

            this.$refs.icoptree.setCheckedKeys(permissons)
          })
        })
      },
      handleToPreStep() {

        this.$router.go(-1)
      },
      handelCancel() {

        this.$router.go(-2)
      },
      handleCreate() {

        let user = this.currentEditUser

        // alert(JSON.stringify(user))

        if (user.userId) {

          edit(user).then(response => {

            this.$message({
              type: 'success',
              message: '分配成功!'
            });
          }).catch(() => {

            this.$message.error('额，分配角色错误失败');
          })
        }
        else {

          add(user).then(response => {

            this.$message({
              type: 'success',
              message: '分配成功!'
            });
          }).catch(() => {

            this.$message.error('额，创建用户出错，请确认信息无误后再次尝试');
          })
        }

        this.$router.go(-2)
      },
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
      createTotalPermissionTree() {

        queryTotalPopedomTree({}).then(response => {

          console.log(response)

          let respData = response.data.respData

          this.app = this.build(null, respData.app)

          this.icop = this.build(null, respData.icop)
        })
      },
      createRoleTree() {

        queryRoleList({}).then(res => {

          let respData = res.data.respData

          let parent = {roleName:'全选', treeId:0, parentId:null}

          let list = [parent]

          for (let i = 0; i < respData.length; ++i) {

            let role = respData[i]

            role.parentId = 0

            role.treeId = role.roleId

            list.push(role)
          }

          this.roletree = this.build(null, list)
        })
      },
      getUserRoles() {

        let data = {

          userIds:this.currentEditUser.userId
        }

        queryRoleListByIds(data).then(response => {

          let respData = response.data.respData

          console.log(response)

          if (respData) {

            let roleIds = respData.split(',')

            this.$refs.roletree.setCheckedKeys(roleIds)

            this.refreshTreeChecked()
          }
        })
      }
    },
    created() {

      console.log('aa')

      this.$nextTick(() => {

        this.createTotalPermissionTree()

        this.createRoleTree()

        this.getUserRoles()
      })
    },
    data() {
      return {
        user:null,
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
      overflow-y: scroll;
    }
  }

</style>
