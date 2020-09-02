
<template>
  <div>
    <div class="thumb-example">
      <swiper :options="swiperOptionsThumbs" class="swiper gallery-thumbs" ref="swiperThumbs">
        <swiper-slide v-for="(item) of swiperList" :key="item.oriImgUrl">
          <div class="imgBox1">
            <img :src="require('../../'+item.oriImgUrl)" alt />
          </div>
        </swiper-slide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
      <swiper :options="swiperOption" class="swiper gllary-top" ref="mySwiper">
        <swiper-slide v-for="(item,index) of swiperList" :key="index">
          <div class="imgBox">
            <img :src="require('../../'+item.oriImgUrl)" alt />
          </div>
          <div class="imgBox">
            <img :src="require('../../'+item.scanImgUrl)" alt />
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="funcBtn">
      <el-button @click="prev" type="info">上一页</el-button>
      <el-button @click="next" type="info">下一页</el-button>
    </div>
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
      swiperOption: {
        direction: "vertical",
        //  loop:true,
        //  loopedSlides:5,
        zoom: true, //可放大
        //  mousewheel: true,
        pagination: {
          el: ".swiper-pagination",
          // type: 'fraction'
          clickable: true,
          renderBullet(index, className) {
            return `<span class = "${className} swiper-pagination-bullet-custom"> ${
              index + 1
            }</span>`;
          },
        },
      },
      swiperOptionsThumbs: {
        // loop:true,
        // loopedSlides:3, //在loop模式下使用slidesPerview:'auto'，还需使用该参数设置所要用到的loop个数(一般设置大于可视slide个数2个即可)。
        direction: "vertical",
        spaceBetween: 10, //在slide之间设置距离（单位px）
        centeredSlides: true,
        slidesPerView: "auto", //设置slider容器能够同时显示的slides数量(carousel模式)。
        touchRatio: 0.2, //触摸比例。触摸距离与slide滑动距离的比率。
        slideToClickedSlide: true, //设置为true则点击slide会过渡到这个slide。
        grabCursor: false, //设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。
        scrollbar: {
          el: ".swiper-scrollbar",
          draggable: true,
        },
        mousewheel: true,
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
  created() {
    this.getSwiperList();
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.mySwiper.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },
  methods: {
    prev() {
      this.$refs.mySwiper.$swiper.slidePrev();
    },
    next() {
      this.$refs.mySwiper.$swiper.slideNext();
    },
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
      console.log(this.swiperList);
    },
  },
};
</script>

<style  scoped>
.thumb-example {
  margin: 0 auto;
  margin-top: 20px;
  height: 600px;
  width: 1000px;
  background-color: #ecccc0;
  display: flex;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}
.gllary-top {
  height: 100%;
  width: 80%;
  margin-top: 40px;
  margin-left: 30px;
}
.gallery-thumbs {
  height: 100%;
  width: 20%;
  box-sizing: border-box;
  padding-left: 10px;
}
.gallery-thumbs .swiper-slide {
  width: 25%;
  height: 250px !important ;
}

.gallery-thumbs .swiper-slide-active .imgBox1 {
  border: 2px solid #3d3dfb;
  box-sizing: border-box;
}
.imgBox1 {
  height: 200px;
  width: 142px;
  display: inline-block;
}
.imgBox1 img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.imgBox {
  height: 600px;
  width: 350px;
  display: inline-block;
}
.imgBox img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.funcBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
}
</style>