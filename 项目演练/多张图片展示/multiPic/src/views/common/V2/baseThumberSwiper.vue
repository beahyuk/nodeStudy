<template>
  <div class="thumb-example">
    <div class="colorWrap">
      <span>删除</span> 
      <span>改动</span> 
      <span>新增</span> 
    </div>
    <!-- swiper1 -->
    <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
      <swiper-slide class="swiperImg" v-for="(item,index) of swiperList" :key="index">
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
    <!-- swiper2 Thumbs 缩略图-->
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
        // loop: true,
        // loopedSlides: 2, // looped slides should be the same
        // spaceBetween: 10,
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
        // loop: true,
        // loopedSlides: 2, // looped slides should be the same
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
        // mousewheel: true,
      },
      oriImgUrl: [
        "assets/originPDF/L1.jpg",
        "assets/originPDF/L2.jpg",
        "assets/originPDF/L3.jpg",
        "assets/originPDF/L4.jpg",
        "assets/originPDF/L5.jpg",
        "assets/originPDF/L6.jpg",
        "assets/originPDF/L7.jpg",
      ],
      scanImgUrl: [
        "assets/scanPDF/R1.jpg",
        "assets/scanPDF/R2.jpg",
        "assets/scanPDF/R3.jpg",
        "assets/scanPDF/R4.jpg",
        "assets/scanPDF/R5.jpg",
        "assets/scanPDF/R6.jpg",
        "assets/scanPDF/R7.jpg",
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
.thumb-example {
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
.colorWrap{
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
}
.colorWrap span{
  padding:0 4px;
  color: white;
}
.colorWrap span:first-child{
  border-left: 30px solid #ffc0cb;
}
.colorWrap span:nth-child(2){
  border-left: 30px solid #00ff00;
}
.colorWrap span:last-child{
  border-left: 30px solid #ffff00;
}
</style>