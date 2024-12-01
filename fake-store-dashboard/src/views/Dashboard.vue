<template>
  <div class="container mt-5">
    <h1>Dashboard</h1>
    <div class="row">
      <div class="col-md-3" v-for="item in dashboardItems" :key="item.title">
        <div class="card text-center mb-3">
          <div class="card-body">
            <h2>{{ item.title }}</h2>
            <p>{{ item.value }}</p>
            <router-link :to="item.link" class="btn btn-primary mt-2">Go to {{ item.title }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'DashboardView',
  computed: {
    ...mapState(['products', 'categories', 'carts', 'users']),
    dashboardItems() {
      return [
        { title: 'Produtos', value: this.products.length, link: '/products' },
        { title: 'Categorias', value: this.categories.length, link: '/categories' }, // Verificar a existência da rota '/categories'
        { title: 'Pedidos', value: this.carts.length, link: '/carts' },
        { title: 'Usuários', value: this.users.length, link: '/users' }
      ];
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchCategories', 'fetchCarts', 'fetchUsers'])
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchCarts();
    this.fetchUsers();
  }
};
</script>

<style scoped>
.dashboard-summary {
  display: flex;
  justify-content: space-around;
}
.dashboard-item {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>
