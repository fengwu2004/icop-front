<template>
  <div class="login">
    <div class="backgroundimg">
      <img class="cloud1" :src="images.img1">
      <img class="cloud2" :src="images.img2">
      <img class="cloud3" :src="images.img3">
      <img class="cloud4" :src="images.img4">
      <img class="cloud5" :src="images.img5">
      <img class="cloud6" :src="images.img6">
      <img class="city" :src="images.logo">
    </div>
    <div class="main">
      <el-form class="content" :model="loginForm" :rules="loginRules" ref="loginForm">
        <div class="icon"/>
        <div class="title"/>
        <div class="inputgroup">
          <input placeholder="请输入用户名" v-model="loginForm.userName"/>
        </div>
        <div class="inputgroup">
          <input type="password"  placeholder="请输入密码" v-model="loginForm.password"/>
        </div>
        <div class="inputgroup">
          <div class="inputcodegroup">
            <input type="code" placeholder="请输入验证码" alt="验证码" v-model="loginForm.Validate">
            <img ref="captichaimg" class="codeimg" @click="updateCaptcha">
          </div>
        </div>
        <div class="confirm">
          <el-button type="danger" :loading="loading" @click.native.prevent="handleLogin">登 陆</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

  import img1 from '@/assets/loginimg/cloud1.png'
  import img2 from '@/assets/loginimg/cloud2.png'
  import img3 from '@/assets/loginimg/cloud3.png'
  import img4 from '@/assets/loginimg/cloud4.png'
  import img5 from '@/assets/loginimg/cloud5.png'
  import img6 from '@/assets/loginimg/cloud6.png'
  import logo from '@/assets/loginimg/logo.png'

  import { login, captcha } from "@/api/login"
  import { isvalidUsername } from '@/utils/validate'

  const validateUsername = (rule, value, callback) => {

    if (!isvalidUsername(value)) {

      callback(new Error('Please enter the correct user name'))
    }
    else {

      callback()
    }
  }

  const validatePassword = (rule, value, callback) => {

    if (value.length < 6) {

      callback(new Error('The password can not be less than 6 digits'))
    }
    else {

      callback()
    }
  }

  const validateCaptcha = (rule, value, callback) => {

    if (value.length < 4) {

      callback(new Error('The Validate can not be less than 4 digits'))
    }
    else {

      callback()
    }
  }

  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
  }

  export default {
    mounted(){

      this.updateCaptcha()
    },
    data() {
      return {
        imageencode:'',
        isnull: false,
        loading: false,
        images: {
          img1,
          img2,
          img3,
          img4,
          img5,
          img6,
          logo,
        },
        loginForm: {
          userName: '',
          password: '',
          Validate:'',
        },
        loginRules: {
          userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          Validate: [{ required: true, trigger: 'blur', validator: validateCaptcha }]
        },
      }
    },
    methods: {
      updateCaptcha() {

        captcha().then(response => {

          let blob = dataURItoBlob(response.data.outputStream)

          let src = window.URL.createObjectURL(blob)

          this.$refs.captichaimg.src = response.data.outputStream
        })
          .catch(res => {

            console.log(res)
          })
      },
      handleLogin() {

        this.$refs.loginForm.validate(valid => {

          if (valid) {

            this.loading = true

            this.$store.dispatch('LoginByUsername', this.loginForm)
              .then(() => {

                console.log('登陆成功')

                this.loading = false

                let route = {path:'/'}

                this.$router.push(route)
              })
              .catch(() => {

                console.log('登陆失败')

                this.loading = false
              })
          }
          else {
            console.log('error submit!!')

            return false
          }
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
    max-width: 300px;
    display: flex;
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.20);
    justify-content: center;
  }

  .content {

    width: 80%;
  }

  .icon {

    width: 45px;
    height: 45px;
    margin: 1rem auto;
    background: url("/static/loginimg/community-icon.png") no-repeat center/100%;
  }

  .title {

    width: 200px;
    height: 30px;
    margin: 1rem auto;
    background: url("/static/loginimg/title.png") no-repeat center/100%;
  }

  .inputgroup {

    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #d6dadd;
    background: white;

    input {

      line-height: 1.5rem;
      width: 90%;
      margin: 0.5rem auto;
      border: none;
      outline: none;
      font-size: 0.8rem;
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

    .el-button {

      width: 100%;
      line-height: 2rem;
      background: #FF955B;
      border: none;
    }
  }

  .city {
    position: absolute;
    bottom: 0;
    width: 98%;
    height: 39.8%;
    position: absolute;
    display: block;
    z-index: 999;
    animation: city 5s linear infinite;
  }
  @keyframes city {
    0% {
      left: 0%;
    }
    20% {
      left: 1%;
    }
    50% {
      left: 2%;
    }
    80% {
      left: 1%;
    }
    100% {
      left: 0%;
    }
  }

  .backgroundimg {

    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .backgroundimg > img {

    position: absolute;
    z-index: 1;
  }

  .cloud1 {
    top: 8%;
    left: 0%;
    animation: cloud1 5s infinite linear;
  }
  @keyframes cloud1 {
    0% {
      transform: rotate(0deg);
      left: 0%;
    }
    25% {
      transform: rotate(10deg);
      left: 2%;
    }
    50% {
      transform: rotate(15deg);
      left: 3%;
    }
    55% {
      transform: rotate(10deg);
      left: 3.5%;
    }
    70% {
      transform: rotate(5deg);
      left: 2%;
    }
    100% {
      transform: rotate(0deg);
      left: 0%;
    }
  }

  .cloud2 {
    top: 3%;
    left: 15%;
    animation: cloud2 10s infinite linear;
  }
  @keyframes cloud2 {
    0% {
      transform: rotate(5deg);
      left: 15%;
    }
    25% {
      transform: rotate(0deg);
      left: 30%;
    }
    50% {
      transform: rotate(-5deg);
      left: 45%;
    }
    65% {
      transform: rotate(-10deg);
      left: 45%;
    }
    80% {
      transform: rotate(-5 eg);
      left: 30%;
    }
    100% {
      transform: rotate(5deg);
      left: 15%;
    }
  }

  .cloud3 {
    top: 35%;
    left: 4%;
    animation: cloud5 3s infinite linear;
  }
  @keyframes cloud3 {
    0% {
      transform: rotate(0deg);
      top: 35%;
    }
    22.5% {
      transform: rotate(2deg);
      top: 38%;
    }
    45% {
      transform: rotate(2deg);
      top: 40%;
    }
    67.5% {
      transform: rotate(0deg);
      top: 38%;
    }
    100% {
      transform: rotate(2deg);
      top: 35%;
    }
  }

  .cloud4 {
    top: 29%;
    left: 68%;
    animation: cloud4 5s infinite linear;
  }
  @keyframes cloud4 {
    0% {
      transform: rotate(0deg);
      left: 68%;
    }
    35% {
      transform: rotate(20deg);
      left: 68%;
    }
    60% {
      transform: rotate(0deg);
      left: 68%;
    }
    85% {
      transform: rotate(-20deg);
      left: 68%;
    }
    100% {
      transform: rotate(0deg);
      left: 68%;
    }
  }

  .cloud5 {
    left: 80%;
    top: 30%;
    animation: cloud5 5s infinite linear;
  }
  @keyframes cloud5 {
    0% {
      width: 239px;
      height: 209px
    }
    25% {
      width: 249px;
      height: 219px
    }
    50% {
      width: 259px;
      height: 229px
    }
    55% {
      width: 259px;
      height: 229px
    }
    70% {
      width: 249px;
      height: 219px
    }
    100% {
      width: 239px;
      height: 209px
    }
  }

  .cloud6 {
    top: 6%;
    left: 76%;
    animation: cloud6 5s infinite linear;
  }
  @keyframes cloud6 {
    0% {
      transform: rotate(0deg);
      left: 76%;
    }
    25% {
      transform: rotate(20deg);
      left: 76%;
    }
    50% {
      transform: rotate(0deg);
      left: 76%;
    }
    55% {
      transform: rotate(0deg);
      left: 76%;
    }
    70% {
      transform: rotate(0deg);
      left: 76%;
    }
    100% {
      transform: rotate(0deg);
      left: 76%;
    }
  }

</style>
