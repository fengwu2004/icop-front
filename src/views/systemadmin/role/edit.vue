<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
    </div>
    <div class="content">
      <el-form :rules="rules" ref="baseinfoForm" :model="formData">
        <div class="createuser">
          <div>
            <el-form-item prop="account">
              <span class="rolename">账号</span><el-input v-model="formData.account" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item prop="name">
              <span class="rolename">用户名</span><el-input v-model="formData.name" :disabled="!enableedit"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <span class="rolename">手机号</span><el-input v-model="formData.phone" :disabled="!enableedit"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <span class="rolename">密码</span><el-input v-model="formData.pwd" :disabled="!enableedit"></el-input>
            </el-form-item>
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
        'currentEditRole'
      ]),
    },
    components: { BreadCrumb },
    methods:{
      async checkNameExist(name) {

        if (name === this.initRoleName) {

          return Promise.resolve()
        }

        let data = {roleName:name}

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

            let data = Object.assign({}, this.formData)

            return add(data)
          })
          .then(response => {

            this.$message.success('创建成功')

            let route = {name:'systemadmin_role'}

            this.$router.push(route)
          })
          .catch(res => {

            console.log(res)
          })
      },
      cancelCreate() {

        this.$router.go(-1)
      },
    },
    mounted() {

      this.$route.meta.title = 'systemadmin_role_edit'
    },
    created() {

      this.formData.account = this.currentEditRole.account

      this.formData.name = this.currentEditRole.name

      this.formData.phone = this.currentEditRole.phone

      this.formData.pwd = this.currentEditRole.pwd
    },
    data() {

      return {
        initRoleName:'',
        enableedit:true,
        formData:{
          account:'',
          name:'',
          phone:'',
          pwd:''
        },
        rules:{
          account:[
            {min:0, max:50, message:'长度在50个字以内', trigger:'blur'}
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

  .createuser {

    display: flex;
    justify-content: space-around;
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

  .settings {

    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

</style>
