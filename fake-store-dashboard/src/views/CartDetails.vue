<template>
  <div v-if="cart">
    <h1>Cart Details</h1>
    <p>User: {{ getUser(cart.userId).username }}</p>
    <p>Date: {{ new Date(cart.date).toLocaleDateString() }}</p>
    <table class="table">
      <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in cart.items || []" :key="item.productId">
        <td>{{ getProduct(item.productId).title }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.price }}</td>
        <td>{{ (item.price * item.quantity).toFixed(2) }}</td>
      </tr>
      </tbody>
    </table>
    <p>Total: {{ calculateTotal(cart.items || []) }}</p>
  </div>
  <div v-else>
    <p>Loading cart details...</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CartDetails',
  data() {
    return {
      cart: null
    };
  },
  computed: {
    ...mapState(['carts', 'users', 'products'])
  },
  methods: {
    ...mapActions(['fetchCart', 'fetchUsers', 'fetchProducts']),
    async loadCart() {
      const cartId = this.$route.params.id;
      await this.fetchCart(cartId);
      await this.fetchUsers();
      await this.fetchProducts();
      this.cart = this.carts.find(c => c.id == cartId) || {};
    },
    getUser(userId) {
      return this.users.find(user => user.id === userId) || {};
    },
    getProduct(productId) {
      return this.products.find(product => product.id === productId) || {};
    },
    calculateTotal(items) {
      return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }
  },
  created() {
    this.loadCart();
  }
};
</script>

<style scoped>

</style>
