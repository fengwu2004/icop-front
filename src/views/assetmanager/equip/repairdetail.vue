<template>
  <div class="equipdetailmain">
    <div class="navibar">
      <bread-crumb class="breadcrumb"></bread-crumb>
    </div>
    <div class="content">
      <div class="cell">
        <span class="title">资产名称</span>
        <span class="message">{{name}}</span>
      </div>
      <div class="cell">
        <span class="title">描述</span>
        <span class="message">{{description}}</span>
      </div>
      <div class="cell">
        <span class="title">资产分类</span>
        <span class="message">{{category}}</span>
      </div>
      <div class="imagecell">
        <span class="title">资产图片</span>
        <div>
          <img v-for="photo in photoUrls" v-bind:src="photo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { getRepairById } from '@/api/innermessage'
  import BreadCrumb from '@/components/Breadcrumb'
  import { trim } from "@/utils/validate";

  export default {
    components: { BreadCrumb },
    mounted() {

      this.repairId = this.$route.query.id

      let data = {repairId:this.repairId}

      getRepairById(data)
        .then(res=>{

          console.log(res)

          let {photoUrls, qrCode, name, description, category} = res

          this.photoUrls = photoUrls

          this.qrCode = qrCode

          this.name = name

          this.description = description

          this.category = category
        })
    },
    data() {
      return {
        repairId:null,
        photoUrls: [],
        qrCode: null,
        name: '',
        description: '',
        category: '',
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  $fontcolor:#16325C;

  * {
    color: $fontcolor;
  }

  .equipdetailmain {

    background: #FBFBFB;
  }

  .cell, .imagecell {

    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 4rem;
    border-bottom: 1px solid #C6CBD4;

    .title {

      padding-right: 4rem;
      text-align: right;
      width: 10rem;
      font-size: 16px;
      color: #333333;
    }

    .message {

      font-size: 16px;
      color: #C6CBD4;
    }
  }

  .imagecell {

    height: 10rem;
  }

  .navibar {

    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #D0D5E5;
  }

  .content {

    width: 90%;
    padding-left: 2rem;
    padding-right: 2rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .settings {

    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

</style>
