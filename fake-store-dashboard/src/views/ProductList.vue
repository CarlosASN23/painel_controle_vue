<template>
  <div class="container mt-5">
    <h1>Products</h1>
    <div class="mb-3">
      <label for="sort" class="form-label">Sort by:</label>
      <div class="input-group">
        <select v-model="sortKey" class="form-select" id="sort">
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <button @click="sortProducts" class="btn btn-primary">Sort</button>
      </div>
    </div>
    <div class="mb-3">
      <label for="filter" class="form-label">Filter by category:</label>
      <select v-model="selectedCategory" class="form-select" id="filter">
        <option value="">All</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <table v-if="filteredProducts.length > 0" class="table table-striped">
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
      <tr v-for="product in filteredProducts" :key="product.id">
        <td>{{ product.title }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.rating.rate }}</td>
        <td>
          <button @click="viewProduct(product.id)" class="btn btn-info">View</button>
          <button @click="editProduct(product.id)" class="btn btn-warning">Edit</button>
          <button @click="confirmDelete(product.id)" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <p>No products available.</p>
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductList',
  data() {
    return {
      sortKey: '',
      selectedCategory: '',
      errorMessage: ''
    };
  },
  computed: {
    ...mapState(['products', 'categories']),
    filteredProducts() {
      let products = this.products;
      if (this.selectedCategory) {
        products = products.filter(product => product.category === this.selectedCategory);
      }
      return products;
    }
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchCategories', 'deleteProduct']),
    sortProducts() {
      if (this.sortKey === 'price') {
        this.products.sort((a, b) => a.price - b.price);
      } else if (this.sortKey === 'rating') {
        this.products.sort((a, b) => b.rating.rate - a.rating.rate);
      }
    },
    viewProduct(id) {
      this.$router.push(`/products/${id}`);
    },
    editProduct(id) {
      this.$router.push(`/edit-product/${id}`);
    },
    async deleteProduct(id) {
      try {
        await this.deleteProduct(id);
        this.fetchProducts(); // Atualiza a lista após deletar o produto
      } catch (error) {
        this.errorMessage = 'Failed to delete product. Please try again.';
      }
    },
    confirmDelete(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.deleteProduct(id);
      }
    }
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  }
};
</script>

<style scoped>

</style>
