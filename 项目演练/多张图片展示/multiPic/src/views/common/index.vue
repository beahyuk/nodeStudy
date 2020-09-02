<template>
  <div class="container">
    <!-- <swiper-modalV1></swiper-modalV1> -->
    <!-- <swiper-modalV2></swiper-modalV2> -->
    <swiper-test></swiper-test>
  </div>
</template>

<script>
import SwiperModalV1 from "./V1/swiperModal";
import SwiperModalV2 from "./V2/swiperModal";
import swiperTest from './swiperTest'

export default {
  data() {
    return {
      isOpenModal: true,
    };
  },
  methods: {
    openModal() {
      this.isOpenModal = false;
    },
    closeModal() {
      this.isOpenModal = true;
    },
  },
  components: {
    SwiperModalV1,
    SwiperModalV2,
    swiperTest
  },
};
</script>

<style scoped>
.container {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-evenly;
  height: 500px;
}

</style>