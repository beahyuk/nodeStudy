<template>
  <div class="swiperContainer">
    <div class="colorTip">
      <span>删除</span>
      <span>新增</span>
      <span>修改</span>
    </div>
    <div class="contentBox">
      <div class="swiper-content">
        <swiper :options="swiperOptionsThumbs" class="swiper gallery-thumbs" ref="swiperThumbs">
          <swiper-slide v-for="(item) of swiperList" :key="item.oriImgUrl">
            <div class="labelBox">{{item.id}}</div>
            <div class="swiper-thumber-imgBox">
              <img :src="require('../../../'+item.oriImgUrl)" alt />
            </div>
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
        <swiper :options="swiperOption" class="swiper gallery-top" ref="mySwiper">
          <swiper-slide v-for="(item,index) of swiperList" :key="index" >
            <div class="pageBox">
              <span>原稿 - 第{{item.id}}页</span>
              <span>扫描稿 - 第{{item.id}}页</span>
            </div>
            <div class="swiper-zoom-container-imgBox">
              <img :src="require('../../../'+item.oriImgUrl)" alt />
              <img :src="require('../../../'+item.scanImgUrl)" alt />
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="funcBtn">
        <el-button @click="prev">上一页</el-button>
        <el-button @click="next">下一页</el-button>
      </div>
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
        zoom: {
          el: ".swiper-zoom-target",
          zoom: true,
          maxRatio: 1.5,
        },
        keyboard: {
          enabled: true,
          pageUpDown: true,
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
      },
      swiperOptionsThumbs: {
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
    },
  },
};
</script>

<style  scoped>
.swiperContainer {
  height: 100%;
}
.contentBox {
  display: flex;
}
.swiper-content {
  margin: 0 auto;
  height: 100%;
  width: 100%;
  display: flex;
  padding: 20px;
  padding-right:0 ;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border: 3px solid #a888c6;
  outline: 2px solid #c5c7cb;
  outline-offset: -5px;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}
.gallery-top {
  height: 730px;
  width: 90%;
}

.gallery-thumbs {
  height: 700px;
  width: 10%;
  border: 2px solid #c5c7cb;
  margin-top: 30px;
}
.gallery-thumbs .swiper-slide {
  width: 80%;
  height: 25% !important ;
  padding-right: 5px;
  box-sizing: border-box;
}

.gallery-thumbs .swiper-slide-active .swiper-thumber-imgBox img {
  border: 3px solid #3d3dfb;
  box-sizing: border-box;
}
.labelBox {
  display: inline-block;
  position: relative;
  top: -40%;
}
.swiper-thumber-imgBox {
  height: 100%;
  width: 80%;
  display: inline-block;
}

.swiper-thumber-imgBox img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.swiper-zoom-container-imgBox {
  height: 700px;
  display: flex;
  justify-content: space-around;
}
.swiper-zoom-container-imgBox img {
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
}
.pageBox {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.pageBox span {
  color: #000;
}
.colorTip {
  display: flex;
  margin-bottom: 10px;
}
.colorTip span {
  padding: 0 4px;
}
.colorTip span:first-child {
  border-left: 30px solid red;
}
.colorTip span:nth-child(2) {
  border-left: 30px solid yellow;
}
.colorTip span:last-child {
  border-left: 30px solid #00ff00;
}
.funcBtn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-left: 5px;
}


</style>