import Vue from "vue/dist/vue.js";
import App from "./strategy/index.vue"
import axios from "axios"
import VueAxios from "vue-axios"
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(VueAxios, axios);


new Vue({
    el: "#app",
    render: h => h(App)
})