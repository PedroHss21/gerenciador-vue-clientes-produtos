import Vue from 'vue';
import Router from 'vue-router';
import LoginUser from '@/views/LoginUser.vue';
import HomePage from '@/views/HomePage.vue';
import ClientManager from '@/views/ClientManager.vue';
import ProductManager from '@/views/ProductManager.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'homePage',
            component: HomePage
        },
        {
            path: '/login',
            name: 'loginUser',
            component: LoginUser
        },
        {
            path: '/clients',
            name: 'clientManager',
            component: ClientManager
        },
        {
            path: '/products',
            name: 'productManager',
            component: ProductManager
        }
    ]
});
