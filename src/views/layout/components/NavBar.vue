<template>
    <div class="navibarmain">
      <bread-crumb class="breadcrumb"></bread-crumb>
      <el-button v-if="createmessage" @click="createNewMessage" type="primary"><i class="el-icon-plus el-icon--left"></i>新增</el-button>
      <div v-if="createmessageprocess" class="createmessageprocess">
        <span>1 填写基本信息</span>
        <span class="line"></span>
        <span>2 填写通知内容</span>
      </div>
      <div v-if="createuser" class="createuser">
        <el-input class="input" placeholder="请输入角色名称查询"></el-input>
        <el-button class="search" @click="search">查询</el-button>
        <el-button class="create" @click="create">创建</el-button>
      </div>
    </div>
</template>

<script>

  import BreadCrumb from '@/components/Breadcrumb'

  export default {

    components: { BreadCrumb },

    methods:{

      createNewMessage() {

        this.$emit('createNewMessage')
      },
    },

    data() {

      return {

        createmessage:true,
        createmessageprocess:false,
        createuser:false
      }
    },
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
