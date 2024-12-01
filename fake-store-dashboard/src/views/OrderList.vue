<template>
  <div>
    <h1>Orders</h1>
    <table v-if="carts.length > 0">
      <thead>
      <tr>
        <th>ID do Pedido</th>
        <th>Data</th>
        <th>Valor Total</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cart in carts" :key="cart.id">
        <td>{{ cart.id }}</td>
        <td>{{ new Date(cart.date).toLocaleDateString() }}</td>
        <td>{{ calculateTotal(cart.items) }}</td>
        <td>Pending</td>
        <td>
          <button @click="viewOrder(cart.id)">View</button>
          <button @click="editOrder(cart.id)">Edit</button>
          <button @click="deleteOrder(cart.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <p>No orders available.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'OrderList',
  computed: {
    ...mapState(['carts'])
  },
  methods: {
    ...mapActions(['fetchCarts', 'deleteCart']),
    calculateTotal(items) {
      return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    },
    viewOrder(id) {
      this.$router.push(`/carts/${id}`);
    },
    editOrder(id) {
      this.$router.push(`/edit-cart/${id}`);
    },
    deleteOrder(id) {
      this.deleteCart(id).then(() => this.fetchCarts());
    }
  },
  created() {
    this.fetchCarts();
  }
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
