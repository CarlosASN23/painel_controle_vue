<template>
  <div>
    <h1>Products</h1>
    <table v-if="products.length > 0">
      <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Rating</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.title }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.rating.rate }}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <p>No products available.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductList',
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions(['fetchProducts'])
  },
  created() {
    this.fetchProducts();
  }
};
</script>
