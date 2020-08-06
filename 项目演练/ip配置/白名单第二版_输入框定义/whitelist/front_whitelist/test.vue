<template>
  <!-- <a-table :columns="columns" :data-source="data"   :pagination="false">
    <span slot-scope="time" slot="time">
      <span >{{time.day}}</span>日
      <span >{{time.hour}}</span>时
      <span >{{time.min}}</span>分
    </span>
  </a-table> -->
  <a-card style="width: 300px">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard contentCard content</p>
  </a-card>
</template>
<script>
const columns = [
  {
    dataIndex: 'time',
    key: 'time',
    title: '更新时间',
    slot :"time",
    scopedSlots:{customRender:'time'}
  },
  {
    title: '驱动升级方式',
    dataIndex: 'method',
    key: 'method',
  }
  ,
  {
    title: '升级白名单',
    dataIndex: 'whiteList',
    key: 'whiteList',
  }
];
const data = [
  {
    time:{
      day:0,
      hour:0,
      min:10
    },
    method:1,
    whiteList:"0.0.0.0-255.255.255.255"
  }
]

export default {
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>
