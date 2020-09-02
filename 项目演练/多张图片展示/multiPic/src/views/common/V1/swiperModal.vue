<template>
  <div>
    <el-button type="success"  icon="el-icon-view" @click="dialogVisible = true">所有页对比结果V1</el-button>  
    <el-dialog
      :visible.sync="dialogVisible"
      title="所有页对比结果"
      width="80%">
       <base-swiper></base-swiper>
    </el-dialog>
  </div>
</template>

<script>
import baseSwiper from './baseThumberSwiper'
  export default {
    components:{
      baseSwiper
    },
     data() {
      return {
        dialogVisible: false,
      };
    },
  }
</script>

<style  scoped>

</style>