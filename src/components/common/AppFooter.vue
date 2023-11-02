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
</style>
