import { createRouter, createWebHistory } from 'vue-router';
import Products from '../views/Products.vue';
import Carts from '../views/Carts.vue';
import Users from '../views/Users.vue';
import Login from '../views/Login.vue';

const routes = [
    {
        path: '/products',
        name: 'Products',
        component: Products,
    },
    {
        path: '/carts',
        name: 'Carts',
        component: Carts,
    },
    {
        path: '/users',
        name: 'Users',
        component: Users,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/',
        redirect: '/products',
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
