<template>
  <div>
    <h1>{{ isEditMode ? 'Edit' : 'Add' }} User</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="user.username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="user.email" required />
      </div>
      <div>
        <label for="firstname">First Name:</label>
        <input type="text" v-model="user.name.firstname" required />
      </div>
      <div>
        <label for="lastname">Last Name:</label>
        <input type="text" v-model="user.name.lastname" required />
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input type="tel" v-model="user.phone" required />
      </div>
      <button type="submit">{{ isEditMode ? 'Update' : 'Add' }} User</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserForm',
  data() {
    return {
      user: {
        username: '',
        email: '',
        name: {
          firstname: '',
          lastname: ''
        },
        phone: ''
      },
      isEditMode: false
    };
  },
  computed: {
    ...mapState(['users'])
  },
  methods: {
    ...mapActions(['addUser', 'updateUser']),
    submitForm() {
      if (this.isEditMode) {
        this.updateUser(this.user).then(() => this.$router.push('/users'));
      } else {
        this.addUser(this.user).then(() => this.$router.push('/users'));
      }
    },
    loadUser() {
      const userId = this.$route.params.id;
      if (userId) {
        this.isEditMode = true;
        this.user = this.users.find(u => u.id == userId) || {
          username: '',
          email: '',
          name: {
            firstname: '',
            lastname: ''
          },
          phone: ''
        };
      }
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
