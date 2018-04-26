<template>
    <div class="navibarmain">
      <bread-crumb class="breadcrumb"></bread-crumb>
      <el-button v-if="createmessage" @click="createMessage" type="primary"><i class="el-icon-plus el-icon--left"></i>新增</el-button>
      <div v-if="createmessageprocess" class="createmessageprocess">
        <span>1 填写基本信息</span>
        <span class="line"></span>
        <span>2 填写通知内容</span>
      </div>
      <div v-if="usercreatesearch" class="createuser">
        <el-input class="input" placeholder="请输入角色名称查询"></el-input>
        <el-button class="search" @click="searchuser">查询</el-button>
        <el-button class="create" @click="createuser">创建</el-button>
      </div>
      <div v-if="checkUserManger" class="createuser">
        <el-input class="input" placeholder="请输入人员编号、姓名"></el-input>
        <el-button class="search" @click="searchaccount">查询</el-button>
        <el-button class="create" @click="createaccount">创建</el-button>
      </div>
    </div>
</template>

<script>

  import BreadCrumb from '@/components/Breadcrumb'

  export default {

    components: { BreadCrumb },

    props:['createmessage', 'createmessageprocess', 'usercreatesearch', 'accountcreatesearch'],

    methods:{

      searchuser() {


      },

      createuser() {

        this.$emit('createuser')
      },

      searchaccount() {


      },

      createaccount() {


      },

      createMessage() {

        this.$emit('createNewMessage')
      },
    },

    data() {

      return {


      }
    },
    computed:{

      checkUserManger:function() {

        console.log(this.$route)

        return this.$route.name == "usermanager"
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .navibarmain {

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

      margin: 0 1rem;
      width: 100px;
      height: 1px;
      background: grey;
    }

    span {

      font-size: 0.6rem;
      color: deepskyblue;
    }
  }

  .createuser {

    display: flex;
    justify-content: center;
    align-items: center;

    .input {
      margin-right: 10px;
    }

    .create {
      margin-right: 10px;
    }
  }

</style>
