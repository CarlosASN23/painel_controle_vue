<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      username: 'mor_2314', // Username padrão para teste
        password: '83r5^_', // Password padrão para teste
      errorMessage: '',
    };
  },
  computed: {
    ...mapState(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['login', 'fetchProducts']),
    async handleLogin() {
      try {
        await this.login({ username: this.username, password: this.password });
        if (this.isAuthenticated) {
          await this.fetchProducts();
          this.$router.push('/products');
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      } catch (error) {
        this.errorMessage = 'Login failed. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 0 auto;
}
</style>
