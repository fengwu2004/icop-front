<template>
  <div class="rightmenu">
    <span>1 填写基本信息</span>
    <span class="line"></span>
    <span>2 填写通知内容</span>
  </div>
</template>

<script>
export default {

  data() {

    return {

      active:0
    }
  },
  methods:{
    search() {

    },
    create() {


    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .rightmenu {

    position: absolute;
    width: 100%;
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

</style>
