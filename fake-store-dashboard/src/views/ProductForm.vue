<template>
  <div>
    <h1>{{ isEditMode ? 'Edit' : 'Add' }} Product</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="product.title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea v-model="product.description" required></textarea>
      </div>
      <div>
        <label for="category">Category:</label>
        <select v-model="product.category" required>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="number" v-model="product.price" required />
      </div>
      <div>
        <label for="rating">Rating:</label>
        <input type="number" v-model="product.rating.rate" required />
      </div>
      <button type="submit">{{ isEditMode ? 'Update' : 'Add' }} Product</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductForm',
  data() {
    return {
      product: {
        title: '',
        description: '',
        category: '',
        price: 0,
        rating: { rate: 0, count: 0 }
      },
      isEditMode: false
    };
  },
  computed: {
    ...mapState(['categories', 'products'])
  },
  methods: {
    ...mapActions(['fetchCategories', 'addProduct', 'updateProduct']),
    submitForm() {
      if (this.isEditMode) {
        this.updateProduct(this.product).then(() => this.$router.push('/products'));
      } else {
        this.addProduct(this.product).then(() => this.$router.push('/products'));
      }
    },
    loadProduct() {
      const productId = this.$route.params.id;
      if (productId) {
        this.isEditMode = true;
        this.product = this.products.find(p => p.id == productId) || {
          title: '',
          description: '',
          category: '',
          price: 0,
          rating: { rate: 0, count: 0 }
        };
      }
    }
  },
  created() {
    this.fetchCategories();
    this.loadProduct();
  }
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
