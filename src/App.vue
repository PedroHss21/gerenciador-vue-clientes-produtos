<template>
  <v-app>
    <!-- Barra de Navegação -->
    <v-app-bar v-if="shouldShowNavBar" app color="primary" dark>
      <!-- Botão Hambúrguer (Visível apenas em dispositivos móveis) -->
      <v-btn class="d-sm-none" icon @click="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <!-- Logo (Visível apenas em desktop) -->
      <router-link to="/" class="d-none d-sm-flex">
        <v-img src="@/assets/logo-branco.svg" class="logo-image" contain :height="150"></v-img>
      </router-link>

      <!-- Espaçamento para centralizar os itens de navegação -->
      <v-spacer></v-spacer>

      <!-- Links de Navegação Centralizados -->
      <v-btn class="d-none d-sm-flex menu-button" text to="/clientes">Clientes</v-btn>
      <v-btn class="d-none d-sm-flex menu-button" text to="/produtos">Produtos</v-btn>

      <!-- Espaçamento para alinhar o ícone de ajuda e o logout à direita -->
      <v-spacer></v-spacer>

       <!-- Ícone de modo Claro/Escuro -->
       <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text icon v-bind="attrs" v-on="on" @click="darkTheme = !darkTheme">
            <v-icon>{{ darkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ darkTheme ? 'Ativar modo claro' : 'Ativar modo escuro' }}</span>
      </v-tooltip>

      <!-- Ícone de Ajuda -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="goToHelpSite">
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>
        <span>Ajuda</span>
      </v-tooltip>

      <!-- Botão Sair (Ícone em dispositivos móveis, Texto em desktop) -->
      <v-btn icon class="d-sm-none" @click="performLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn class="d-none d-sm-flex menu-button" text @click="performLogout">
        <v-icon left>mdi-logout</v-icon>
        Sair
      </v-btn>
    </v-app-bar>

    <!-- Drawer para dispositivos móveis -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item link to="/">Principal</v-list-item>
        <v-list-item link to="/clientes">Clientes</v-list-item>
        <v-list-item link to="/produtos">Produtos</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Conteúdo Principal -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Rodapé (Oculto em dispositivos móveis) -->
    <AppFooter v-if="!isMobile" app></AppFooter>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import AppFooter from './components/common/AppFooter.vue';

export default {
  data() {
    return {
      drawer: false,
      darkTheme: false
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    shouldShowNavBar() {
      const isAuthenticated = !!localStorage.getItem('userToken');
      const requiresAuth = this.$route.matched.some(record => record.meta.requiresAuth);
      return isAuthenticated && requiresAuth;
    }
  },
  watch: {
    darkTheme(newVal) {
      this.$vuetify.theme.dark = newVal;
    }
  },
  methods: {
    ...mapActions(["loginUser", "logoutUser"]),

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
      window.open('https://esplinhubdocs.vercel.app/', '_blank');
    },
  },

  components: {
    AppFooter
  }

};
</script>

<style scoped>
.menu-button {
  text-transform: none;
  font-weight: normal;
}

.logo-image {
  max-height: auto;
  max-width: 120px;
  margin-right: 16px;
}

.v-app-bar {
  justify-content: space-between;
}

.v-app-bar>*:not(.v-img):not(.v-btn) {
  flex: 1 1 auto;
}
</style>