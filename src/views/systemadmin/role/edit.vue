<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
    </div>
    <div class="content">
      <el-form :rules="rules" ref="baseinfoForm" :model="formData">
        <div class="createuser">
          <div class="baseinfo">
            <div>
              <li class="baseinfotitle">基本信息</li>
              <div class="rolename">角色名称(不能重名):</div>
              <div style="margin-top: 0.5rem;width: 300px">
                <el-form-item prop="roleName">
                  <el-input v-model="formData.roleName" :disabled="!enableedit"></el-input>
                </el-form-item>
              </div>
            </div>
            <div>
              <div style="font-size:0.8rem">备注(限50字)</div>
              <div style="margin-top: 0.5rem;">
                <el-form-item prop="remark">
                  <el-input type="textarea" rows="12" v-model="formData.remark" :disabled="!enableedit"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="permissionctr" v-show="app">
            <div style="font-size:0.8rem">可使用的捷物管APP功能</div>
            <div class="permissiontree">
              <el-tree :data="app" ref="apptree" show-checkbox node-key="treeId" :props="defaultProps" :default-expand-all="true"></el-tree>
            </div>
          </div>
          <div class="permissionctr" v-show="icop">
            <div style="font-size:0.8rem">可使用的社区运营平台功能</div>
            <div class="permissiontree">
              <el-tree :data="icop" ref="icoptree" show-checkbox node-key="treeId" :props="defaultProps" :default-expand-all="true"></el-tree>
            </div>
          </div>
        </div>
        <div class="settings" v-show="enableedit">
          <el-button @click="cancelCreate">取消</el-button>
          <el-button type="primary" @click="createRole">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

  import { queryTotalPopedomTree } from '@/api/permissiontree'
  import { edit, add, checkExistRoleName, queryPopedomListByIds } from '@/api/role'
  import { mapGetters } from 'vuex'
  import PageWidget from '@/components/PageWidget'
  import BreadCrumb from '@/components/Breadcrumb'
  import { validateRoleName } from "@/utils/validate"
  import { trim } from "@/utils/validate";

  export default {
    computed: {
      ...mapGetters([
        'currentEditRole',
        'appicopvalid',
        'appfunctions',
        'icopfunctions',
      ]),
    },
    components: { BreadCrumb },
    methods:{
      async checkNameExist() {

        if (!this.formData.roleName || this.formData.roleName.length == 0 || this.formData.roleName === this.initRoleName) {

          return Promise.resolve()
        }

        let data = {roleName:trim(this.formData.roleName)}

        return new Promise((resolve, reject) => {

          checkExistRoleName(data)
            .then(respData => {

            if (respData) {

              reject('警告，角色名重复')
            }
            else {

              resolve()
            }
          })
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
      async doValid() {

        return new Promise((resolve, reject) => {

          this.$refs.baseinfoForm.validate(valid => {

            if (valid) {

              return resolve()
            }
          })
        })
      },
      createRole() {

        this.doValid()
          .then(() => {

            let apppermissions = this.$refs.apptree.getCheckedKeys()

            let icoppermissions = this.$refs.icoptree.getCheckedKeys()

            let permissons = apppermissions.concat(icoppermissions)

            let strpermissions = permissons.join(',')

            let data = Object.assign({}, this.formData, {popedomIds:strpermissions})

            if (this.currentEditRole.roleId) {

              console.log(data.popedomIds)
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
          })
          .catch(res => {

            console.log(res)
        })
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

          const ids = respData.split(',')

          this.$refs.apptree.setCheckedKeys(ids)

          this.$refs.icoptree.setCheckedKeys(ids)

          console.log(this.$refs)
        })
      },
      async queryAppIcopFeature() {

        if (this.appicopvalid) {

          return Promise.resolve({app:this.appfunctions, icop:this.icopfunctions})
        }

        return new Promise((resolve, reject) => {

          queryTotalPopedomTree({})
            .then(respData => {

              return this.$store.dispatch('setAppAndIcopFunctions', respData)
          })
            .then(res => {

              resolve({app:this.appfunctions, icop:this.icopfunctions})
            })
        })
      },
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

      this.queryAppIcopFeature()
        .then(respData => {

          this.app = this.build(null, respData.app)

          this.icop = this.build(null, respData.icop)

          this.queryPopedomList()
        })
    },
    created() {

      this.initRoleName = this.currentEditRole.roleName

      this.formData.roleName = this.currentEditRole.roleName

      this.formData.remark = this.currentEditRole.remark

      this.formData.roleId = this.currentEditRole.roleId
    },
    data() {

      let validatePass = (rule, value, callback) => {

        if (!value) {

          return callback(new Error('请输入角色名称'));
        }

        if (!validateRoleName(value)) {

          return callback(new Error('长度为1-15，中文、数字、字母'));
        }

        this.checkNameExist().then(() => {

          callback()
        })
          .catch(res => {

            return callback(new Error(res));
          })
      }

      return {
        initRoleName:'',
        app: [],
        icop: [],
        enableedit:true,
        defaultProps: {
          children: 'children',
          label: 'text'
        },
        formData:{
          roleId:'',
          roleName:'',
          remark:'',
        },
        rules:{
          roleName:[
            {validator:validatePass, trigger:'blur'},
          ],
          remark:[
            {min:0, max:50, message:'长度在50个字以内', trigger:'blur'}
          ]
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
