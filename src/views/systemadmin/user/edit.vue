<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
    </div>
    <div class="content">
      <div class="createaccount">
        <div class="itemrow">
          <div>
            <span class="redstar">*</span><span class="sumtitle">人员编号</span>
            <div class="specialinput">
              <input v-model="currentEditUser.personCode" :disabled="justEnableSelect"/><el-button v-show="justEnableSelect" type="primary" plain size="mini" @click="selectaccount">请选择</el-button>
            </div>
          </div>
          <div>
            <span>联系电话</span>
            <el-input style="margin-top: 0.5rem" :disabled="justEnableSelect" v-model="currentEditUser.telephone"></el-input>
          </div>
        </div>
        <div class="itemrow">
          <div>
            <span>姓名</span>
            <el-input style="margin-top: 0.5rem" :disabled="justEnableSelect" v-model="currentEditUser.name"></el-input>
          </div>
          <div>
            <span>性别</span>
            <div style="margin-top: 1rem">
              <el-radio :disabled="justEnableSelect" v-model="currentEditUser.sex" label="MALE">男</el-radio>
              <el-radio :disabled="justEnableSelect" v-model="currentEditUser.sex" label="FEMALE">女</el-radio>
            </div>
          </div>
        </div>
        <div class="itemrow">
          <div>
            <span class="redstar">*</span><span class="sumtitle">账户</span>
            <el-input style="margin-top: 0.5rem" v-model="currentEditUser.userName" @blur="onUserNameBlur"></el-input>
            <div style="margin-top: 10px">
              <span style="font-size: 0.8rem;color: #445577;">注:不能重名,登录时需同时输入@部分</span>
            </div>
          </div>
          <div>
            <span class="redstar">*</span><span class="sumtitle">密码</span>
            <input style="display:none" name="txtpwd">
            <el-input type="password" style="margin-top: 0.5rem" placeholder="******" v-model="currentEditUser.password" name="txtpwd"></el-input>
            <div style="margin-top: 10px">
              <span style="font-size: 0.8rem;color: #445577;">注:初始密码为6个8</span>
            </div>
          </div>
        </div>
      </div>
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

  import { validateName } from "@/utils/validate";
  import { mapGetters } from 'vuex'
  import { edit, checkExistUserName, add } from '@/api/user'
  import SelectUser from '@/components/SelectUser/index'
  import BreadCrumb from '@/components/Breadcrumb'

  export default {
    components: { SelectUser, BreadCrumb },
    data() {
      return {
        justEnableSelect:true
      }
    },
    computed: {
      ...mapGetters([
        'currentEditUser'
      ]),
    },
    methods:{
      onUserNameBlur() {

        if (!this.currentEditUser.userName || this.currentEditUser.userName.length == 0) {

          return
        }

        let data = {userName:this.currentEditUser.userName}

        checkExistUserName(data).then(res => {

          if (res.data.respData) {

            this.$message({
              message: '警告，账户名重复',
              type: 'warning'
            });
          }
        })
      },
      handleCreate() {

        console.log('handleCreate')

        let user = this.currentEditUser

        if (!this.checkUserValid(user)) {

          return
        }

        if (user.userId) {

          edit(user).then(response => {

            this.$message({
              message: '保存成功',
              type: 'success'
            });

          })
        }
        else {

          add(user).then(response => {

            this.$message({
              message: '保存成功',
              type: 'success'
            });

          })
        }
      },
      onSelectedPerson(person) {

        console.log(person)

        let user = {}

        Object.assign(user, this.currentEditUser, person)

        this.$store.dispatch('setCurrentUser', user).then(() => {

          console.log(this.currentEditUser)
        })
      },
      cancelEdit() {

        this.$store.dispatch('resetUser').then(() => {

          this.$router.back()
        })
      },
      checkUserNameValid(user) {

        return user.userName && user.userName.length > 0 && validateName(user.userName)
      },
      checkUserPersonId(user) {

        return user.personId != null
      },
      checkUserValid(user) {

        if (!this.checkUserPersonId(user)) {

          this.$message({
            message: '警告，人员编号不能为空',
            type: 'warning'
          });

          return false
        }

        if (this.checkUserNameValid(user)) {

          this.$message({
            message: '警告，账户名格式错误',
            type: 'warning'
          });

          return false
        }

        return true
      },
      setRole() {

        let route = {

          name:'rolesetting'
        }

        this.$router.push(route)
      },
      selectaccount() {

        this.$refs.sel.show()
      }
    },
    created() {

      this.$route.meta.title = this.$route.params.title
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
