<template>
  <div>
    <h1>{{ isEditMode ? 'Edit' : 'Add' }} Cart</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="user">User:</label>
        <select v-model="cart.userId" required>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.username }}</option>
        </select>
      </div>
      <div>
        <label for="date">Date:</label>
        <input type="date" v-model="cart.date" required />
      </div>
      <div>
        <label for="items">Items:</label>
        <div v-for="(item, index) in cart.items" :key="index">
          <select v-model="item.productId" required>
            <option v-for="product in products" :key="product.id" :value="product.id">{{ product.title }}</option>
          </select>
          <input type="number" v-model="item.quantity" min="1" required />
          <input type="number" v-model="item.price" min="0" step="0.01" required />
          <button type="button" @click="removeItem(index)">Remove</button>
        </div>
        <button type="button" @click="addItem">Add Item</button>
      </div>
      <button type="submit">{{ isEditMode ? 'Update' : 'Add' }} Cart</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CartForm',
  data() {
    return {
      cart: {
        userId: '',
        date: '',
        items: []
      },
      isEditMode: false
    };
  },
  computed: {
    ...mapState(['users', 'products', 'carts'])
  },
  methods: {
    ...mapActions(['fetchUsers', 'fetchProducts', 'fetchCart', 'addCart', 'updateCart']),
    submitForm() {
      if (this.isEditMode) {
        this.updateCart(this.cart).then(() => this.$router.push('/carts'));
      } else {
        this.addCart(this.cart).then(() => this.$router.push('/carts'));
      }
    },
    loadCart() {
      const cartId = this.$route.params.id;
      if (cartId) {
        this.isEditMode = true;
        this.cart = this.carts.find(c => c.id == cartId) || {
          userId: '',
          date: '',
          items: []
        };
      }
    },
    addItem() {
      this.cart.items.push({ productId: '', quantity: 1, price: 0 });
    },
    removeItem(index) {
      this.cart.items.splice(index, 1);
    }
  },
  created() {
    this.fetchUsers();
    this.fetchProducts();
    this.loadCart();
  }
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
