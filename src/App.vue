<template>
  <v-app>
    <!-- Barra de Navegação -->
    <v-app-bar v-if="$route.path !== '/login'" app color="primary" dark class="custom-app-bar">
      <router-link to="/">
        <v-img src="@/assets/logo-branco.svg" class="logo-image" contain></v-img>
      </router-link>

      <!-- Espaçamento para centralizar os itens de navegação, mantendo o mesmo tamanho que a imagem e ícones para balancear -->
      <v-spacer></v-spacer>

      <!-- Links de Navegação Centralizados -->
      <v-btn class="menu-button" text to="/clientes">Clientes</v-btn>
      <v-btn class="menu-button" text to="/produtos">Produtos</v-btn>

      <!-- Espaçamento para alinhar o ícone de ajuda e o logout à direita -->
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
            const credentials = { email: this.email, password: this.password }; // Consistência no nome das propriedades
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
        window.open('https://ajuda-homologacao.alterdata.com.br/x/_oA6Cg', '_blank');
        },
    },

    components: {
        AppFooter
    }
};
</script>

<style scoped>
.custom-app-bar {
  height: 64px;
}

.logo-image {
  max-height: 60px;
  max-width: 120px;
  margin-right: 16px;
}

.menu-button {
  text-transform: none;
  font-weight: normal;
  height: 100%;
  align-self: center;
}

.v-btn.icon {
  height: 100%;
  align-self: center;
}

.v-icon {
  align-self: center;
}
</style>

