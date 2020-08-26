<template>
  <div >
    <div class="wrap" v-if = "isOpenModal">
     <el-button  type="success" round @click="openModal">查看对比图片</el-button>
    </div>
    <div v-else>
     <swiper></swiper>
     <el-button class="returnBtn" @click="closeModal" type="primary" round >返回按钮</el-button>
    </div>
  </div>
</template>

<script>
  import Swiper from './swiper'
  export default {
    data(){
      return{
        isOpenModal:true
      }
    },
    methods:{
      openModal(){
        this.isOpenModal = false;
      },
      closeModal(){
        this.isOpenModal = true;
      }
    },
    components:{
      Swiper
    }
  }
</script>

<style scoped>
.wrap{
  margin:400px 1000px;
}

.returnBtn{
  margin:0 0 0 1000px;
}
</style>