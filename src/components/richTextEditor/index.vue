<template>
  <div>
    <quill-editor ref="editor" :options="newOption" style="height: 20rem; margin-bottom: 54px" v-model="editorContent" @change="editorChange"></quill-editor>
    <form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti">
      <input style="display: none" :id="uniqueId" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg()">
    </form>
  </div>
</template>
<script>

  import { picFile } from "@/api/fileupload";
  import { quillEditor } from 'vue-quill-editor'
  import Quill from 'quill'
  import { ImageImport } from './modules/ImageImport.js'
  import { ImageResize } from './modules/ImageResize.js'
  Quill.register('modules/imageImport', ImageImport)
  Quill.register('modules/imageResize', ImageResize)

  export default {
    props: ['text', 'editorId'],
    components: {quillEditor},
    data(){
      return {
        editorContent: '',
        uniqueId: 'thisismyunipqueidofabdkwidnwef0',
        imgPercent: 0,
        imageLoading: false,
        newOption: {
          placeholder: '请输入通知内容',
          history: {
            delay: 100,
            maxStack: 100,
            userOnly: false
          },
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image']
            ],
            imageImport: true,
            imageResize: {
              displaySize: true
            },
          },
          strict: false,//should be false for ignore unexpected update
        },
        addImgRange: '',//全局参数，每次添加图片时记录当前索引和长度
      }
    },
    computed: {
    },
    methods: {
      editorChange({ editor, html, text }) {

        var vm = this

        vm.$emit('editorChange', html)
      },
      insertImgUrl(url) {

        if (url != null && url.length > 0) {

          console.log('insertimg', url)

          var value = url

          value = value.indexOf('http') != -1 ? value : 'http:' + value //返回图片网址中如果没有http自动拼接

          let index = this.addImgRange != null ? this.addImgRange.index:0 // 获取插入时的位置索引，如果获取失败，则插入到最前面

          this.$refs.editor.quill.insertEmbed(index , 'image', value, Quill.sources.USER)

          var img = new Image()

          img.src = value

          this.$refs.editor.quill.formatText(index, index + 1, 'width', 400 + 'px');
        }
        else {

        }

        document.getElementById(this.uniqueId).value = ''

      },
      uploadImg: async function() {

        var self = this

        self.imageLoading = true

        var formData = new FormData()

        formData.append('file', document.getElementById(this.uniqueId).files[0])

        let params = {
          picType:'JSLIFEMESSAGE',
          productCode:'ICOP',
          imgType:'.jpg'
        }

        try {

          const url = await self.uploadImgReq(formData, params)

          console.log(url)

          self.insertImgUrl(url)
        }
        catch ({message: msg}) {

          document.getElementById(self.uniqueId).value = ''
        }

        self.imageLoading = false
      },
      uploadImgReq (data, params) {

        return new Promise((resolve, reject) => {

          picFile(data, params).then(res => {

            resolve(res.data.respData.url)

          }).catch(res => {

            reject({message: '图片上传失败'})
          })
        })
      },
      imageHandler(state) {

        this.addImgRange = this.$refs.editor.quill.getSelection()

        if (state) {

          let fileInput = document.getElementById(this.uniqueId)

          fileInput.click()
        }
      }
    },
    created: function () {

      this.imgPercent = 0

      this.editorContent = this.text

      this.uniqueId = this.editorId ? this.editorId:'inputImg'
    },
    watch:{
      text: function () {

        var vm = this

        vm.editorContent = vm.text
      }
    },
    mounted() {

      this.$refs.editor.quill.getModule("toolbar").addHandler("image", this.imageHandler)
    }

  }
</script>
<style scoped>

</style>
