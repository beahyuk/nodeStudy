import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register'
import Home from '../views/Home'
import Password from '../views/Password.vue'
import ConfirmPwd from '../views/ConfirmPwd.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/password',
        name: 'Password',
        component: Password
    },
    {
        path: '/infrom',
        name: 'ConfirmPwd',
        component: ConfirmPwd
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router