import { createStore } from 'vuex';
import apiClient from '../plugins/axios';

export default createStore({
    state: {
        products: [],
        categories: [],
        carts: [],
        users: [],
        isAuthenticated: false
    },
    mutations: {
        SET_AUTH(state, status) {
            state.isAuthenticated = status;
        },
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
        ADD_PRODUCT(state, product) {
            state.products.push(product);
        },
        UPDATE_PRODUCT(state, updatedProduct) {
            const index = state.products.findIndex(product => product.id === updatedProduct.id);
            if (index !== -1) {
                state.products.splice(index, 1, updatedProduct);
            }
        },
        DELETE_PRODUCT(state, productId) {
            state.products = state.products.filter(product => product.id !== productId);
        },
        ADD_CART(state, cart) {
            state.carts.push(cart);
        },
        UPDATE_CART(state, updatedCart) {
            const index = state.carts.findIndex(cart => cart.id === updatedCart.id);
            if (index !== -1) {
                state.carts.splice(index, 1, updatedCart);
            }
        },
        DELETE_CART(state, cartId) {
            state.carts = state.carts.filter(cart => cart.id !== cartId);
        },
        ADD_USER(state, user) {
            state.users.push(user);
        },
        UPDATE_USER(state, updatedUser) {
            const index = state.users.findIndex(user => user.id === updatedUser.id);
            if (index !== -1) {
                state.users.splice(index, 1, updatedUser);
            }
        },
        DELETE_USER(state, userId) {
            state.users = state.users.filter(user => user.id !== userId);
        }
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await apiClient.post('/auth/login', credentials);
                if (response.data.token) {
                    commit('SET_AUTH', true);
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                } else {
                    commit('SET_AUTH', false);
                }
            } catch (error) {
                commit('SET_AUTH', false);
                throw new Error('Login failed');
            }
        },
        async fetchProducts({ commit }) {
            try {
                const response = await apiClient.get('/products');
                commit('SET_PRODUCTS', response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        },
        async fetchCategories({ commit }) {
            try {
                const response = await apiClient.get('/products/categories');
                commit('SET_CATEGORIES', response.data);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        },
        async fetchCarts({ commit }) {
            try {
                const response = await apiClient.get('/carts');
                commit('SET_CARTS', response.data);
            } catch (error) {
                console.error('Erro ao buscar carrinhos:', error);
            }
        },
        async fetchCart({ commit, state }, cartId) {
            try {
                const existingCart = state.carts.find(c => c.id === cartId);
                if (existingCart) {
                    return;
                }
                const response = await apiClient.get(`/carts/${cartId}`);
                commit('SET_CARTS', [...state.carts, response.data]);
            } catch (error) {
                console.error('Erro ao buscar carrinho:', error);
            }
        },
        async fetchUsers({ commit }) {
            try {
                const response = await apiClient.get('/users');
                commit('SET_USERS', response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        },
        async addProduct({ commit }, product) {
            try {
                const response = await apiClient.post('/products', product);
                commit('ADD_PRODUCT', response.data);
            } catch (error) {
                console.error('Erro ao adicionar produto:', error);
            }
        },
        async updateProduct({ commit }, product) {
            try {
                const response = await apiClient.put(`/products/${product.id}`, product);
                commit('UPDATE_PRODUCT', response.data);
            } catch (error) {
                console.error('Erro ao atualizar produto:', error);
            }
        },
        async deleteProduct({ commit }, productId) {
            try {
                await apiClient.delete(`/products/${productId}`);
                commit('DELETE_PRODUCT', productId);
            } catch (error) {
                console.error('Erro ao deletar produto:', error);
                throw new Error('Erro ao deletar produto');
            }
        },
        async addCart({ commit }, cart) {
            try {
                const response = await apiClient.post('/carts', cart);
                commit('ADD_CART', response.data);
            } catch (error) {
                console.error('Erro ao adicionar carrinho:', error);
            }
        },
        async updateCart({ commit }, cart) {
            try {
                const response = await apiClient.put(`/carts/${cart.id}`, cart);
                commit('UPDATE_CART', response.data);
            } catch (error) {
                console.error('Erro ao atualizar carrinho:', error);
            }
        },
        async deleteCart({ commit }, cartId) {
            try {
                await apiClient.delete(`/carts/${cartId}`);
                commit('DELETE_CART', cartId);
            } catch (error) {
                console.error('Erro ao deletar carrinho:', error);
                throw new Error('Erro ao deletar carrinho');
            }
        },
        async addUser({ commit }, user) {
            try {
                const response = await apiClient.post('/users', user);
                commit('ADD_USER', response.data);
            } catch (error) {
                console.error('Erro ao adicionar usuário:', error);
            }
        },
        async updateUser({ commit }, user) {
            try {
                const response = await apiClient.put(`/users/${user.id}`, user);
                commit('UPDATE_USER', response.data);
            } catch (error) {
                console.error('Erro ao atualizar usuário:', error);
            }
        },
        async deleteUser({ commit }, userId) {
            try {
                await apiClient.delete(`/users/${userId}`);
                commit('DELETE_USER', userId);
            } catch (error) {
                console.error('Erro ao deletar usuário:', error);
                throw new Error('Erro ao deletar usuário');
            }
        }
    },
    modules: {}
});
