<template>
    <nav>
      <button @click="performLogout">Logout</button>
    </nav>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    methods: {
      ...mapActions(['logoutUser']),
  
      performLogout() {
        this.logoutUser()
          .then(() => {
            this.$router.push('/login');
          })
          .catch(error => {
            console.error('Erro no logout:', error);
          });
      }
    }
  };
  </script>
  