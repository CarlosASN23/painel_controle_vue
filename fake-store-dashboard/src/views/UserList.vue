<template>
  <div class="container mt-5">
    <h1>Users</h1>
    <input type="text" v-model="searchQuery" placeholder="Search users..." class="form-control mb-3" />
    <table v-if="filteredUsers.length > 0" class="table table-striped">
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>City</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in filteredUsers" :key="user.id">
        <td>{{ user.name.firstname }} {{ user.name.lastname }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.address.city }}</td>
        <td>
          <button @click="viewUser(user.id)" class="btn btn-info">View</button>
          <button @click="editUser(user.id)" class="btn btn-warning">Edit</button>
          <button @click="confirmDelete(user.id)" class="btn btn-danger">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <p>No users available.</p>
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserList',
  data() {
    return {
      searchQuery: '',
      errorMessage: '' // Adicionando mensagem de erro
    };
  },
  computed: {
    ...mapState(['users']),
    filteredUsers() {
      return this.users.filter(user =>
          user.name.firstname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.name.lastname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'deleteUser']),
    viewUser(id) {
      this.$router.push(`/users/${id}`);
    },
    editUser(id) {
      this.$router.push(`/edit-user/${id}`);
    },
    async deleteUser(id) {
      try {
        await this.deleteUser(id);
        this.fetchUsers(); // Atualiza a lista após deletar o usuário
      } catch (error) {
        this.errorMessage = 'Failed to delete user. Please try again.';
      }
    },
    confirmDelete(id) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.deleteUser(id);
      }
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped>

</style>
