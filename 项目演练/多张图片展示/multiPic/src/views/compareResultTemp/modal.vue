<template>
  <div  class="swiperContainer">
    <div class="colorTip">
      <span>删除</span>
      <span>插入</span>
      <span>修改</span>
    </div>
    <!-- 大图比对 -->
    <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
      <swiper-slide class="swiperImg" v-for="(item,index) of swiperList" :key="index">
          <div class="pageBox">
            <span>原稿 - 第{{item.id}}页</span>
            <span>扫描稿 - 第{{item.id}}页</span>
          </div>
          <div class="swiper-zoom-container " >
            <img :src="item.oriImgUrl" alt="">
            <img :src="item.scanImgUrl" alt="">
          </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>	
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
    <!-- 缩略图 -->
    <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
      <swiper-slide  v-for="(item) of swiperList" :key="item.oriImgUrl" >
        <div class="swiper-thumber-imgBox">
          <img :src="item.oriImgUrl" alt="">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
  export default {
    props:{
      list:Array
    },
    created(){
      this.swiperList = this.list;
    },
    data(){
      return{
        swiperList:[],
        swiperOptionTop: {
          mousewheel: true,
          keyboard : true, 
          grabCursor :true,
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
            maxRatio:1.9, //放大比率
          }
        },
        swiperOptionThumbs: {
          centeredSlides: true,
          slidesPerView: "auto",
          touchRatio: 0.2,
          slideToClickedSlide: true,
        },
      }
    },
    components:{
      Swiper,
      SwiperSlide
    },
    mounted() {
      // 缩略图和大图互相控制
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.$swiper;
        const swiperThumbs = this.$refs.swiperThumbs.$swiper;
        swiperTop.controller.control = swiperThumbs;
        swiperThumbs.controller.control = swiperTop;
      });
   },
  }
</script>

<style  scoped>
.swiperContainer {
  height: 90%;
}
.swiperContainer .colorTip {
  display: flex;
  float: right;
  margin: 0 40px 20px 20px;
}
.swiperContainer .colorTip span {
  padding: 0 4px;
  color: white;
}
.swiperContainer .colorTip span:first-child {
  border-left: 30px solid #F38CA5;
}
.swiperContainer .colorTip span:nth-child(2) {
  border-left: 30px solid #FFF08C;
}
.swiperContainer .colorTip span:last-child {
  border-left: 30px solid #9EDAA5;
}

.swiper .swiper-slide {
  background-size: cover;
  background-position: center;
}
.swiper.gallery-top {
  height: 80%;
  width: 100%;
}
.swiper.gallery-thumbs {
  height: 20%;
  margin-top: 10px;
}
.swiper.gallery-thumbs .swiper-slide {
  width: 10%;
  height: 100%;
  opacity: 0.4;
}
.swiper.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
.swiper.gallery-thumbs .swiper-slide-active .swiper-thumber-imgBox img {
  opacity: 1;
  border: 2px solid #3d3dfb;
}
.swiper.gallery-thumbs .swiper-thumber-imgBox {
  height: 80%;
}
.swiper.gallery-thumbs .swiper-thumber-imgBox img {
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
}

.swiper-pagination {
  color: white;
}

.pageBox {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
.pageBox span {
  color: #fff;
}

.swiper-zoom-container {
  height: 100%;
  display: flex;
  justify-content: space-around;
}
.swiper-zoom-container img {
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
}
  

</style>