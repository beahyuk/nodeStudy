<template>
  <div>
    <a-button type="primary" @click="showModal">设置</a-button>
    <modal-temp ref="modal" :visible="visible" @handleCancel="handleCancel" @submit="initData"></modal-temp>
  </div>
</template>

<script>
import modalTemp from "./modal";

export default {
  components: { modalTemp },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
     initData() {
      console.log("初始化数据");
    },
  },
  created() {
    this.initData();
  },
};
</script>