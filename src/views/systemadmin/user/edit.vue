<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
    </div>
    <div class="content">
      <div class="createaccount">
        <div class="left">
          <div>
            <span class="redstar">*</span><span class="sumtitle">人员编号</span>
            <div class="specialinput">
              <input v-model="currentEditUser.personCode" :disabled="justEnableSelect"/><el-button v-show="justEnableSelect" type="primary" plain size="mini" @click="selectaccount">请选择</el-button>
            </div>
          </div>
          <div style="margin-top: 2rem">
            <span>姓名</span>
            <el-input style="margin-top: 0.5rem" :disabled="justEnableSelect" v-model="currentEditUser.name"></el-input>
          </div>
          <div style="margin-top: 2rem">
            <span class="redstar">*</span><span class="sumtitle">账户</span>
            <el-input style="margin-top: 0.5rem" v-model="currentEditUser.userName"></el-input>
            <div style="margin-top: 10px">
              <span style="font-size: 0.8rem;color: #445577;">注:不能重名,登录时需同时输入@部分</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div>
            <span>联系电话</span>
            <el-input style="margin-top: 0.5rem" :disabled="justEnableSelect" v-model="currentEditUser.telephone"></el-input>
          </div>
          <div style="margin-top: 2rem">
            <span>性别</span>
            <div style="margin-top: 0.5rem">
              <el-radio :disabled="justEnableSelect" v-model="currentEditUser.sex" label="男">男</el-radio>
              <el-radio :disabled="justEnableSelect" v-model="currentEditUser.sex" label="女">女</el-radio>
            </div>
          </div>
          <div style="margin-top: 3rem">
            <span class="redstar">*</span><span class="sumtitle">密码</span>
            <el-input type="password" style="margin-top: 0.5rem" placeholder="******" v-model="currentEditUser.password"></el-input>
            <div style="margin-top: 10px">
              <span style="font-size: 0.8rem;color: #445577;">注:初始密码为6个8</span>
            </div>
          </div>
        </div>
      </div>
      <div class="settings">
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" style="margin-right: 2rem;margin-left: 2rem;">保存</el-button>
        <el-button type="success" @click="setRole">继续分配角色</el-button>
      </div>
      <select-user ref="sel"></select-user>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  import { add } from '@/api/user'
  import SelectUser from '@/components/SelectUser/index'
  import BreadCrumb from '@/components/Breadcrumb'

  export default {
    components: { SelectUser, BreadCrumb },
    computed: {
      ...mapGetters([
        'currentEditUser'
      ]),
    },
    data() {
      return {
        justEnableSelect:true
      }
    },
    created() {

      console.log('created')
    },
    methods:{
      cancelEdit() {

        this.$store.dispatch('resetUser').then(() => {

          this.$router.back()
        })
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
    flex-grow: 1;
  }

  .left, .right {

    width: 300px;
  }

  .content {

    width: 90%;
    margin: 1rem auto;
  }

  .createaccount {

    display: flex;
    justify-content: space-around;
  }

  .specialinput {

    margin-top: 0.5rem;
    border-radius: 2px;
    width: 300px;
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
