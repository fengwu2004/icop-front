<template>
  <div>
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
    </div>
    <div class="content">
      <el-form :model="user" ref="baseinfoForm">
        <div class="createaccount">
          <div class="itemrow">
            <div>
              <span class="redstar">*</span><span class="sumtitle">姓名</span>
              <el-form-item prop="personName">
                <el-input style="margin-top: 0.5rem" :disabled="true" v-model="user.name"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="itemrow">
            <div>
              <span class="redstar">*</span><span class="sumtitle">身份证</span>
              <el-form-item prop="personName">
                <el-input style="margin-top: 0.5rem" :disabled="true" v-model="user.identityNum"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="itemrow">
            <div>
              <span>联系电话</span>
              <el-form-item prop="telephone">
                <el-input style="margin-top: 0.5rem" :disabled="true" v-model="user.phone" max="30"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="itemrow">
            <div>
              <span class="redstar">*</span><span class="sumtitle">企业识别号</span>
              <el-form-item prop="personName">
                <el-input style="margin-top: 0.5rem" :disabled="true" v-model="user.qiyeshibiehao"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
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
  export default {
    components: { SelectUser, BreadCrumb },
    data() {
      return {
        user:{
          identityNum:null,
          phoneValidated:null,
          createTime:null,
          phone:null,
          qiyeshibiehao:null,
          name:null,
          company:null,
          id:null,
          applyTime:null,
          applyCheckTime:null,
          lastUpdateTime:null,
          status:null,
        }
      }
    },
    computed: {
      ...mapGetters([
        'currentEditUser'
      ]),
    },
    created() {

      this.$route.meta.title = this.$route.params.title

      this.user = this.currentEditUser
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
