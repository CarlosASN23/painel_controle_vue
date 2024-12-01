<template>
  <div>
    <h1>Users</h1>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>City</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name.firstname }} {{ user.name.lastname }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.address.city }}</td>
        <td>
          <button @click="viewUser(user.id)">View</button>
          <button @click="editUser(user.id)">Edit</button>
          <button @click="deleteUser(user.id)">Delete</button>
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
    ...mapState(['users'])
  },
  methods: {
    ...mapActions(['fetchUsers']),
    viewUser(id) {
      // Implementar visualização do usuário
    },
    editUser(id) {
      // Implementar edição do usuário
    },
    deleteUser(id) {
      // Implementar exclusão do usuário
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>
