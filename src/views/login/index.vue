<template>
  <div class="main">
    <el-form class="content" :model="loginForm" :rules="loginRules" ref="loginForm" onsubmit="return false">
      <div class="bluetile"></div>
      <div class="icon"/>
      <div class="title">硬件资产维修管理系统</div>
      <div class="center">
        <el-form-item prop="userName" >
          <div class="inputgroup">
            <input placeholder="请输入用户名" v-model="loginForm.userName" autocomplete="off" autofocus/>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="inputgroup">
            <input style="display:none" name="pwd">
            <input type="password" placeholder="请输入密码" name="pwd" v-model="loginForm.password" autocomplete="off"/>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="confirm">
            <el-button style="width: 100%; color:white !important" type="danger;" :loading="loading" @click="submitLogin" native-type="submit">登 录</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>

  import { login } from "@/api/login"
  import { isvalidUsername } from '@/utils/validate'

  export default {
    data() {
      return {
        loading: false,
        loginForm: {
          userName: '',
          password: '',
          validate:'',
        },
        loginRules: {
          userName: [{ required: true, message:'请填写用户名', trigger: 'blur'}, {min:3, max:20, message:'长度在3到20字符之间', trigger:'blur'}],
          password: [{ required: true, message:'请填写密码', trigger: 'blur'}, {min:6, max:20, message:'长度在6到20字符之间', trigger:'blur'}]
        },
      }
    },
    methods: {
      submitLogin() {

        this.$refs.loginForm.validate(valid => {

          if (!valid) {

            return
          }

          this.loading = true

          this.$store.dispatch('LoginByUsername', this.loginForm)
            .then(() => {

              this.loading = false

              let route = { path: '/' }

              this.$router.push(route)
            })
            .catch(res => {

              this.loading = false
            })
        })
      },
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .login {

    position: absolute;
    width: 100%;
    height: 100%;
  }

  .main {

    margin: 10rem auto;
    background: white;
    position: absolute;
    z-index: 999;
    left: 0;
    right: 0;
    width: 40%;
    max-width: 25rem;
    display: flex;
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.20);
    justify-content: center;
  }

  .content {

    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .bluetile {

    background: #4B74FF;
    box-shadow: 0 0 64px 0 rgba(0,0,0,0.24);
    width: 100%;
    height: 1rem;
  }

  .icon {

    width: 200px;
    height: 60px;
    margin: 1rem auto;
    background: url("../../assets/loginimg/title.png") no-repeat center/100%;
  }

  .title {

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: #0362B3;
    margin-bottom: 2rem;
    letter-spacing: 0;
  }

  .center {

    width: 80%;
  }

  .inputgroup {

    border: 1px solid #4B74FF;
    border-radius: 30px;
    display: flex;
    height: 3rem;

    justify-content: center;
    align-items: center;
    background: white;

    input {

      height: 2rem;
      width: 80%;
      line-height: 3rem;
      border: none;
      outline: none;
      font-size: 0.9rem;
      background:transparent !important;
    }

    *:focus {

      outline: none;
      background-color: transparent !important;
    }
  }

  .inputcodegroup {

    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .code {

      width: 40%;
    }

    .codeimg {

      width: 40%;
    }
  }

  .confirm {

    width: 100%;
    height: 2rem;
    margin: 2rem auto;
    color: white;

    .el-button {

      color: white;
      width: 100%;
      line-height: 2rem;
      background: #4B74FF;
      border-radius: 30px;
      border: none;
    }
  }

</style>
