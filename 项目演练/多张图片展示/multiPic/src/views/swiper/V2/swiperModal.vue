<template>
  <div>
    <el-button type="primary" icon="el-icon-view" @click="showImg">所有页对比结果V2</el-button>
    <div class="imgMask" v-if="isOpenMask" >
      <div class="closeIcon" @click="closeMask" >x</div>
      <baseSwiper  class="modalBox"></baseSwiper>
    </div>
  </div>
</template>

<script>
import baseSwiper from "./baseThumberSwiper";
export default {
  data() {
    return {
      isOpenMask: false,
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
          this.closeMask()
        }
      })
    })
  },
  methods: {
    showImg() {
      this.isOpenMask = true;
    },
    closeMask(){
      this.isOpenMask = false;
    },
  },

};
</script>

<style  scoped>
.imgMask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2020;
  background: rgba(0, 0, 0, 0.6);
}
.closeIcon{
  float: right;
  color: #fff;
  width: 40px;
  height: 40px;
  font-size: 32px;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin-right: 20px;
}
.closeIcon:hover{
  border-radius: 50%;
  color: #fff;
  box-shadow: 0 1px 3px rgba(209, 40, 42, 0.5);
  background: #d1282a;
  transition: all 0.2s ease-out;
  opacity: 0.8;
}
.modalBox{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
}
</style>