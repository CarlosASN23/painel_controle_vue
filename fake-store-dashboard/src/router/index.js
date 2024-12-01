import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import ProductList from '../views/ProductList.vue';
import ProductDetails from '../views/ProductDetails.vue';
import ProductForm from '../views/ProductForm.vue';
import CartList from '../views/CartList.vue';
import CartDetails from '../views/CartDetails.vue';
import CartForm from '../views/CartForm.vue';
import UserList from '../views/UserList.vue';
import UserDetails from '../views/UserDetails.vue';
import UserForm from '../views/UserForm.vue';
import DashboardView from '../views/Dashboard.vue';
import LoginView from '../views/Login.vue';
import CategoryList from '../views/CategoryList.vue';

const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: { requiresAuth: true }
    },
    {
        path: '/products',
        name: 'Products',
        component: ProductList,
        meta: { requiresAuth: true }
    },
    {
        path: '/products/:id',
        name: 'ProductDetails',
        component: ProductDetails,
        meta: { requiresAuth: true }
    },
    {
        path: '/add-product',
        name: 'AddProduct',
        component: ProductForm,
        meta: { requiresAuth: true }
    },
    {
        path: '/edit-product/:id',
        name: 'EditProduct',
        component: ProductForm,
        meta: { requiresAuth: true }
    },
    {
        path: '/carts',
        name: 'Carts',
        component: CartList,
        meta: { requiresAuth: true }
    },
    {
        path: '/carts/:id',
        name: 'CartDetails',
        component: CartDetails,
        meta: { requiresAuth: true }
    },
    {
        path: '/add-cart',
        name: 'AddCart',
        component: CartForm,
        meta: { requiresAuth: true }
    },
    {
        path: '/edit-cart/:id',
        name: 'EditCart',
        component: CartForm,
        meta: { requiresAuth: true }
    },
    {
        path: '/users',
        name: 'Users',
        component: UserList,
        meta: { requiresAuth: true }
    },
    {
        path: '/users/:id',
        name: 'UserDetails',
        component: UserDetails,
        meta: { requiresAuth: true }
    },
    {
        path: '/add-user',
        name: 'AddUser',
        component: UserForm,
        meta: { requiresAuth: true }
    },
    {
        path: '/edit-user/:id',
        name: 'EditUser',
        component: UserForm,
        meta: { requiresAuth: true }
    },
    {
        path: '/categories',
        name: 'Categories',
        component: CategoryList,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/',
        redirect: '/dashboard'
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.isAuthenticated) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
