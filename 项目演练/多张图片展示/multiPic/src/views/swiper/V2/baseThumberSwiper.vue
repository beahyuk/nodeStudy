<template>
  <div class="swiperContainer">
    <div class="colorTip">
      <span>删除</span> 
      <span>新增</span> 
      <span>修改</span> 
    </div>
    <!-- 大图比对 -->
    <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
      <swiper-slide  v-for="(item,index) of swiperList" :key="index">
          <div class="pageBox">
            <span>原稿 - 第{{item.id}}页</span>
            <span>扫描稿 - 第{{item.id}}页</span>
          </div>
          <div class="swiper-zoom-container " >
            <img :src="require('../../../'+item.oriImgUrl)" alt="">
            <img :src="require('../../../'+item.scanImgUrl)" alt="">
          </div>
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>	
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
    <!-- 缩略图-->
    <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
      <swiper-slide  v-for="(item) of swiperList" :key="item.oriImgUrl" >
         <div class="swiper-thumber-imgBox">
          <img :src="require('../../../'+item.oriImgUrl)" alt="">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOptionTop: {
        mousewheel: true,
        keyboard : true, 
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: 'fraction'
        },
        zoom:{
          el:".swiper-zoom-target",
          zoom:true,
          maxRatio:1.9
        }
      },
      swiperOptionThumbs: {
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
      oriImgUrl: [
        "assets/originPDF/L1.png",
        "assets/originPDF/L2.png",
      ],
      scanImgUrl: [
        "assets/scanPDF/R1.png",
        "assets/scanPDF/R2.png",
      ],
      swiperList: [],
    };
  },
  created(){
    this.getSwiperList();
  },
  methods:{
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
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },
};
</script>

<style scoped>
.swiperContainer {
  height: 90%;
}
.swiper-slide {
  background-size: cover;
  background-position: center;
}
.swiper-pagination{
  color: white;
}
.gallery-top {
  height: 80%;
  width: 100%;
}
.gallery-thumbs {
  height: 20%;
  margin-top: 10px;
}
.gallery-thumbs .swiper-slide {
  width: 10%;
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
.gallery-thumbs .swiper-slide-active .swiper-thumber-imgBox img{
  opacity: 1;
  border: 2px solid #3d3dfb;
}
.pageBox{
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
.pageBox span{
  color: #fff;
}
.swiper-thumber-imgBox {
  height: 80%;
}
.swiper-thumber-imgBox img {
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
}
.swiper-zoom-container{
  height:100%;
  display: flex;
  justify-content: space-around;
}
.swiper-zoom-container img {
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
}
.colorTip{
  display: flex;
  float:right;
  margin: 0 40px 20px 20px;
}
.colorTip span{
  padding:0 4px;
  color: white;
}
.colorTip span:first-child{
  border-left: 30px solid red;
}
.colorTip span:nth-child(2){
  border-left: 30px solid yellow;
}
.colorTip span:last-child{
  border-left: 30px solid #00ff00;
}
</style>