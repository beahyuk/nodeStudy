import Vue from 'vue'
import Router from 'vue-router'
import Swiper from '@/views/swiper/index.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
     {
      path: '/',
      name: '轮播图',
      component: Swiper
    }
  ]
})


export default router;