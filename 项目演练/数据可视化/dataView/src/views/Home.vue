<template>
  <dv-full-screen-container > 
    <div class="main-header">大数据分析</div>
    <dv-border-box-1 class="main-container">
      <!-- <div class="left-main-container">
          <process></process>
      </div> -->
      <div class="center-main-container">
        <!-- <polar-chart></polar-chart> -->
      </div>
      
    </dv-border-box-1>
   
  </dv-full-screen-container>
</template>

<script>
import Process from './process/process'
import PolarChart from './gannt/gannt'
export default {
  components:{
    Process,
    PolarChart
  },
  data(){
    return{
      config:{
        value: 66
      } 
    }
  }
 
}
</script>

<style>
body{
  margin: 0px;
}
.left-main-container{
  width: 78%;
  /* height: 50%; */
  padding-left: 20px;
  box-sizing: border-box;
}
</style>