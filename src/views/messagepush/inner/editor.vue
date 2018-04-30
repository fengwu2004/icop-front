<template>
  <transition name="fade" mode="out-in">
    <div class="content">
      <div>通知内容<span>(限2000个字)</span></div>
      <div class="richtextinput">
        <quill-editor v-model="content"
                      ref="quilleditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </div>
      <div class="btns">
        <el-button>上一步</el-button>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </div>
  </transition>
</template>

<script>

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import { quillEditor } from 'vue-quill-editor'

  export default {
    components: { quillEditor },
    data() {
      return {
        content:'',
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    },
    computed: {
      editor() {
        return this.$refs.quilleditor.quill
      }
    },
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">

  .content {

    width: 50%;
    margin: 2rem auto;
  }

  .richtextinput {

    margin-top: 1rem;
  }

  .btns {

    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

</style>
