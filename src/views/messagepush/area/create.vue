<template>
  <transition name="fade" mode="out-in">
    <div class="content">
      <div class="title">
        <div>主题<span>(限30个字)</span></div>
        <el-input placeholder="请输入通知标题"></el-input>
      </div>
      <div class="summary">
        <div>摘要<span>(限60个字)</span></div>
        <el-input style="margin-top: 1rem" type="textarea" maxlength="60" placeholder="请输入通知内容摘要"></el-input>
      </div>
      <div class="otherinfo">
        <div class="messagetype">
          <div>消息类型</div>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="sendtype">
          <div>发送方式</div>
          <div class="sendtyperadio">
            <el-radio v-model="sendtype" label="1">备选项</el-radio>
            <el-radio v-model="sendtype" label="2">备选项</el-radio>
          </div>
        </div>
      </div>
      <div class="selectimg">
        <div>主题图片</div>
        <div class="img-cropper"></div>
        <div class="tip">为了更好的显示捷生活APP首页的信息卡片列表里面，图片尺寸为690*240px</div>
      </div>
      <div class="btns">
        <el-button>取消</el-button><el-button type="primary" @click="onEditorMessage">下一步</el-button>
      </div>
    </div>
  </transition>
</template>
<script>

  import PageWidget from '@/components/PageWidget/index'
  import BreadCrumb from '@/components/Breadcrumb/index'

  export default {

    components: { PageWidget, BreadCrumb },

    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value:'',
        sendtype:'',
      }
    },
    methods: {
      onEditorMessage() {

        console.log('zz')

        this.$router.push({name:'editormessage'})
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
