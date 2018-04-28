<template>
  <div class="content">
    <div class="createaccount">
      <div class="left">
        <div>
          <li>人员编号</li>
          <el-input style="margin-top: 0.5rem" v-model="user.personCode"></el-input>
        </div>
        <div style="margin-top: 2rem">
          <li>姓名</li>
          <el-input style="margin-top: 0.5rem" v-model="user.name"></el-input>
        </div>
        <div style="margin-top: 2rem">
          <li>账户</li>
          <el-input style="margin-top: 0.5rem" v-model="user.userName"></el-input>
          <div style="margin-top: 10px">
            <span style="font-size: 0.8rem;color: #445577;">注:不能重名,登录时需同时输入@部分</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div>
          <span>联系电话</span>
          <el-input style="margin-top: 0.5rem" v-model="user.telephone"></el-input>
        </div>
        <div style="margin-top: 2rem">
          <span>性别</span>
          <div style="margin-top: 0.5rem">
            <el-radio v-model="user.sex" label="1">男</el-radio>
            <el-radio v-model="user.sex" label="2">女</el-radio>
          </div>
        </div>
        <div style="margin-top: 3rem">
          <li>密码</li>
          <el-input type="password" style="margin-top: 0.5rem">AAAAAA</el-input>
          <div style="margin-top: 10px">
            <span style="font-size: 0.8rem;color: #445577;">注:初始密码为6个8</span>
          </div>
        </div>
      </div>
    </div>
    <div class="settings">
      <el-button @click="cancelEdit">取消</el-button>
      <el-button type="primary">保存</el-button>
      <el-button type="success" @click="setRole">继续分配角色</el-button>
    </div>
    <select-account ref="sel"></select-account>
  </div>
</template>

<script>

  import { add } from '@/api/user'
  import SelectAccount from '@/components/SelectAccount/index'

  export default {
    components: { SelectAccount },
    data() {
      return {
        user:{
          sex:'',
          personCode:'',
          name:'',
          telephone:'',
          userName:'',
        }
      }
    },
    computed: {
      ...mapGetters([
        'currentEditUser'
      ]),
    },
    created() {

      console.log('created')

      if (this.$route.params.user != undefined) {

        this.user = this.$route.params.user

        this.$store.dispatch('setCurrentUser', this.user)
      }
      else {

        console.log('zz')
        console.log(this.$store.state.usereditmanager.currentUser)
        console.log('zzz')

        this.user = this.$store.state.usereditmanager.currentUser
      }
    },
    methods:{
      cancelEdit() {

        this.$store.dispatch('clearUser')

        this.$router.back()
      },
      setRole() {

        let route = {

          name:'rolesetting',
          params:{user:this.user}
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


</style>
