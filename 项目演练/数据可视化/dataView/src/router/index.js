import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Draw from '../views/draw/test.vue'
import Echarts from '../views/gannt/gannt'
import Jstest from '../views/jstest/tevari.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/draw',
        name: 'Draw',
        component: Draw
    },
    {
        path: '/echarts',
        name: 'Echarts',
        component: Echarts
    },
    {
        path: '/js',
        name: 'js变量',
        component: Jstest
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router