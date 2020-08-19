<template>
  <div class="page">
    <section class="tool-bar">
      <a-button type="primary" @click="showModal">设置</a-button>
    </section>
    <ul class="dashboard">
      <li>
        <div class="label">升级白名单:</div>
        <div class="content">
          <div v-for="ip in whiteList" :key="ip">
            {{ip}}
          </div>
        </div>
      </li>
    </ul>
    <modal-temp ref="modal" :visible="visible" @handleCancel="handleCancel" @submit="initData"></modal-temp>
  </div>
</template>

<script>
import modalTemp from "./modalModel";

export default {
  components: { modalTemp },
  data() {
    return {
      visible: false,
      whiteList:["0.0.0.0","255.255.255.255","172.25.25.25","172.25.25.3-127.25.3.1"]
    };
  },
  mounted:{
    getIp(){
      for(let ip in this.whiteList){
        return ip
      }
    }
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
<style >
.page{
  margin: 20px;
}
.tool-bar {
  padding-bottom: 20px;
}
.dashboard{
  width: 500px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  box-shadow: 0 0 5px #999;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
li{
    margin: 20px 0;
    display: flex;
}
.label {
      font-size: 14px;
      font-weight: 700;
      width: 150px;
      text-align: right;
}
.content div {
  margin-left: 10px;
  font-weight: bold;
}
</style>>