<template>
  <div class="container">
    <swiper-modalV1></swiper-modalV1>

    <swiper-modalV2 v-if="isOpenModal"></swiper-modalV2>
    <!-- <swiper-zoom></swiper-zoom> -->
  </div>
</template>

<script>
import SwiperModalV1 from "./V1/swiperModal";
import SwiperModalV2 from "./V2/swiperModal";

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