<template>
  <transition name="fade" mode="out-in">
    <div class="content">
      <div class="title">
        <div>主题<span>(限30个字)</span></div>
        <el-input placeholder="请输入通知标题" v-model="areamessage.msgSubject"></el-input>
      </div>
      <div class="summary">
        <div>摘要<span>(限60个字)</span></div>
        <el-input style="margin-top: 1rem" type="textarea" maxlength="60" placeholder="请输入通知内容摘要" v-model="areamessage.summary"></el-input>
      </div>
      <div class="otherinfo">
        <div class="messagetype">
          <div>消息类型</div>
          <el-select v-model="areamessage.type" placeholder="请选择">
            <el-option v-for="item in messageTypeKeyList" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="sendtype">
          <div>发送方式</div>
          <div class="sendtyperadio">
            <el-radio v-model="areamessage.pushChannel" label="APP">App推送</el-radio>
            <el-radio v-model="areamessage.pushChannel" label="SMS">短信</el-radio>
          </div>
        </div>
      </div>
      <div class="sendstrategy">
        <div>发送策略</div>
        <el-radio v-model="areamessage.strategy" label="IMMEDIATELY">立即发送</el-radio>
        <el-radio v-model="areamessage.strategy" label="TIMING">定时发送</el-radio>
        <el-date-picker v-if="areamessage.strategy != 'IMMEDIATELY'" value-format="yyyy-MM-dd HH:mm:ss" v-model="areamessage.planPushTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </div>
      <div class="selectimg">
        <div>主题图片</div>
        <div>
          <croppa v-model="myCroppa" :remove-button-size="30"
                  :placeholder-font-size="20"
                  placeholder="点击/拖拽上传"
                  :height="240" :width="690"></croppa>
        </div>
      </div>
      <div class="btns">
        <el-button>取消</el-button><el-button type="primary" @click="onEditorMessage">下一步</el-button>
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

    width: 50%;
    margin: 1rem auto;
  }

  .navbar {

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: red;
  }

  .title, .summary {

    .el-input {

      margin-top: 1rem;
    }

    span {

      color:red;
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

    .sendtyperadio {

      margin-top: 1rem;
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

</style>
