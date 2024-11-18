<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
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
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  computed: {
    ...mapState(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['login']),
    login() {
      this.login({ username: this.username, password: this.password })
          .then(() => {
            if (this.isAuthenticated) {
              this.$router.push('/products');
            } else {
              this.errorMessage = 'Login failed. Please try again.';
            }
          });
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
