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
          <el-input placeholder="请输入通知标题" v-model="areamessage.msgSubject"></el-input>
        </div>
        <div class="summary">
          <span class="redstar">*</span><span>摘要</span><span class="subtitle">(限60个字)</span>
          <el-input style="margin-top: 1rem" type="textarea" maxlength="60" placeholder="请输入通知内容摘要" v-model="areamessage.summary"></el-input>
        </div>
        <div class="otherinfo">
          <div class="messagetype">
            <div>
              <span class="redstar">*</span><span>消息类型</span>
            </div>
            <el-select v-model="areamessage.type" placeholder="请选择">
              <el-option v-for="item in messageTypeKeyList" :key="item.value" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="sendtype">
            <div>
              <span>发送方式</span>
            </div>
            <div class="sendtyperadio">
              <el-radio v-model="areamessage.pushChannel" label="APP">App</el-radio>
              <el-radio v-model="areamessage.pushChannel" label="SMS">短信</el-radio>
            </div>
          </div>
        </div>
        <div class="sendstrategy">
          <div>
            <span class="redstar">*</span><span>发送策略</span>
          </div>
          <div style="margin-top: 1rem">
            <el-radio v-model="areamessage.strategy" label="IMMEDIATELY">立即发送</el-radio>
            <el-radio v-model="areamessage.strategy" label="TIMING">定时发送</el-radio>
            <el-date-picker style="margin-left: 1rem" :style="{visibility:areamessage.strategy == 'IMMEDIATELY' ? 'hidden':'visible'}" value-format="yyyy-MM-dd HH:mm:ss" v-model="areamessage.planPushTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </div>
        </div>
        <div class="selectimg">
          <span>主题图片</span>
          <div class="imagecroppaouter">
            <div>
              <croppa
                v-model="myCroppa" :remove-button-size="30" :placeholder-font-size="20" placeholder="点击/拖拽上传" :height="160" :width="460"></croppa>
            </div>
          </div>
          <span class="helpertip">为了更好的显示在捷生活APP首页的信息卡片列表里面，图片尺寸要求</span><span class="focustip">长宽690*240px</span>
        </div>
        <div class="btns">
          <el-button>取消</el-button><el-button type="primary" @click="onEditorMessage">下一步</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>

  import { mapGetters } from 'vuex'
  import PageWidget from '@/components/PageWidget/index'
  import BreadCrumb from '@/components/Breadcrumb/index'

  const pushStatusKeyList = [{ text: '待推送', value: 'UNPUSH' }, { text: '不推送', value: 'NOPUSH' }, { text: '推送成功', value: 'SUCCESS' }, { text: '推送失败', value: 'FAIL' }]
  const messageTypeKeyList = [{ text: '安全防范公告', value: 'SECURITY' }, { text: '物业风采', value: 'PROPERTY' }, { text: '电梯维修保养', value: 'ELEVATOR' }, { text: '投票及调查互动', value: 'VOTE' }, { text: '商店优惠公告', value: 'COUPONS' }]
  const pushChannelKeyList = [{ text: 'APP推送', value: 'APP' }, { text: '短信', value: 'SMS' }]
  const strategyKeyList = [{ text: '立即生效', value: 'IMMEDIATELY' }, { text: '定时生效', value: 'TIMING' }]

  export default {
    components: { PageWidget, BreadCrumb },
    data() {
      return {
        messageTypeKeyList:messageTypeKeyList,
        value:'',
        sendtype:'',
        myCroppa:{},
      }
    },
    computed: {
      ...mapGetters([
        'areamessage'
      ]),
    },
    methods: {
      uploadImg() {


      },
      onEditorMessage() {

        console.log('zz')

        let route = {name:'editormessage'}

        this.$router.push(route)
      },
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">

  .content {

    width: 40%;
    max-width: 700px;
    min-width: 500px;
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

    background: rgba(224,229,238,0.40);
    border: 1px solid #D0D5E5;
    border: 1px ;
    margin-top: 1rem;
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
