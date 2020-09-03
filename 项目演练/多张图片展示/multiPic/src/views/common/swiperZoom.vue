<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>
      <div class="textContainer">
        <span class="pageContainer">原稿1</span>
        <span class="pageContainer">扫描稿1</span>
      </div>
      <div class="swiper-zoom-container">
        <img src="../../assets/originPDF/L1.jpg" />
        <img src="../../assets/originPDF/L7.jpg" />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img src="../../assets/originPDF/L2.jpg" />
        <img src="../../assets/originPDF/L5.jpg" />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img src="../../assets/originPDF/L3.jpg" />
        <img src="../../assets/originPDF/L3.jpg" />
      </div>
    </swiper-slide>
    <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  // name: 'swiper-example-zoom',
  // title: 'Zoom',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        // zoom: true,
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        zoom:{
          el:".swiper-zoom-target",
          zoom:true,
          maxRatio:2
        }
      },
    };
  },
};
</script>

<style scoped>
.swiper {
  height: 500px;
}
.swiper-slide {
  background: #444;
}
.swiper-zoom-container{
  height: 500px;
  display: flex;
  justify-content: space-around;
}
.swiper-zoom-container img{
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
}
.textContainer{
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
.pageContainer{
  color: #fff;
  background-color: red;
}
</style>