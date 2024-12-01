<template>
  <div>
    <h1>Products</h1>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Rating</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.title }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.rating.rate }}</td>
        <td>
          <button @click="viewProduct(product.id)">View</button>
          <button @click="editProduct(product.id)">Edit</button>
          <button @click="deleteProduct(product.id)">Delete</button>
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
    ...mapState(['products'])
  },
  methods: {
    ...mapActions(['fetchProducts']),
    viewProduct(id) {
      // Implementar visualização do produto
    },
    editProduct(id) {
      // Implementar edição do produto
    },
    deleteProduct(id) {
      // Implementar exclusão do produto
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>
