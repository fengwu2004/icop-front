<template>
  <div class="main">
    <div @click="click">角色管理</div>
  </div>
</template>

<script>
export default {

  methods:{
    click() {
      this.$router.push({ name: 'createuser' })
    }
  }
}
</script>

<style scoped>
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 500px;
  }
</style>
