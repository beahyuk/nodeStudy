<template>
  <div>
    <div class="imgMask"  v-if="isOpenMask" >
      <div class="closeIcon" @click="closeMask">x</div>
      <modal :list="swiperList" class="modalBox"></modal>
    </div>
  </div>
</template>

<script>
import modal from './modal'
  export default {
    components: {
      modal,
    },
    data(){
      return{
        isOpenMask:false,
        oriImgUrl:[],
        scanImgUrl:[],
        swiperList:[],
        compareFile:[],
      }
    },
    methods:{
      closeMask(){
        this.isOpenMask= false;  
      },
      // 获得图片对比结果
      getCompareResult(row){
        try{
          const compareResult = row.compareResult;
          this.compareFile = compareResult.files;
          this.getURL(this.compareFile);
          this.getSwiperList()
        } catch (error) {
        }
      },
      // 获得扫描稿数组和原稿数组
      getURL(arr){
        let patternScan = /http:\/\/(.*R\d+(.jpg))/; 
        let patternOrigin = /http:\/\/(.*L\d+(.jpg))/;
        let oriImgUrl = arr.filter(item=> patternOrigin.test(item)).sort((a,b)=>this.getSort(a,b,"L"));
        let scanImgUrl=arr.filter(item=>patternScan.test(item)).sort((a,b)=>this.getSort(a,b,"R"));
        this.oriImgUrl = oriImgUrl;
        this.scanImgUrl = scanImgUrl;
      },
      // 对图片名进行排序
      getSort(str1,str2,pos){
          let idx1 = str1.lastIndexOf(pos);
          let idx2 = str2.lastIndexOf(pos);
          let num1 = str1.slice(idx1+1,str1.length-4);
          let num2 = str2.slice(idx2+1,str2.length-4);
          return num1 - num2;
      },
      // 获得图片对比数组
      getSwiperList() {
        let oriImgUrl = this.oriImgUrl;
        let scanImgUrl = this.scanImgUrl;
        let swiperList = [];
        let id = 1;
        for (let i = 0; i < oriImgUrl.length; i++) {
          swiperList.push({
            id: id++,
            oriImgUrl: oriImgUrl[i],
            scanImgUrl: scanImgUrl[i],
          });
        }
        this.swiperList = swiperList;
      },
    },
    mounted(){
      // 添加键盘Esc退出事件
      this.$nextTick(()=>{
        document.addEventListener('keyup',(e)=>{
          if(e.keyCode == 27){
            this.closeMask()
          }
        })
      })
    }
  }
</script>

<style  scoped>
.imgMask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2020;
  background: rgba(0, 0, 0, 0.8);
}
.imgMask .closeIcon {
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
.imgMask .closeIcon:hover {
  border-radius: 50%;
  color: #fff;
  box-shadow: 0 1px 3px rgba(209, 40, 42, 0.5);
  background: #d1282a;
  transition: all 0.2s ease-out;
  opacity: 0.8;
}
.imgMask .modalBox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
}
</style>