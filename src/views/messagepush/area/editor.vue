<template>
  <transition name="fade" mode="out-in">
    <div>
      <div class="navibar">
        <bread-crumb class="breadcrumb"></bread-crumb>
        <div class="createmessageprocess">
          <span style="color: #AAB6CC;">1 填写基本信息</span>
          <span class="line"></span>
          <span>2 填写通知内容</span>
        </div>
      </div>
      <div class="content">
        <span class="redstar">*</span><span>通知内容</span><span class="subtitle">(限2000个字)</span>
        <div class="richtextinput">
          <rich-text-editor :text="content" @editorChange="editorChange"></rich-text-editor>
        </div>
        <div class="btns">
          <el-button @click="handleToPreStep">上一步</el-button>
          <el-button type="primary" @click="HandleSave">保存</el-button>
          <el-button @click="handelCancel">取消</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import BreadCrumb from '@/components/Breadcrumb/index'
  import richTextEditor from '@/components/richTextEditor'
  import { add } from '@/api/areamessage'
  import { mapGetters } from 'vuex'

  export default {
    components: { BreadCrumb, richTextEditor },
    data() {
      return {
        content:'',
      }
    },
    computed: {
      ...mapGetters([
        'areamessage'
      ]),
    },
    methods: {
      editorChange(html) {

        this.content = html

        console.log(html)

        this.$store.dispatch('setAreaMessageContent',this.content)
      },
      HandleSave() {

        this.$store.dispatch('setAreaMessageContent',this.content).then(() => {

          console.log(this.areamessage)

          add(this.areamessage).then(res => {

            console.log(res)

            this.$message({
              message: '修改成功',
              type: 'success'
            });

            this.$router.go(-2)
          })
        })
      },
      handleToPreStep() {

        this.$router.go(-1)
      },
      handelCancel() {

        this.$router.go(-2)
      },
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">

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

  .content {

    width: 50%;
    margin: 2rem auto;
  }

  .richtextinput {

    margin-top: 1rem;
    height: 24rem;
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

  .subtitle {

    color: #AAB6CC;
    font-size: 0.8rem;
    font-weight: normal;
    margin-left: 1rem;
  }

  $fontcolor:#16325C;

  span {

    color: $fontcolor;
    font-size: 0.9rem;
    font-weight: bold;
    position: relative;
    left: -0.2rem;
  }

</style>
