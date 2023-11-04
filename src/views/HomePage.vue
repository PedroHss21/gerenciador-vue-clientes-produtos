<template>
  <v-container>
    
    <div class="mt-5"></div>

    <v-row align="center">
      <v-col cols="12" sm="auto" class="d-flex align-items-center">
        <v-icon large color="#00609c">mdi-home</v-icon>
        <h2 class="ml-2 mb-0 font-weight-normal primary--text">Principal</h2>
      </v-col>
    </v-row>
    
    <v-divider class="my-3" :style="{ 'backgroundColor': 'tertiary' }"></v-divider>
  </v-container>
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

<style scoped>

.font-weight-normal {
  font-weight: normal; /* Remove o negrito do texto */
}
</style>
