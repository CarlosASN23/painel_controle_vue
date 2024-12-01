<template>
  <div v-if="product">
    <h1>{{ product.title }}</h1>
    <p>{{ product.description }}</p>
    <p>Category: {{ product.category }}</p>
    <p>Price: ${{ product.price }}</p>
    <p>Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>
  </div>
  <div v-else>
    <p>Loading product details...</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductDetails',
  data() {
    return {
      product: null
    };
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions(['fetchProduct']),
    async loadProduct() {
      const productId = this.$route.params.id;
      await this.fetchProduct(productId);
      this.product = this.products.find(p => p.id == productId) || {};
    }
  },
  created() {
    this.loadProduct();
  }
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
