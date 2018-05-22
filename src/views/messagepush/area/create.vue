<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="navibar">
        <bread-crumb class="breadcrumb"></bread-crumb>
        <div class="createmessageprocess">
          <span>1 填写基本信息</span>
          <span class="line"></span>
          <span style="color: #AAB6CC;">2 填写通知内容</span>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <span class="redstar">*</span><span>主题</span><span class="subtitle">(限30个字)</span>
          <el-input maxlength="30" placeholder="请输入通知标题" v-model="message.msgSubject"></el-input>
        </div>
        <div class="summary">
          <span class="redstar">*</span><span>摘要</span><span class="subtitle">(限60个字)</span>
          <el-input style="margin-top: 1rem;" type="textarea" maxlength="60" placeholder="请输入通知内容摘要" v-model="message.summary"></el-input>
        </div>
        <div class="otherinfo">
          <div class="messagetype">
            <div>
              <span class="redstar">*</span><span>消息类型</span>
            </div>
            <el-select v-model="message.noticeType" placeholder="请选择">
              <el-option v-for="item in noticeTypeKeyList" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="sendtype">
            <div>
              <span>发送方式</span>
            </div>
            <div class="sendtyperadio">
              <el-radio v-model="message.sendType" label="APP">App</el-radio>
              <el-radio v-model="message.sendType" label="SMS">短信</el-radio>
            </div>
          </div>
        </div>
        <div class="sendstrategy">
          <span class="redstar">*</span><span>发送策略</span>
          <div style="margin-top: 1rem">
            <el-radio v-model="message.sendStrategy" label="IMMEDIATE">立即发送</el-radio>
            <el-radio v-model="message.sendStrategy" label="TIMES">定时发送</el-radio>
            <el-date-picker style="margin-left: 1rem" :style="{visibility:message.sendStrategy == 'IMMEDIATE' ? 'hidden':'visible'}" value-format="yyyy-MM-dd HH:mm:ss" v-model="message.planSendTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </div>
        </div>
        <div class="selectimg">
          <image-cropper :initImageUrl="message.imageUrl"></image-cropper>
        </div>
        <div class="btns">
          <el-button @click="onCancelCreate">取消</el-button><el-button type="primary" @click="onEditorMessage">下一步</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>

  import { mapGetters } from 'vuex'
  import PageWidget from '@/components/PageWidget/index'
  import BreadCrumb from '@/components/Breadcrumb/index'
  import ImageCropper from '@/components/ImageCropper/index'
  import { pushStatusKeyList, noticeTypeKeyList, pushChannelKeyList, strategyKeyList } from "@/utils/constvalues";
  import { trim } from "@/utils/validate";

  export default {
    components: { PageWidget, BreadCrumb, ImageCropper },
    data() {
      return {
        noticeTypeKeyList:noticeTypeKeyList,
        value:'',
        sendtype:'',
        myCroppa:{},
      }
    },
    computed: {
      ...mapGetters([
        'message'
      ]),
    },
    methods: {
      checkMessageValid() {

        if (!this.message.msgSubject) {

          this.$message({
            message: '消息主题不能为空',
            type: 'warning'
          });

          console.log('zz')

          return false
        }

        let msgSubject = trim(this.message.msgSubject)

        if (msgSubject.length > 30 || msgSubject <= 0) {

          this.$message({
            message: '通知主题不能为空',
            type: 'warning'
          });

          return false
        }

        if (!this.message.sendType) {

          this.$message({
            message: '消息发送方式不能为空',
            type: 'warning'
          });

          return false
        }

        if (!this.message.sendStrategy) {

          this.$message({
            message: '消息发送策略需要选择',
            type: 'warning'
          });

          return false
        }

        return true
      },
      onEditorMessage() {

        if (!this.checkMessageValid()) {

          return
        }

        let route = {name:'messagepush_area_edit'}

        this.$router.push(route)
      },
      onCancelCreate() {

        this.$router.go(-1)
      }
    },
    mounted() {

      if (this.message.messageId) {

        this.$route.meta.title = '修改通知'
      }
      else {

        this.$route.meta.title = '创建通知'
      }
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

  .title, .summary {

    .el-input {

      margin-top: 1rem;
    }
  }

  .summary {

    margin-top: 2rem;
  }

  .otherinfo {

    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }

  .messagetype {

    .el-select {

      margin-top: 1rem;
    }
  }

  .sendtype {

    width: 40%;

    .sendtyperadio {

      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
    }
  }

  .selectimg {

    margin-top: 2rem;

    .img-cropper {

      width: 100%;
      height: 300px;
      border: 1px solid black;
    }

    .tip {

      font-size: 0.6rem;
      margin-top: 0.5rem;
    }
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

</style>
