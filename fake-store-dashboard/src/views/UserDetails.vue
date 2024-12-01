<template>
  <div v-if="user">
    <h1>{{ user.username }}</h1>
    <p>Email: {{ user.email }}</p>
    <p>Full Name: {{ user.name.firstname }} {{ user.name.lastname }}</p>
    <p>Phone: {{ user.phone }}</p>
  </div>
  <div v-else>
    <p>Loading user details...</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserDetails',
  data() {
    return {
      user: null
    };
  },
  computed: {
    ...mapState(['users'])
  },
  methods: {
    ...mapActions(['fetchUser']),
    async loadUser() {
      const userId = this.$route.params.id;
      await this.fetchUser(userId);
      this.user = this.users.find(u => u.id == userId) || {};
    }
  },
  created() {
    this.loadUser();
  }
};
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
