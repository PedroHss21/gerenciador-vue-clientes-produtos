<template>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="18">
        <v-container>
  
          <!-- Espaçamento no topo -->
          <div class="mt-5"></div>
  
          <!-- Título Produtos com ícone -->
          <v-row align="center">
            <v-col cols="12" sm="auto" class="d-flex align-items-center">
              <v-icon large color="primary">mdi-storefront</v-icon>
              <h2 class="ml-2 mb-0 font-weight-normal primary--text">Produtos</h2>
            </v-col>
          </v-row>
          
          <!-- Linha horizontal personalizada -->
          <v-divider class="my-3" :style="{ 'backgroundColor': 'tertiary' }"></v-divider>
  
        </v-container>
      </v-col>
    </v-row>
  </template>