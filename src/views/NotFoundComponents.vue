<template>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <div class="text-center">
            <h1 class="display-1 font-weight-bold mb-4">404</h1>
            <h2 class="subtitle-1 font-weight-regular mb-6">
              Oops! A página que você está procurando não foi encontrada.
            </h2>
            <v-btn class='return-login' to="/" large color="primary">Voltar para a Página Inicial</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'NotFoundComponent'
  }
  </script>
  
  <style>
.return-login {
  border: 1px solid var(--primary-color);
  color: var(--white-color);
  background-color: var(--primary-color);
  text-transform: none;
  font-weight: normal;
}
  </style>
  