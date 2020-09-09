import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Draw from '../views/draw/DrawMap.vue'

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

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router