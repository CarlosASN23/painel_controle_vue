<template>
  <div>
    <h1>Carts</h1>
    <table>
      <thead>
      <tr>
        <th>Order ID</th>
        <th>Date</th>
        <th>Total</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cart in carts" :key="cart.id">
        <td>{{ cart.id }}</td>
        <td>{{ cart.date }}</td>
        <td>{{ calculateTotal(cart.products) }}</td>
        <td>Pending</td>
        <td>
          <button @click="viewCart(cart.id)">View</button>
          <button @click="editCart(cart.id)">Edit</button>
          <button @click="deleteCart(cart.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['carts'])
  },
  methods: {
    ...mapActions(['fetchCarts']),
    calculateTotal(products) {
      return products.reduce((total, product) => total + product.price * product.quantity, 0);
    },
    viewCart(id) {
      // Implementar visualização do carrinho
    },
    editCart(id) {
      // Implementar edição do carrinho
    },
    deleteCart(id) {
      // Implementar exclusão do carrinho
    }
  },
  created() {
    this.fetchCarts();
  }
};
</script>
