<template>
  <div class="main">
    <div class="title">
      <img :src="jsListIcon" height="30" width="30"/>
      <span>智慧社区运营平台</span>
    </div>
    <div class="rightmenu">
      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span @click="dialogVisible = true" style="display:block;">{{$t('navbar.editpassword')}}</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog title="修改密码" :visible.sync="dialogVisible" width="515px" :modal-append-to-body="false" :lock-scroll="true" :append-to-body="false">
        <el-form auto-complete="off">
          <div class="inputgroup">
            <span>旧密码</span>
            <input style="display:none" name="txtpwd">
            <el-input v-model="oldPwd" type="password" name="txtpwd" auto-complete="off"></el-input>
          </div>
          <div class="inputgroup">
            <span>新密码</span>
            <el-popover
              placement="right"
              width="150"
              trigger="focus">
              <span style="font-size: 0.6rem">密码长度6-18位,字母，数组，标点符号，不允许空格</span>
              <el-input style="width: 200px;" v-model="newPwd1" slot="reference" type="password" auto-complete="off"></el-input>
            </el-popover>
          </div>
          <div class="inputgroup">
            <span>请再次输入</span>
            <el-input v-model="newPwd2" type="password" auto-complete="off"></el-input>
          </div>
          <div class="btns">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editPassword">确 定</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import jsListIcon from '@/assets/jlife_icon.png'
  import { editPwd } from "@/api/login";
  import { mapGetters } from 'vuex'
  import Screenfull from '@/components/Screenfull'
  import md5 from 'blueimp-md5'

  export default {

    name:'AppHeaderBar',
    components: {
      Screenfull,
    },
    data() {
      return {
        dialogVisible:false,
        oldPwd:'',
        newPwd1:'',
        newPwd2:'',
        jsListIcon:jsListIcon,
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ])
    },
    methods: {
      editPassword() {

        if (this.newPwd1 !== this.newPwd2) {

          this.$message.error("新密码两次输入不匹配")

          return
        }

        let data = {
          oldPwd:md5(this.oldPwd) ,
          newPwd:md5(this.newPwd1)
        }

        editPwd(data).then(res => {

          this.$message({
            message: '密码修改成功',
            type: 'success'
          });

          this.dialogVisible = true
        })
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {

          location.reload()// In order to re-instantiate the vue-router object to avoid bugs
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .avatar-container {
    height: 50px;
    margin-right: 30px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }

  .title {

    font-size: 1.5rem;
    display: flex;
    align-items: center;

    img {

      margin-right: 1rem;
    }
  }

  .main {

    background: #FFFFFF;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.10);
    padding: 0 2rem;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rightmenu {

    width: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .inputgroup {

    margin-top: 2rem;
    display: flex;
    justify-content: flex-start;
    padding-left: 3rem;
    align-items: center;

    span {

      display: inline-block;
      width: 80px;
      max-width: 5rem;
    }

    .el-input {

      width: 200px;
    }
  }

  .inputgroup:first-child {

    margin-top: 0;
  }

  .btns {

    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

</style>
