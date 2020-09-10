<template>
  <div>
    <canvas id="canvas" width="1800" height="960"
           style="border: 3px solid rgb(170, 170, 170);width:900px;height:480px">
    </canvas>
    <!-- <canvas id="canvas2" width="1800" height="960" style="border: 3px solid rgb(170, 170, 170);width:900px;height:480px"></canvas> -->
  </div>
</template>

<script>
// import {getMap1} from './draw'
export default {  
  mounted(){
    this.initCanvas();
    window.onresize=()=>{
      this.initCanvas()
    }
  },
  methods:{
      initCanvas() {
        console.log("初始化canvas")
        let canvas = document.getElementById('canvas');
        // let canvas = this.$refs.canvas;
        let ctx = canvas.getContext('2d');

        let grid_cols = 30;
        let grid_rows = 16;
        let cell_height = canvas.height / grid_rows;
        let cell_width = canvas.width / grid_cols;
        let cell_pix = cell_height;
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#a0a0a0";
        ctx.font = "36pt Arial";
        //结束边框描绘
        ctx.beginPath();
         ctx.fillStyle = "#d1cfd2"; //填充颜色
    ctx.fillRect(0 * cell_pix, 0 * cell_pix, 30 * cell_pix, 1 * cell_pix);
    ctx.fillRect(0 * cell_pix, 2 * cell_pix, 1 * cell_pix, 10 * cell_pix);
    ctx.fillRect(29 * cell_pix, 1 * cell_pix, 1 * cell_pix, 15 * cell_pix);
    ctx.fillRect(0 * cell_pix * cell_pix, 15 * cell_pix, 2 * cell_pix, 1 * cell_pix);
    ctx.fillRect(3 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(6 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(8 * cell_pix, 15 * cell_pix, 7 * cell_pix, 1 * cell_pix);
    ctx.fillRect(16 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(18 * cell_pix, 15 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(0 * cell_pix, 12 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(0 * cell_pix, 14 * cell_pix, 1 * cell_pix, 1 * cell_pix);
    ctx.fillRect(12 * cell_pix, 2 * cell_pix, 3 * cell_pix, 10 * cell_pix);
    ctx.fillRect(1 * cell_pix, 10 * cell_pix, 5 * cell_pix, 2 * cell_pix);
    ctx.fillRect(0 * cell_pix, 1 * cell_pix, 10 * cell_pix, 1 * cell_pix);
    }
  }
}
</script>

<style>

</style>