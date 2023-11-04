<template>
  <v-footer padless fixed>
    <v-col class="footer-content" cols="12">
      © {{ currentYear }} - Esplin Software | Direitos Reservados
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
  position: relative; /* Adicionado para posicionar corretamente o pseudo-elemento */
  font-size: 12px;
  height: 50px;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: left;
  display: flex;
  align-items: center;
  background-color: #a2a9ad;
  color: white;
}

.footer-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px; /* Altura da barra */
  background-color: #00609c; /* Cor da barra */
}
</style>
