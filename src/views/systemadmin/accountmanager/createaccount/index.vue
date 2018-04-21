<template>
  <div class="createaccountframe">
    <div class="createaccount">
      <div class="left">
        <div>
          <li>人员编号</li>
          <div class="specialinput">
            <input/><el-button type="primary" plain size="mini">请选择</el-button>
          </div>
        </div>
        <div style="margin-top: 2rem">
          <li>姓名</li>
          <el-input style="margin-top: 0.5rem"></el-input>
        </div>
        <div style="margin-top: 2rem">
          <li>账户</li>
          <el-input style="margin-top: 0.5rem"></el-input>
          <div style="margin-top: 10px">
            <span style="font-size: 0.8rem;color: #445577;">注:不能重名,登录时需同时输入@部分</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div>
          <span>联系电话</span>
          <el-input style="margin-top: 0.5rem"></el-input>
        </div>
        <div style="margin-top: 2rem">
          <span>性别</span>
          <div style="margin-top: 0.5rem">
            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
          </div>
        </div>
        <div style="margin-top: 3rem">
          <li>密码</li>
          <el-input type="password" style="margin-top: 0.5rem"></el-input>
          <div style="margin-top: 10px">
            <span style="font-size: 0.8rem;color: #445577;">注:初始密码为6个8</span>
          </div>
        </div>
      </div>
    </div>
    <div class="settings">
      <el-button>取消</el-button>
      <el-button type="primary">保存</el-button>
      <el-button type="success" @click="setpermission">继续分配角色</el-button>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },

    methods:{
      setpermission() {

        this.$router.push({name:'permissionsetting'})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .left, .right {

    width: 300px;
  }

  .createaccount {

    display: flex;
    justify-content: space-around;
  }

  .specialinput {

    margin-top: 0.5rem;
    border-radius: 2px;
    width: 300px;
    border: 1px solid #d0d5e5;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {

      width: 200px;
      border: none;
      outline: none;
      padding-left: 1rem;
    }

    .el-button {

      margin-right: 0.5rem;
    }
  }

  .baseinfo {

    .nameinput {

      width: 300px;
    }
  }

  .createuser {

    display: flex;
    justify-content: space-around;
  }

  .settings {

    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }


</style>
