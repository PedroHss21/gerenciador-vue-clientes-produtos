import Vue from 'vue';
import Router from 'vue-router';
import LoginUser from '@/views/LoginUser.vue';
import HomePage from '@/views/HomePage.vue';
import ClientTable from '@/components/clients/ClientTable.vue';
import ClientManager from '@/views/ClientManager.vue';
import ProductTable from '@/components/products/ProductTable.vue';
import NotFoundComponents from '@/views/NotFoundComponents.vue';


Vue.use(Router);

// Verifica se o usuário está logado
function isLoggedIn() {
    return !!localStorage.getItem('userToken');
}

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'homePage',
            component: HomePage,
            meta: { requiresAuth: true } // Rota protegida
        },
        {
            path: '/login',
            name: 'loginUser',
            component: LoginUser
        },
        {
            path: '/clientes',
            name: 'Clientes',
            component: ClientTable,
            meta: { requiresAuth: true } // Rota protegida
        },
        {
            path: '/gerenciar-clientes',
            name: 'clientManager',
            component: ClientManager,
            meta: { requiresAuth: true } // Rota protegida
        },
        {
            path: '/produtos',
            name: 'Produtos',
            component: ProductTable,
            meta: { requiresAuth: true } // Rota protegida
        },
        {
            path: '/404',
            alias: '*',
            name: 'NotFound',
            component: NotFoundComponents
        }
    ]
});

// Guard global para verificar a autenticação antes de cada navegação de rota (Navegation Guard)
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn()) {
        next({ name: 'loginUser' });
    } else {
        next();
    }
});

export default router;
