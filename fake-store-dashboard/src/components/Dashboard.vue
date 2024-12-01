<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="summary">
      <div>Total de Produtos: {{ products.length }}</div>
      <div>Número de Categorias: {{ categories.length }}</div>
      <div>Quantidade de Pedidos: {{ carts.length }}</div>
      <div>Total de Usuários: {{ users.length }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['products', 'categories', 'carts', 'users']),
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.summary {
  display: flex;
  justify-content: space-between;
}
</style>