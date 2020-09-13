<template>
<div class="left-container">
  <dv-border-box-12>
      <button @click="getValue">变换</button>
  <dv-percent-pond :config="config"  class="left-content"  style="width:200px;height:100px;" />
  <div class="right-label">{{config.value}}</div>
  </dv-border-box-12>

</div>  
</template>

<script>
  export default {
    watch:{
      value(newV,oldV){
        console.log(newV,oldV);
      }
    },
    data(){
  
      return{
        config:{
          value: 100,
          colors: ['#01c4f9', '#c135ff'],
          lineDash: [10, 2],
          formatter:'{value}'
        } ,
      
      }
    },
    methods:{
      waitValue(value){
        setTimeout(()=>{
          // 修改config参数，不可以直接修改
          this.config ={value:value,colors: ['#01c4f9', '#c135ff'],lineDash: [10, 2]};

        },100*value)
      },
      changeKey(){
        let valueArr = [10,20,30];
        for(let i=0;i<valueArr.length;i++ ){
          this.waitValue(valueArr[i])
        }
      },
      getValue(){
        this.changeKey();
      }
    },
  }
</script>

<style  scoped>
.left-container{
  display: flex;
  align-items: center;
}

.left-content text{
  display:none !important
}

</style>