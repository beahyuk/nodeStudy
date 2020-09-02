<template>
  <div>
    <el-button type="primary" icon="el-icon-view" @click="showImg">所有页对比结果V2</el-button>
    <div class="imgMask" v-if="showBigImg" >
      <div class="close" @click="close" >X</div>
      <!-- 内容 -->
      <baseSwiper></baseSwiper>
    </div>
  </div>
</template>

<script>
import baseSwiper from "./baseThumberSwiper";
export default {
  data() {
    return {
      showBigImg: false,
    };
  },
  components: {
    baseSwiper,
  },
  mounted(){
    // 添加键盘Esc事件
    this.$nextTick(()=>{
      document.addEventListener('keyup',(e)=>{
        if(e.keyCode == 27){
          this.close()
        }
      })
    })
  },
  methods: {
    showImg() {
      this.showBigImg = true;
    },
    close(){
      this.showBigImg = false;
    },
  },

};
</script>

<style  scoped>
.imgMask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
}
.close{
  float: right;
  color: #e9e9e9;
  font-size: 50px;
}
.close:hover{
  background: #b11f1f87;
}
.swiper{
  width: 100%;
  height: 100%;
}
.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
}
.imgBox {
  width: 500px;
  height: 500px;
}
.imgBox img {
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>