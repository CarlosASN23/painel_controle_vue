import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        products: [],
        categories: [],
        carts: [],
        users: [],
        isAuthenticated: false,
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        },
        SET_CARTS(state, carts) {
            state.carts = carts;
        },
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_AUTH(state, status) {
            state.isAuthenticated = status;
        },
    },
    actions: {
        fetchProducts({ commit }) {
            axios.get('https://fakestoreapi.com/products')
                .then(response => {
                    commit('SET_PRODUCTS', response.data);
                });
        },
        fetchCategories({ commit }) {
            axios.get('https://fakestoreapi.com/products/categories')
                .then(response => {
                    commit('SET_CATEGORIES', response.data);
                });
        },
        fetchCarts({ commit }) {
            axios.get('https://fakestoreapi.com/carts')
                .then(response => {
                    commit('SET_CARTS', response.data);
                });
        },
        fetchUsers({ commit }) {
            axios.get('https://fakestoreapi.com/users')
                .then(response => {
                    commit('SET_USERS', response.data);
                });
        },
        login({ commit }, credentials) {
            axios.post('https://fakestoreapi.com/auth/login', credentials)
                .then(response => {
                    if (response.data.token) {
                        commit('SET_AUTH', true);
                    }
                })
                .catch(() => {
                    commit('SET_AUTH', false);
                });
        },
    },
    modules: {},
});
