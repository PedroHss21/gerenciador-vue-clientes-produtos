<template>
  <v-footer :class="{'dark-mode': $vuetify.theme.dark}" padless fixed>
    <v-col class="footer-content" cols="12">
      © {{ currentYear }} - Esplin Software | Direitos Reservados
      <v-img
        class="footer-logo"
        src="@/assets/logo-branco-footer.svg"
        contain
        max-height="100%"
        max-width="100px"
      ></v-img>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  }
};
</script>

<style scoped>
.footer-content {
  font-size: 12px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 0;
  background-color: var(--tertiary-color);
  color: var(--white-color);
  position: relative;
}

.footer-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px; /* Altura da barra */
  background-color: var(--primary-color); /* Cor da barra */
}

.footer-logo {
  height: auto;
  max-width: 100px;
  margin-left: auto;
}

.dark-mode .footer-content {
  background-color: #58595b; /* Cor de fundo para o tema escuro */
}
</style>
