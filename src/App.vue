<template>
  <v-app>
    <!-- Barra de Navegação -->
    <v-app-bar v-if="$route.path !== '/login'" app color="primary" dark class="custom-app-bar">

      <!-- Espaçamento para alinhar à esquerda -->
      <v-spacer></v-spacer>

      <!-- Links de Navegação Centralizados -->
      <v-btn class="menu-button" text to="/clientes">Clientes</v-btn>
      <v-btn class="menu-button" text to="/produtos">Produtos</v-btn>


      <!-- Espaçamento para alinhar à direita -->
      <v-spacer></v-spacer>

      <!-- Ícone de Ajuda -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="goToHelpSite">
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>
        <span>Ajuda</span>
      </v-tooltip>

      <!-- Logout -->
      <v-btn class="menu-button" text @click="performLogout">
      <v-icon left>mdi-logout</v-icon>
       Sair
      </v-btn>
      
    </v-app-bar>
    
    <!-- Conteúdo Principal -->
    <v-main>
      <router-view/>
    </v-main>

    <!-- Rodapé -->
    <AppFooter app></AppFooter>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import AppFooter from './components/common/AppFooter.vue';

export default {
    methods: {

        ...mapActions(["loginUser", "logoutUser"]), // Incluindo logoutUser nas ações

        performLogin() {
            const credentials = { email: this.email, senha: this.password };
            this.loginUser(credentials)
                .then(() => {
                this.$router.push("/");
            });
        },
        
        performLogout() {
            this.logoutUser()
            .then(() => {
                this.$router.push('/login');
            })
            .catch(error => {
                console.error('Erro no logout:', error);
            });
          },

      goToHelpSite() {
        window.open('https://ajuda.alterdata.com.br', '_blank');
      },
        },

      components: {
        AppFooter
      }
};

</script>

<style>
.menu-button {
  text-transform: none;
  font-weight: normal;
}
</style>
