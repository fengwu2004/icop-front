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
        <div class="settings">
          <el-button type="success" @click="()=>handleAudit(true)" style="margin-right: 2rem;margin-left: 2rem;">通过</el-button>
          <el-button type="primary" @click="()=>askToConfim()">不通过</el-button>
        </div>
      </el-form>
      <el-dialog title="请输入不通过原因" :visible.sync="dialogVisible" width="30%" :modal="false" center>
        <el-input v-model="disableMessage"></el-input>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="()=>handleAudit(false)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  import { auditRepairer } from '@/api/user'
  import SelectUser from '@/components/SelectUser/index'
  import BreadCrumb from '@/components/Breadcrumb'
  import md5 from 'blueimp-md5'
  export default {
    components: { SelectUser, BreadCrumb },
    data() {
      return {
        dialogVisible:false,
        disableMessage:'',
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
    methods:{
      handleAudit(value) {

        let data = {

          repairerId:this.user.id,
          notPassReason:this.disableMessage,
          auditResult:0
        }

        if (value) {

          data.auditResult = 1
        }

        auditRepairer(data)
          .then(()=>{

            this.$message.success("提交成功")

            let route = {name:'systemadmin_user'}

            this.$router.push(route)
          })
          .catch(msg=>{

            this.$message.error(msg);
          })
          .finally(()=>{

            this.dialogVisible = false
          })

      },
      askToConfim() {

        this.dialogVisible = true
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
