<template>
  <div class="main">
    <div class="title">智慧社区运营平台</div>
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
      <el-dialog title="修改密码" :visible.sync="dialogVisible" width="20%">
        <div class="inputgroup">
          <span>旧密码</span><el-input v-model="oldPwd" type="password"></el-input>
        </div>
        <div class="inputgroup">
          <span>新密码</span><el-input v-model="newPwd1" type="password"></el-input>
        </div>
        <div class="inputgroup">
          <span>请再次输入</span><el-input v-model="newPwd1" type="password"></el-input>
        </div>
        <div class="btns">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editPassword">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Screenfull from '@/components/Screenfull'

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

        this.dialogVisible = true
      },
      toggleSideBar() {

        this.$store.dispatch('toggleSideBar')
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
  }

  .main {

    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
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

    margin-top: 0.51rem;
    display: flex;
    justify-content: center;
    align-items: center;

    span {

      display: inline-block;
      width: 40%;
      max-width: 5rem;
    }

    .el-input {

      width: 50%;
    }
  }

  .btns {

    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

</style>
