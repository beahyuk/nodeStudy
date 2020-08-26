import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios';
import store from './vuex/store';
import md5 from 'js-md5';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
