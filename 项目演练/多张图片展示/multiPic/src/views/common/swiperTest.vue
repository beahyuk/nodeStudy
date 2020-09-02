<template>
  <div id="look-image">
    <!-- 图片展示区 -->
    <div class="look-image-content">
       <div class="show-image" ref="testDivDom">
          <img src="../../assets/originPDF/L2.jpg" 
              alt=""
              ref="img"
              :style="styleObj"
              @mousedown="start"
              @mouseup="end"
              @mousemove="move"
              >
      </div>
    </div>
   
    <!-- 底部按钮操作 -->
    <div class="look-image-footer">
      <el-button @click="magnify">放大</el-button>
      <el-button @click="shrink">缩写</el-button>
    </div>
  </div>
</template>

<script>
let clickTimer = null;

export default {

  data(){
    return{
      multiples:1, // 放大或者缩小
      deg:0,       // 旋转的角度
      styleObj:null,//拖拽时修改图片的样式
      isDrag:false,//是否开始拖拽
      startX: 0, //鼠标的点击X轴
      startY: 0, //鼠标的点击Y轴
      moveX:0, //鼠标移动的X轴
      moveY:0, //鼠标移动的Y轴
      endX:0,
      endY:0,
    }
  },
  methods:{
    getLarge(e){
      console.log("111");
      console.log(e);
      console.log(e.target);
      console.log(e.target.width);
      console.log(e.target.height);
      // let event = window.event || e;
      // let img = event.target || event.srcElement;
      let img = e.target || e.srcElement;
      let imgWidth = img.width;
      let imgHeight = img.height;
    },
    magnify(){
      if(this.multiples >= 10){
        return 
      }
      this.multiples += 0.25;
      this.styleObj = `transform:scale(${this.multiples}) rotateZ(${this.deg}deg);left:${this.endX}px;top:${this.endY}px`;
    },
    shrink(){
      if(this.multiples <= 0){
        return
      }
      this.multiples -=0.25;
      this.styleObj = `transform:scale(${this.multiples}) rotateZ(${this.deg}deg);left:${this.endX}px;top:${this.endY}px`;
    },
    start(e){
      // 当点击图片时,开始拖拽
      console.log(e);
      if(e.buttons){
        this.isDrag = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.styleObj = `transform:scale(${this.multiples}) rotateZ(${this.deg}deg);left:${this.endX}px;top:${this.endY}px`;
      }
    },
    end(){
      this.isDrag = false;
      this.styleObj = `transform:scale(${this.multiples}) rotateZ(${this.deg}deg);left:${this.endX}px;top:${this.endY}px`;
    },
    move(e){
      // 当鼠标拖拽图片的时候,才计算移动位置
      // 移动图片相对于父元素的位置
      if(this.isDrag){
        // 鼠标移动的距离
        this.moveX = e.clientX;
        this.moveY = e.clientY;
        // 相对页面的位置
        let x = this.moveX-this.startX;
        let y = this.moveY-this.startY;
        // let img = document.querySelector("#look-image img");
        let img = e.target;
        this.endX = img.offsetLeft+x;
        this.endY = img.offsetLeft+y;
        this.styleObj = `left:${this.endX}px;top:${this.endY}px`;
        this.styleObj = `transform:scale(${this.multiples}) rotateZ(${this.deg}deg);left:${this.endX}px;top:${this.endY}px`;
        // 记录上次移动的距离
        this.startX = this.moveX;
        this.startY = this.moveY;
      }
    },

  }
}
</script>

<style  scoped>
.imgBox{
  height: 500px;
  width: 600px;
  /* display: none; */
  position: relative;
  left: 100px;top: 100px;
  border:1px dashed black;
  overflow: hidden
}
.imgBox img{
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
}
#look-image{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 858px;
  height: 768px;
  background-color: #fefefe;
  border-radius: 10px;
  border: 1px solid #c5c5c5;
  overflow: hidden;
  z-index: 99;
}
#look-image .look-image-content{
  width: 100%;
  border-bottom: 1px solid #c5c5c5;
}
#look-image .look-image-content .show-image{
  margin: 44px 148px 74px;
  height: 539px;
  width: 562px;
  position: relative;
  overflow: hidden;
}
#look-image .look-image-content .show-image img{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>