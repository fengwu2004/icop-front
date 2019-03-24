<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="navibar">
        <bread-crumb class="breadcrumb"></bread-crumb>
      </div>
      <div class="content">
        <el-form :rules="rules" :model="equip" ref="formData">
          <div class="title">
            <span class="redstar">*</span><span>资产名称</span><span class="subtitle">(限30个字)</span>
            <div style="margin-top: 1rem;">
              <el-form-item prop="name">
                <el-input maxlength="30" placeholder="请输入资产名称" v-model="equip.name"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="summary">
            <span class="redstar">*</span><span>描述</span><span class="subtitle">(限60个字)</span>
            <div style="margin-top: 1rem;">
              <el-form-item prop="describe">
                <el-input type="textarea" maxlength="60" placeholder="请输入资产描述" v-model="equip.describe"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="sendstrategy">
            <span class="redstar">*</span><span>资产分类</span>
            <div style="margin-top: 1rem">
              <el-form-item prop="category">
                <el-radio v-model="equip.category" label="道闸">道闸</el-radio>
                <el-radio v-model="equip.category" label="安检门">安检门</el-radio>
                <el-radio v-model="equip.category" label="门禁">门禁</el-radio>
                <el-radio v-model="equip.category" label="摄像头">摄像头</el-radio>
              </el-form-item>
            </div>
          </div>
          <div class="summary">
            <span class="redstar">*</span><span>上传图片</span>
            <div style="margin-top: 1rem">
            <el-upload action="" :file-list="fileList" :auto-upload="false" :multiple="true" list-type="picture-card" :on-change="handleImageChange" :on-remove="handleRemove"><i class="el-icon-plus"></i></el-upload>
            </div>
          </div>
          <div class="btns">
            <el-button @click="onCancelCreate">取消</el-button><el-button type="primary" @click="onCreate">提交</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </transition>
</template>
<script>

  import { trim, validateMsgSubject, validateMsgSummary } from "@/utils/validate";
  import PageWidget from '@/components/PageWidget/index'
  import BreadCrumb from '@/components/Breadcrumb/index'
  import { addEquip } from "@/api/innermessage"

  export default {
    components: { PageWidget, BreadCrumb },
    data() {
      let validEquipName = (rule, value, callback) => {

        if (!value) {

          return callback(new Error('请输入通知主题'))
        }

        if (!validateMsgSubject(value)) {

          return callback(new Error('30个字以内，中文，字母，数字'));
        }

        callback()
      }

      return {
        fileList:[],
        equip:{
          name:null,
          describe:null,
          category:'道闸'
        },
        rules:{
          name:[
            {validator:validEquipName, trigger:'blur'},
          ],
          describe:[
            {required: true, message: '请输入描述', trigger: 'blur' },
            {min:1, max:60, message:'不能为空，60个字以内', trigger:'blur'},
          ]
        }
      }
    },
    methods: {
      handleImageChange(file, fileList) {

        this.fileList = fileList
      },
      handleRemove(file, fileList) {

        this.fileList = fileList
      },
      onCreate() {

        var formdata = new FormData()

        this.fileList.forEach(img=>{

          formdata.append("imgFiles", img)
        })

        this.$refs.formData.validate(valid => {

          if (valid) {

            addEquip(formdata, this.equip)
              .then(res => {

                this.$message({
                  message: '恭喜你，这是一条成功消息',
                  type: 'success'
                });

              this.$router.go(-1)
            })
          }
        })
      },
      onCancelCreate() {

        this.$router.go(-1)
      }
    },
    mounted() {

      this.$route.meta.title = '录入资产'
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">

  .content {

    width: 500px;
    margin: 2rem auto;
  }

  .navibar {

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #D0D5E5;
  }

  .createmessageprocess {

    position: relative;
    left: -25%;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .line {

      margin: 0 2rem;
      width: 50px;
      height: 1px;
      background: #D0D5E5;
    }

    span {

      font-size: 0.8rem;
      color: deepskyblue;
    }
  }

  .summary {

    margin-top: 2rem;
  }

  .btns {

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
    font-size: 0.9rem;
    font-weight: bold;
    position: relative;
    left: -0.2rem;
  }

  .subtitle {

    color: #AAB6CC;
    font-size: 0.8rem;
    font-weight: normal;
    margin-left: 1rem;
  }

  .sendstrategy {

    margin-top: 2rem;
    min-width: 500px;
  }

  .helpertip {

    color: #445577;
    font-size: 0.7rem;
    font-weight: normal;
    margin-top: 1rem;
  }

  .focustip {

    color: black;
    font-size: 0.7rem;
    font-weight: normal;
  }

  .imagecroppaouter {

    background: #E0E5EE;
    border: 1px solid #D0D5E5;
    margin-top: 1rem;
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .errortip {

    color: red;
    font-size: 0.4rem;
    margin-top: 0.5rem;
    padding-left: 0.5rem;
  }

</style>
