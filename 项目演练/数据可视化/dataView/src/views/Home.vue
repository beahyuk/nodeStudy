<template>
  <dv-full-screen-container > 
    <dv-border-box-1>
        <dv-loading>Loading...</dv-loading>
      </dv-border-box-1>
      <!-- <dv-charts :option="option" /> -->
  </dv-full-screen-container>
</template>

<script>
export default {
  data(){
    return{
      option:{
           title: {
    text: '剩余油量表',
    style: {
      fill: '#fff'
    }
  },
  series: [
    {
      type: 'gauge',
      data: [ { name: 'itemA', value: 55 } ],
      center: ['50%', '55%'],
      axisLabel: {
        formatter: '{value}%',
        style: {
          fill: '#fff'
        }
      },
      axisTick: {
        style: {
          stroke: '#fff'
        }
      },
      animationCurve: 'easeInOutBack'
    }
  ]
      }
    }
  }
 
}
</script>

<style>
body{
  margin: 0px;
}
</style>