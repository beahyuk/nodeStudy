<template>
<div class="wrapper">
   <swiper class="swiper" :options="swiperOption">
    <!-- <swiper-slide class="swiper-slide" v-for="item of swiperList" :key="item.id">
      <img :src = "require('../../'+ item.imgUrl)" class="swiper-img" alt="">
    </swiper-slide> -->
    <swiper-slide>
      <img src = "../../assets/originPDF/L1.jpg" class="swiper-img" alt="">
      <img src = "../../assets/scanPDF/R1.jpg" class="swiper-img" alt="">

    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</div>
</template>

<script>
  import {Swiper,SwiperSlide,directive} from 'vue-awesome-swiper';
 import 'swiper/css/swiper.css'

  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
 
          slidesPerView: 1,
          spaceBetween: 30,
          slidesPerGroup: 1,
          // direction:'vertical',
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        oriImgUrl:[
          "assets/originPDF/L1.jpg",
          "assets/originPDF/L2.jpg",
          // "assets/originPDF/L3.jpg",
          // "assets/originPDF/L4.jpg",
          // "assets/originPDF/L5.jpg",
          // "assets/originPDF/L6.jpg",
          // "assets/originPDF/L7.jpg",
        ],
        scanImgUrl:[
          "assets/scanPDF/R1.jpg",
          "assets/scanPDF/R2.jpg",
          // "assets/scanPDF/R3.jpg",
          // "assets/scanPDF/R4.jpg",
          // "assets/scanPDF/R5.jpg",
          // "assets/scanPDF/R6.jpg",
          // "assets/scanPDF/R7.jpg",
        ],
        swiperList:[]
        //  swiperList:[
        //    {id:1,imgUrl:require("../../assets/originPDF/L1.jpg",)},
        //    {id:2,imgUrl:require( "../../assets/scanPDF/R1.jpg",)},
        //    {id:3,imgUrl:require("../../assets/originPDF/L2.jpg",)},
        //    {id:4,imgUrl:require( "../../assets/scanPDF/R2.jpg",)},
        //  ]
     
      }
    },
    methods:{
      getSwiperList(){
        let oriImgUrl = this.oriImgUrl, 
            scanImgUrl = this.scanImgUrl,
            swiperList = [],
            id = 1,
            imgUrl = "";
        while(oriImgUrl.length && scanImgUrl.length){
            let url1 = oriImgUrl.shift();
            let url2 = scanImgUrl.shift();
            swiperList.push({"id":id++,"imgUrl":url1});
            swiperList.push({"id":id++,"imgUrl":url2});
        }
        this.swiperList = swiperList;
        console.log(this.swiperList);
      }
    },
    created(){
      this.getSwiperList()
    }
  }
</script>

<style scoped>
.wrapper{
  background-color: rgba(250, 182, 182, 0.5);
  width: 80%;
  margin: 100px 200px;
  height: 50%;
}
.swiper{
  height: 100%;
  width: 100%;
}
.swiper .swiper-slide{
    display: flex;
    justify-content: center;
    align-items: center;
    /* text-align: center; */
    font-weight: bold;
    /* font-size: 24; */
    background-color: rgb(245, 214, 173);
}
</style>