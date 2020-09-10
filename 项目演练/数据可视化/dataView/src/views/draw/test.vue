<template>
  <div>
    <canvas id="canvas" width="500" height="500" style="margin:10px" ref="canvas"></canvas>
    <!-- <el-progress :percentage="percentage"></el-progress> -->
    <!-- <div id="time" ref="time">时间:{{showTime}}</div> -->
  </div>
</template>

<script>
export default {
  mounted() {
    this.getMap();
  },
  data() {
    return {
      arr: [
        { id: 1, x: 20, y: 21, time: 1 },
        { id: 1, x: 25, y: 31, time: 2 },
        { id: 1, x: 18, y: 15, time: 3 },
        { id: 1, x: 22, y: 75, time: 4 },
      ],

      showTime:0,
      percentage:0,
     
    };
  },
  methods: {
    getMap() {
      let  dataArr = this.arr;
      let canvas = this.$refs.canvas;
      let grid_cols = 30; //x总数
      let grid_rows = 16; //y总数
      let cell_height = canvas.height / grid_rows;
      let cell_width = canvas.width / grid_cols;
      let cell_pix = cell_height;
      let ctx = canvas.getContext("2d");
      let x=0;
      let y=0;
      let time = 0;

      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.strokeRect(0, 0, 500, 500);

      // this.drawCircle(x,y,12,ctx);

      for(let i=1;i< dataArr.length;i++){
        ctx.beginPath();
        ctx.moveTo(dataArr[i-1].x,dataArr[i-1].y);
        ctx.lineTo(dataArr[i].x,dataArr[i].y);
        ctx.strokeStyle = "red";
        ctx.stroke();
      }
    },
    drawCircle(x,y,radius,ctx){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(x,y,radius,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    
  },
};
</script>

<style lang="scss" scoped>
</style>