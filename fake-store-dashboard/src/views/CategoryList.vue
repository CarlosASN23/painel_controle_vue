<template>
  <div class="container mt-5">
    <h1>Categories</h1>
    <table v-if="categories.length > 0" class="table table-striped">
      <thead>
      <tr>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories" :key="category">
        <td>{{ category }}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <p>No categories available.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CategoryList',
  computed: {
    ...mapState(['categories'])
  },
  methods: {
    ...mapActions(['fetchCategories'])
  },
  created() {
    this.fetchCategories();
  }
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
