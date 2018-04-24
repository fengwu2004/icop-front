<template>
  <div id="login">
    <div v-show="false">
      <img class="cloud cloud1" :src="img1">
      <img class="cloud cloud2" :src="img2">
      <img class="cloud cloud3" :src="img3">
      <img class="cloud cloud4" :src="img4">
      <img class="cloud cloud5" :src="img5">
      <img class="cloud cloud6" :src="img6">
      <img class="city" :src="logo">
    </div>
    <div class="main">
      <div class="content">
        <div class="icon"/>
        <div class="title"/>
        <div v-if="isnull" class="text-danger">验证码不能为空</div>
        <div class="form-group">
          <input type="text" placeholder="请输入用户名">
        </div>
        <div class="form-group">
          <input type="password" placeholder="请输入密码">
        </div>
        <div class="form-group">
          <input type="text" placeholder="请输入验证码" alt="验证码">
          <img src="http://120.77.201.142:9507/jsis_3.4.1/randomimage.servlet?falg=1524540618134" class="img-random  "
               title="点击换一张">
        </div>
        <div class="form-group">
          <a class="btn text-center">登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import loginimg from '@/assets/loginimg/community-icon.png'
  import logintitle from '@/assets/loginimg/title.png'
  import img1 from '@/assets/loginimg/cloud1.png'
  import img2 from '@/assets/loginimg/cloud2.png'
  import img3 from '@/assets/loginimg/cloud3.png'
  import img4 from '@/assets/loginimg/cloud4.png'
  import img5 from '@/assets/loginimg/cloud5.png'
  import img6 from '@/assets/loginimg/cloud6.png'
  import logo from '@/assets/loginimg/logo.png'


  export default {
    data() {
      return {
        isnull: false,
        loginimg,
        logintitle,
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        logo,
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .main {

    margin: 10rem auto;width: 40%; max-width: 400px;
    background: red;
  }

  .content {

    width: 80%;
    margin: auto;
  }

  .icon {

    width: 45px;
    height: 45px;
    margin-top: 2rem;
    background: url("/static/loginimg/community-icon.png") no-repeat center/100% 100%;
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
    -moz-animation: city 5s linear infinite;
    -webkit-animation: city 5s linear infinite;
    -o-animation: city 5s linear infinite;
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

  @-webkit-keyframes city {
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

  @-moz-keyframes city {
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

  @-o-keyframes city {
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

  .cloud {

    position: absolute;
  }

  .cloud1 {
    top: 8%;
    left: 0%;
    z-index: 0;
    animation: cloud1 5s infinite linear;
    -moz-animation: cloud1 5s infinite linear;
    -webkit-animation: cloud1 5s infinite linear;
    -o-animation: cloud1 5s infinite linear;
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

  @-webkit-keyframes cloud1 {
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

  @-moz-keyframes cloud1 {
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

  @-o-keyframes cloud1 {
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
    z-index: 0;
    animation: cloud2 10s infinite linear;
    -moz-animation: cloud2 10s infinite linear;
    -webkit-animation: cloud2 10s infinite linear;
    -o-animation: cloud2 10s infinite linear;
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

  @-webkit-keyframes cloud2 {
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

  @-moz-keyframes cloud2 {
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

  @-o-keyframes cloud2 {
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
    -moz-animation: cloud3 3s infinite linear;
    -webkit-animation: cloud3 3s infinite linear;
    -o-animation: cloud3 3s infinite linear;
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

  @-webkit-keyframes cloud3 {
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

  @-moz-keyframes cloud3 {
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

  @-o-keyframes cloud3 {
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
    -moz-animation: cloud4 5s infinite linear;
    -webkit-animation: cloud4 5s infinite linear;
    -o-animation: cloud4 5s infinite linear;
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

  @-webkit-keyframes cloud4 {
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

  @-moz-keyframes cloud4 {
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

  @-o-keyframes cloud4 {
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
    -moz-animation: cloud5 5s infinite linear;
    -webkit-animation: cloud5 5s infinite linear;
    -o-animation: cloud5 5s infinite linear;
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

  @-webkit-keyframes cloud5 {
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

  @-moz-keyframes cloud5 {
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

  @-o-keyframes cloud5 {
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
    -moz-animation: cloud6 5s infinite linear;
    -webkit-animation: cloud6 5s infinite linear;
    -o-animation: cloud6 5s infinite linear;
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

  @-webkit-keyframes cloud6 {
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

  @-moz-keyframes cloud6 {
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

  @-o-keyframes cloud6 {
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
