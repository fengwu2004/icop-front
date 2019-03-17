<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
    </div>
    <div class="content">
      <el-form :model="user" :rules="rules" ref="baseinfoForm">
        <div class="createaccount">
          <div class="itemrow">
            <div>
              <span>联系电话</span>
              <el-form-item prop="telephone">
                <el-input style="margin-top: 0.5rem" :disabled="justEnableSelect" v-model="user.telephone" max="30"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="itemrow">
            <div>
              <span class="redstar">*</span><span class="sumtitle">姓名</span>
              <el-form-item prop="personName">
                <el-input style="margin-top: 0.5rem" :disabled="justEnableSelect" v-model="user.personName"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
      <div class="settings">
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="handleCreate" style="margin-right: 2rem;margin-left: 2rem;">保存</el-button>
        <el-button type="success" @click="setRole">继续分配角色</el-button>
      </div>
      <select-user ref="sel" @selectPerson="onSelectedPerson"></select-user>
    </div>
  </div>
</template>

<script>

  import { checkRouteAndActionEnable } from "@/permissionCheck";
  import { validateUserName, validatePassword, trim, isValidPersonCode, isValidPhoneNumber } from "@/utils/validate";
  import { mapGetters } from 'vuex'
  import { edit, checkExistUserName, add, checkExistPersonCode } from '@/api/user'
  import SelectUser from '@/components/SelectUser/index'
  import BreadCrumb from '@/components/Breadcrumb'
  import md5 from 'blueimp-md5'

  const actioncodes = {
    selectperson:'122700'
  }

  export default {
    components: { SelectUser, BreadCrumb },
    data() {

      let validUserName = (rule, value, callback) => {

        if (!value) {

          return callback(new Error('请输入账户名称'));
        }

        if (!validateUserName(value)) {

          return callback(new Error('长度为1-30，中文、数字、字母'));
        }

        this.checkUserNameExist()
          .then(() => {

          return callback()
        })
          .catch(res => {

            return callback(new Error(res));
          })
      }

      let validPersonName = (rule, value, callback) => {

        if (this.justEnableSelect) {

          return callback()
        }

        if (!value) {

          return callback(new Error('请输入姓名'));
        }

        if (!validateUserName(value)) {

          return callback(new Error('长度为1-30，中文、数字、字母'));
        }

        return callback()
      }

      let validPassword = (rule, value, callback) => {

        if (!value) {

          return callback()
        }

        if (!validatePassword(value)) {

          return callback(new Error('长度为6-20，数字、字母'));
        }

        return callback()
      }

      let validPersonCode = (rule, value, callback) => {

        if (this.user.personId) {

          return callback()
        }

        if (!value) {

          return callback(new Error('请输入人员编号'));
        }

        if (!isValidPersonCode(value)) {

          return callback(new Error('30个字以内，字母，数字'));
        }

        this.checkPersonCodeExist()
          .then(() => {

            return callback()
          })
          .catch(res => {

            return callback(new Error(res));
          })
      }

      let validPhoneNumber = (rule, value, callback) => {

        if (!value) {

          return callback()
        }

        if (isValidPhoneNumber(value)) {

          return callback()
        }

        return callback(new Error('30个字以内, 数字，多个号码由逗号分隔'));
      }

      return {
        justEnableSelect:true,
        initUserName:'',
        placeholderpassword:null,
        user:{
          personId:null,
          personName:null,
          personCode:null,
          userName:null,
          telephone:null,
          sex:'MALE',
          password:null,
          roleIds:null,
          userId:null
        },
        rules:{
          personCode:[
            {validator:validPersonCode, trigger:'blur'},
          ],
          personName:[
            {validator:validPersonName, trigger:'blur'},
          ],
          userName:[
            {validator:validUserName, trigger:'blur'},
          ],
          telephone:[
            {max:30, message:'长度在30个字以内', trigger:'blur'},
            {validator:validPhoneNumber, trigger:'blur'}
          ],
          password:[
            {validator:validPassword, trigger:'blur'}
          ],
        }
      }
    },
    computed: {
      ...mapGetters([
        'currentEditUser'
      ]),
    },
    methods:{
      async checkPersonCodeExist() {

        if (!this.user.personCode || this.user.personCode.length == 0) {

          return Promise.resolve()
        }

        let data = {personCode:trim(this.user.personCode)}

        return new Promise((resolve, reject) => {

          checkExistPersonCode(data)
            .then(respData => {

              if (respData) {

                reject('警告，人员编号重复')
              }
              else {

                resolve()
              }
            })
        })
      },
      async checkUserNameExist() {

        if (!this.user.userName || this.user.userName.length == 0 || this.initUserName == this.user.userName) {

          return Promise.resolve()
        }

        let data = {userName:trim(this.user.userName)}

        return new Promise((resolve, reject) => {

          checkExistUserName(data)
            .then(respData => {

            if (respData) {

              reject('警告，账户名重复')
            }
            else {

              resolve()
            }
          })
        })
      },
      handleCreate() {

        let user = this.user

        this.checkUserValid()
          .then(res => {

            if (user.userId) {

              let pwd = user.password ? md5(user.password) : null

              let value = Object.assign({}, user, {password:pwd})

              console.log(value)

              return edit(value)
            }
            else {

              let pwd = user.password ? md5(user.password) : md5('888888')

              let value = Object.assign({}, user, {password:pwd})

              return add(value)
            }
          })
          .then(response => {

            this.$message({
              message: '保存成功',
              type: 'success'
            });

            this.$router.go(-1)
          })
      },
      onSelectedPerson(person) {

        console.log(person)

        this.user = Object.assign({}, this.user, person)
      },
      cancelEdit() {

        this.$store.dispatch('resetUser').then(() => {

          this.$router.back()
        })
      },
      checkUserPersonId(user) {

        return user.personCode != null || user.personId != null
      },
      async checkUserValid() {

        return new Promise((resolve, reject) => {

          this.$refs.baseinfoForm.validate(valid => {

            if (valid) {

              resolve()
            }
          })
        })
      },
      setRole() {

        this.checkUserValid().then(res => {

          this.$store.dispatch('setCurrentUser', this.user).then(() => {

            let route = { name:'systemadmin_user_rolesetting' }

            this.$router.push(route)
          })
        })
      },
      selectaccount() {

        this.$refs.sel.show()
      }
    },
    created() {

      this.$route.meta.title = this.$route.params.title

      let code = actioncodes['selectperson']

      this.initUserName = this.currentEditUser.userName

      this.justEnableSelect = checkRouteAndActionEnable(code)

      this.user = this.currentEditUser

      if (!this.user.userId) {

        this.placeholderpassword = '******'
      }
    },
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

  .left, .right {

    width: 300px;
  }

  .content {

    width: 90%;
    margin: 1rem auto;
  }

  .createaccount {

    justify-content: space-around;
  }

  .itemrow {

    display: flex;
    justify-content: space-between;
    width: 80%;
    max-width: 700px;
    margin: 2rem auto;
  }

  .itemrow > div {

    width: 40%;
  }

  .specialinput {

    margin-top: 0.5rem;
    border-radius: 2px;
    width: 100%;
    border: 1px solid #d0d5e5;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {

      width: 200px;
      border: none;
      outline: none;
      padding-left: 1rem;
    }

    .el-button {

      margin-right: 0.5rem;
    }
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

  .redstar {

    color: #FF6050;
    position: relative;
    left: -1rem;
    line-height: 1rem;
    height: 1rem;
  }

  $fontcolor:#16325C;

  span {

    color: $fontcolor;
    font-size: 0.8rem;
  }

  .sumtitle {

    position: relative;
    left: -0.2rem;
  }

</style>
